# Vitor — Job Application Tracker

Painel de acompanhamento de vagas e candidaturas de Vitor Tee How.

**Acesse o site:** https://teehow.github.io/vitor-job-tracker/

## Organização do painel

- **Visão geral:** indicadores, próximos passos, distribuição das etapas e resumo da última rodada.
- **Vagas:** lista compacta com abas Ativas, Em processo, Aguardando, Arquivo e Todas. Vagas encerradas, descartadas ou não priorizadas ficam no arquivo.
- **Histórico:** relatórios completos das rodadas, recolhidos para consulta individual.
- **Dados e critérios:** objetivos profissionais, fontes, importação, exportação e cópia completa do painel.

Os indicadores consideram todas as vagas. “Aguardando retorno” reúne contatos e informações pendentes; não significa que houve contato em todas essas vagas. Próximos passos sugeridos são identificados como sugestões nos cartões. Datas e prioridades são definidas por você, sem envio automático de mensagens.

## Consultar vagas

Cada cartão reúne cargo, empresa, localização, remuneração conhecida, status, avaliação de aderência, histórico de contato e link da vaga.

- Use **Buscar** para localizar uma empresa, cargo, localização ou observação.
- Use **Status** para filtrar a lista.
- Combine a aba de etapa com o filtro de status. Use **Todas** para consultar qualquer status ou **Limpar filtros** se uma busca não retornar resultados.
- Ordene por prioridade/próxima ação, último registro ou empresa/cargo.
- Abra **Ver análise e histórico de contato** para ler o conteúdo completo sem sobrecarregar a lista.
- Clique em **Abrir vaga →** para acessar o anúncio original.

## Atualizar seu acompanhamento

1. Abra **Atualizar acompanhamento** no cartão da vaga.
2. Escolha o **Status** e a **Resposta do recrutador**.
3. Preencha, quando houver, a data e hora da entrevista, a remuneração confirmada e as observações.
4. Defina **Próxima ação**, **Data de acompanhamento** e **Prioridade**. A visão geral destaca até seis ações; datas anteriores ao dia atual de Brasília aparecem como atrasadas.
5. Clique em **Salvar alterações**.

As entrevistas devem ser registradas no horário de **Brasília**. O campo de remuneração aceita texto: informe moeda, valor e periodicidade, por exemplo, `USD 8.500/mês bruto`.

Status e resposta são campos independentes. Ao marcar uma entrevista, selecione também **Entrevista marcada** para que ela apareça nesse filtro e no contador.

Status disponíveis: Em análise; Aguardando informações; Recrutador contatado; Candidatura enviada; Resposta positiva; Resposta negativa; Entrevista marcada; Entrevista realizada; Proposta recebida; Aprovado; Reprovado; Vaga encerrada; Desisti; Não priorizar.

## Onde as alterações ficam salvas

O botão **Salvar alterações** grava os dados no armazenamento local (`localStorage`) do navegador e mantém as alterações após recarregar a página.

Esses dados ficam no mesmo navegador, perfil e endereço do site. Eles **não são enviados automaticamente ao GitHub**, ao assistente ou a outros dispositivos. Limpar os dados do site, trocar de navegador ou usar uma sessão privada pode tornar essas alterações indisponíveis.

A cronologia e os status publicados continuam no HTML do repositório; relatos detalhados de mensagens e contatos ficam no histórico privado local, em `.private/history-before-publication-*.html`, fora do Git. A versão pública usa sínteses profissionais. As alterações locais são aplicadas sobre os registros publicados. Os registros manuais são associados à vaga por um identificador estável. Ao combinar registros locais, importados ou incorporados ao HTML, prevalece o registro com a data de atualização mais recente para cada vaga.

## Backup e transferência

### Exportar backup

Clique em **Exportar backup** para baixar `vitor-tracker-backup.json`, com os registros manuais, inclusive observações. Guarde uma cópia após mudanças importantes.

Para incorporar suas alterações à próxima atualização publicada, envie esse arquivo ao assistente nesta conversa.

### Importar backup

No outro navegador/dispositivo, abra o site, clique em **Importar backup** e selecione o JSON exportado. A importação combina os registros e preserva o mais recente de cada vaga. O limite é de 2 MB; arquivos com formato ou registros inválidos são recusados.

O backup contém as alterações manuais, e não uma cópia completa da lista de vagas. Backups antigos continuam aceitos; os novos campos de ação, data e prioridade são opcionais.

### Baixar HTML atualizado

Clique em **Baixar HTML atualizado** para baixar uma cópia completa do painel com seus registros incorporados. Você pode abrir o arquivo no navegador ou enviá-lo ao assistente para atualizar a versão publicada. O download, por si só, não altera o site online.

## Atualização diária

