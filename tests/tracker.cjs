// Run with an installed Playwright module and Chromium browser. No user profile is used.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.argv[2] || 'playwright');

(async () => {
  const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'tracker-test-'));
  const browser = await chromium.launch({ headless: true, ...(process.argv[3] ? { executablePath: process.argv[3] } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(pathToFileURL(path.resolve(__dirname, '../index.html')).href);
    const total = await page.locator('.job').count();
    assert.equal(total, 49, 'All published opportunities remain available');
    assert.equal(await page.locator('#view-overview').isVisible(), true);
    assert.equal(await page.locator('.metric').count(), 4);

    await page.locator('[data-view="jobs"]').click();
    assert.equal(await page.locator('.job:visible').count(), 17);
    await page.locator('[data-stage="archive"]').click();
    assert.equal(await page.locator('.job:visible').count(), 32);
    await page.locator('[data-stage="all"]').click();
    await page.locator('#search-jobs').fill('Sezzle');
    assert.equal(await page.locator('.job:visible').count(), 1);
    const sezzle = page.locator('.job').filter({ has: page.locator('h2', { hasText: 'Sezzle' }) });
    await sezzle.locator('.edit summary').click();
    await sezzle.locator('[name="nextAction"]').fill('Conferir retorno e preparar perguntas');
    await sezzle.locator('[name="due"]').fill('2026-10-01');
    await sezzle.locator('[name="priority"]').selectOption('alta');
    await sezzle.locator('[name="notes"]').fill('Teste de persistência <script>texto literal</script>');
    await sezzle.locator('button[type="submit"]').click();
    await page.reload();
    await page.locator('[data-view="jobs"]').click();
    await page.locator('#search-jobs').fill('Conferir retorno e preparar perguntas');
    assert.equal(await page.locator('.job:visible').count(), 1, 'Search includes saved next actions');
    assert.match(await sezzle.locator('.next-action').innerText(), /Atrasada/);
    assert.equal(await sezzle.locator('[name="priority"]').inputValue(), 'alta');

    await page.locator('#search-jobs').fill('nenhum-resultadopossivel');
    assert.equal(await page.locator('#jobs-empty').isVisible(), true);
    await page.locator('#clear-filters').click();
    assert.equal(await page.locator('.job:visible').count(), total);

    await page.locator('[data-view="history"]').click();
    assert.ok(await page.locator('.history-entry').count() > 10);
    await page.locator('.history-entry > summary').first().click();
    assert.equal(await page.locator('.history-entry .card').first().isVisible(), true);

    await page.locator('[data-view="settings"]').click();
    let pending = page.waitForEvent('download');
    await page.locator('#export-backup').click();
    const backupPath = path.join(temporary, 'backup.json');
    await (await pending).saveAs(backupPath);
    const backup = JSON.parse(await fs.readFile(backupPath, 'utf8'));
    assert.equal(backup.schemaVersion, 1);
    assert.ok(Object.values(backup.records).some(record => record.nextAction === 'Conferir retorno e preparar perguntas'));
    assert.ok(backup.records['gupy-12613336'], 'Legacy provider records are preserved');

    // Older backup fields are optional; import must retain more recent local updates.
    const old = structuredClone(backup);
    for (const record of Object.values(old.records)) {
      delete record.nextAction; delete record.due; delete record.priority;
      record.updatedAt = '2020-01-01T00:00:00Z';
    }
    const oldPath = path.join(temporary, 'old-backup.json');
    await fs.writeFile(oldPath, JSON.stringify(old));
    await page.locator('#backup-file').setInputFiles(oldPath);
    await page.waitForFunction(() => document.querySelector('#tracker-notice').textContent.includes('Backup importado'));
    assert.equal(await sezzle.locator('[name="nextAction"]').inputValue(), 'Conferir retorno e preparar perguntas');

    pending = page.waitForEvent('download');
    await page.locator('#download-html').click();
    const exported = path.join(temporary, 'tracker.html');
    await (await pending).saveAs(exported);
    const cleanContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const portable = await cleanContext.newPage();
    portable.on('pageerror', error => errors.push(error.message));
    await portable.goto(pathToFileURL(exported).href);
    assert.equal(await portable.locator('.job').count(), total);
    assert.equal(await portable.locator('.sidebar').count(), 1, 'Portable export does not duplicate navigation');
    assert.equal(await portable.locator('.edit').count(), total, 'Portable export does not duplicate editors');
    assert.ok((await portable.locator('#action-list').innerText()).includes('Conferir retorno e preparar perguntas'));
    assert.equal(await portable.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Mobile overview fits viewport');
    await portable.locator('[data-view="jobs"]').click();
    assert.equal(await portable.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Mobile job list fits viewport');
    assert.equal(await portable.locator('.job').filter({ hasText: 'Sezzle' }).locator('[name="notes"]').inputValue(), 'Teste de persistência <script>texto literal</script>');
    assert.deepEqual(errors, [], 'No browser runtime errors');
    await cleanContext.close();
    console.log(`PASS: ${total} jobs, navigation, filtering, local persistence, legacy backup merge, portable HTML, mobile layout.`);
  } finally {
    await browser.close();
    // Only this test's freshly created temporary directory is removed.
    await fs.rm(temporary, { recursive: true, force: true });
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
