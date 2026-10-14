# Vitor — Job Application Tracker

Painel de acompanhamento de vagas e candidaturas de Vitor Tee How.

**Acesse o site:** https://teehow.github.io/vitor-job-tracker/

## Consultar vagas

Cada cartão reúne cargo, empresa, localização, remuneração conhecida, status, avaliação de aderência, histórico de contato e link da vaga.

- Use **Buscar** para localizar uma empresa ou cargo.
- Use **Status** para filtrar a lista.
- O resumo mostra o total de vagas, candidaturas/processos, contatos pendentes e entrevistas marcadas. Os totais consideram todas as vagas, mesmo com um filtro aplicado.
- Clique em **Abrir vaga →** para acessar o anúncio original.

## Atualizar seu acompanhamento

1. Abra **Atualizar acompanhamento** no cartão da vaga.
2. Escolha o **Status** e a **Resposta do recrutador**.
3. Preencha, quando houver, a data e hora da entrevista, a remuneração confirmada e as observações/próxima ação.
4. Clique em **Salvar alterações**.

As entrevistas devem ser registradas no horário de **Brasília**. O campo de remuneração aceita texto: informe moeda, valor e periodicidade, por exemplo, `USD 8.500/mês bruto`.

Status e resposta são campos independentes. Ao marcar uma entrevista, selecione também **Entrevista marcada** para que ela apareça nesse filtro e no contador.

Status disponíveis: Em análise; Aguardando informações; Recrutador contatado; Candidatura enviada; Resposta positiva; Resposta negativa; Entrevista marcada; Entrevista realizada; Proposta recebida; Aprovado; Reprovado; Vaga encerrada; Desisti; Não priorizar.

## Onde as alterações ficam salvas

O botão **Salvar alterações** grava os dados no armazenamento local (`localStorage`) do navegador e mantém as alterações após recarregar a página.

Esses dados ficam no mesmo navegador, perfil e endereço do site. Eles **não são enviados automaticamente ao GitHub**, ao assistente ou a outros dispositivos. Limpar os dados do site, trocar de navegador ou usar uma sessão privada pode tornar essas alterações indisponíveis.

O histórico publicado continua no HTML do repositório; as alterações locais são aplicadas sobre ele. Os registros manuais são associados à vaga por um identificador estável. Ao combinar registros locais, importados ou incorporados ao HTML, prevalece o registro com a data de atualização mais recente para cada vaga.

## Backup e transferência

### Exportar backup

Clique em **Exportar backup** para baixar `vitor-tracker-backup.json`, com os registros manuais, inclusive observações. Guarde uma cópia após mudanças importantes.

Para incorporar suas alterações à próxima atualização publicada, envie esse arquivo ao assistente nesta conversa.

### Importar backup

No outro navegador/dispositivo, abra o site, clique em **Importar backup** e selecione o JSON exportado. A importação combina os registros e preserva o mais recente de cada vaga. O limite é de 2 MB; arquivos com formato ou registros inválidos são recusados.

O backup contém as alterações manuais, e não uma cópia completa da lista de vagas.

### Baixar HTML atualizado

Clique em **Baixar HTML atualizado** para baixar uma cópia completa do painel com seus registros incorporados. Você pode abrir o arquivo no navegador ou enviá-lo ao assistente para atualizar a versão publicada. O download, por si só, não altera o site online.

## Atualização diária

Uma automação externa, configurada no ChatGPT para **08h de Brasília**, pesquisa vagas no LinkedIn, no [Ladders](https://www.theladders.com/), no [Himalayas](https://himalayas.app/) e nos sites das empresas, conforme o perfil e os critérios definidos:

- Trabalho remoto permitido a partir do Brasil, incluindo oportunidades Brasil/LATAM/worldwide.
- Foco em Senior Database Engineer, Oracle DBA/Engineer/Architect, SQL Server DBA/Architect e funções compatíveis.
- Remuneração alvo de USD 100.000–120.000 bruto/ano ou USD 50–60/h.
- Candidatura quando houver aderência e informações confirmadas suficientes, usando o currículo fornecido pelo candidato.
- No Ladders, confirmação de elegibilidade para trabalho a partir do Brasil e distinção entre remuneração oficial e estimativas da plataforma.
- Contato com recrutamento verificado quando faltar a faixa salarial ou outra informação relevante.
- Registro dos resultados no tracker e atualização do `index.html` neste repositório.

Essa rotina depende das conexões, acessos e informações disponíveis. Logins, verificações ou dados faltantes podem impedir uma ação; apenas envios efetivamente confirmados devem ser registrados como concluídos. A rotina evita repetir candidaturas e contatos já registrados.

O site é estático: abrir a página ou deixá-la aberta não executa a busca nem envia candidaturas. Alterações guardadas apenas no seu navegador precisam ser exportadas e compartilhadas para serem incorporadas à versão publicada.

## Publicação e manutenção

- `index.html`: página completa, estilos, dados e lógica de acompanhamento.
- `.nojekyll`: configuração para servir os arquivos estáticos.
- `README.md`: instruções de uso.

O GitHub Pages publica a branch **main**, pasta **/ (root)**. Após um commit, aguarde a execução **pages build and deployment** concluir em **Actions**. Se a página continuar mostrando a versão anterior, recarregue-a após a publicação.

O projeto usa HTML, CSS e JavaScript sem dependências externas, servidor de aplicação ou etapa de compilação.

O repositório e o site são públicos. Observações salvas apenas localmente não aparecem na versão pública; ao incorporar um backup ou HTML ao repositório, esses dados passam a integrar o conteúdo publicado.