Uma automação diária do Codex, **Radar de vagas do Vitor — 08h**, está configurada para **08h de Brasília (America/Sao_Paulo)**. Ela pesquisa as fontes listadas em **Dados e critérios**, incluindo LinkedIn, [Ladders](https://www.theladders.com/), [Himalayas](https://himalayas.app/) e os portais oficiais das empresas, conforme o perfil e os critérios definidos:

- Trabalho remoto permitido a partir do Brasil, incluindo oportunidades Brasil/LATAM/worldwide.
- Foco em Senior Database Engineer, Oracle DBA/Engineer/Architect, SQL Server DBA/Architect e funções compatíveis.
- Remuneração alvo de USD 100.000–120.000 bruto/ano ou USD 50–60/h.
- Candidatura automática quando houver aderência, informações confirmadas suficientes, currículo aprovado disponível e acesso à conta correta.
- No Ladders, confirmação de elegibilidade para trabalho a partir do Brasil e distinção entre remuneração oficial e estimativas da plataforma.
- Consulta do Gmail e das conversas relevantes do LinkedIn para localizar respostas, confirmações e entrevistas, sem duplicar registros.
- Registro explícito de login, verificação ou informação faltante em **Próxima ação** e nas observações da vaga, com status **Aguardando informações**. Se o bloqueio afetar uma fonte inteira, ele aparece no relato da rodada.
- Uso de sessões e acessos já disponíveis; quando for necessária intervenção, a rotina solicita login ou dados para uma execução futura, sem pedir senhas na conversa.
- Registro dos resultados no tracker e atualização do `index.html` neste repositório.
- Reconsulta dos anúncios oficiais das vagas já acompanhadas. Encerramentos confirmados recebem status **Vaga encerrada** e passam automaticamente para a aba **Arquivo**, com data, fonte, motivo e status anterior nas observações, preservando o histórico. Um anúncio encerrado não equivale a rejeição da candidatura nem cancela entrevista ou processo em andamento.

Erros temporários, login obrigatório, CAPTCHA, ausência em uma busca ou um erro 404 isolado não confirmam encerramento. Nesses casos, a rotina mantém o status e registra a verificação inconclusiva para nova tentativa.

Essa rotina depende das conexões, acessos e informações disponíveis. Logins, verificações ou dados faltantes podem impedir uma ação; apenas envios efetivamente confirmados devem ser registrados como concluídos. A rotina evita repetir candidaturas e contatos já registrados.

A rotina usa o currículo aprovado pelo candidato, já recebido e conferido. A localização do arquivo original está registrada de forma privada na automação; o bloqueio de currículo pendente foi resolvido. Se esse arquivo ficar inacessível, a rotina solicita intervenção sem escolher outra versão antiga por conta própria. Currículo, credenciais e conteúdo privado de mensagens não devem integrar o repositório público.

Após alterações, a rotina valida o tracker, faz commit e push para `main` e confere o GitHub Pages. As notificações ficam restritas a novidades relevantes, envios confirmados, respostas, falhas ou ações necessárias, sem repetir bloqueios inalterados. Novos contatos ou respostas a recrutadores fora de uma candidatura dependem de autorização específica.

O site é estático: abrir a página ou deixá-la aberta não executa a busca nem envia candidaturas. Alterações guardadas apenas no seu navegador precisam ser exportadas e compartilhadas para serem incorporadas à versão publicada.

## Publicação e manutenção

- `index.html`: página completa, estilos, dados e lógica de acompanhamento.
- `.nojekyll`: configuração para servir os arquivos estáticos.
- `README.md`: instruções de uso.
- `data/availability.json`: data, fonte e resultado das verificações de disponibilidade por vaga; resultados inconclusivos não mudam o status para encerrada.
- `.private/`: estado local da rotina, ignorado pelo Git; nunca publicar conteúdo privado de sessões ou mensagens.

O GitHub Pages publica a branch **main**, pasta **/ (root)**. Após um commit, aguarde a execução **pages build and deployment** concluir em **Actions**. Se a página continuar mostrando a versão anterior, recarregue-a após a publicação.

O projeto usa HTML, CSS e JavaScript sem dependências externas, servidor de aplicação ou etapa de compilação.

O `index.html` permanece autossuficiente para abrir diretamente no navegador e gerar uma cópia portátil. A interface reorganiza os registros publicados na inicialização, preservando as vagas e os relatos completos na fonte. Os identificadores antigos de LinkedIn, Greenhouse, Gupy, Lever, CI&T e SmartRecruiters são aceitos na importação.

Para executar a verificação de regressão com Playwright e um navegador Chromium instalados: `node tests/tracker.cjs [caminho-do-playwright] [caminho-do-navegador]`. Ela usa um perfil temporário e verifica navegação, filtros, edição, persistência, backups e reabertura do HTML exportado em telas desktop e mobile.

O repositório e o site são públicos. Observações salvas apenas localmente não aparecem na versão pública; ao incorporar um backup ou HTML ao repositório, esses dados passam a integrar o conteúdo publicado.
