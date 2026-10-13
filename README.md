# Meu Galinheiro

App simples para gerir um pequeno galinheiro a partir do telemóvel: recolha de ovos, incubadora, vendas e contas.

Funciona no browser, instala-se no ecrã principal como uma app e trabalha sem rede depois da primeira visita. Os dados ficam guardados **só no teu aparelho**.

## O que faz

- **Ovos**: registo diário da recolha (recolhidos, partidos ou sujos, guardados para chocar) e gráfico dos últimos 14 dias.
- **Incubadora**: lotes com contagem de dias (galinha, codorniz, pato, peru), lembretes de ovoscopia, do dia de parar a viragem e da eclosão, registo de temperatura e humidade com aviso fora da faixa, e taxas de fertilidade e eclosão.
- **Vendas**: ovos disponíveis em dúzias, idade dos ovos mais antigos em stock (aviso aos 14 e aos 21 dias), preços fixos de dúzia e meia dúzia e registo de venda com um toque.
- **Contas**: despesas e vendas por categoria, saldo do mês e custo real por ovo e por dúzia.
- **Resumo**: gráficos de 6 ou 12 meses, detalhe de cada mês e exportação para Excel (6 folhas, com fórmulas e totais).
- **Cópia de segurança**: guardar e restaurar todos os registos num ficheiro `.json`.

## Pôr a funcionar com o GitHub Pages

1. No repositório, vai a **Settings → Pages**.
2. Em **Source**, escolhe **Deploy from a branch**, branch `main`, pasta `/ (root)`, e carrega em **Save**.
3. Passado um ou dois minutos, a app fica disponível em `https://<o-teu-utilizador>.github.io/meu-galinheiro/`.

## Instalar no telemóvel

- **Android (Chrome)**: abre o endereço, toca no menu ⋮ e escolhe **Adicionar ao ecrã principal** (ou **Instalar app**).
- **iPhone (Safari)**: abre o endereço, toca em **Partilhar** e escolhe **Adicionar ao ecrã principal**.

Depois da primeira visita, a app abre mesmo sem rede no galinheiro.

## Os teus dados

- Ficam guardados no browser do aparelho onde usas a app. Não vão para nenhum servidor e ninguém os vê por saber o endereço.
- Cada aparelho tem os seus próprios registos. O telemóvel e o computador não se sincronizam.
- Se limpares os dados do browser ou mudares de telemóvel, perdes os registos. Usa **Resumo → Cópia de segurança → Guardar cópia** de vez em quando e guarda o ficheiro no Drive ou no e-mail. A app avisa quando passam 14 dias sem cópia.

## Estrutura

| Ficheiro | Para que serve |
|---|---|
| `app.html` | A app (HTML, CSS e JavaScript num só ficheiro) |
| `index.html` | Gerado a partir de `app.html` pelo `build.py`; é o que o GitHub Pages serve |
| `build.py` | Envolve `app.html` numa página completa e ativa o modo autónomo |
| `sw.js` | Guarda a app no telemóvel para funcionar sem rede |
| `manifest.webmanifest`, `icon-*.png` | Nome e ícone quando instalada no ecrã principal |

## Alterar a app

1. Edita `app.html`.
2. Corre `python3 build.py` para gerar o `index.html`.
3. Em `sw.js`, aumenta a versão (`meu-galinheiro-v1` → `meu-galinheiro-v2`) para os telemóveis receberem a atualização.
4. Faz commit e push.

## Referências usadas na app

- Incubação de galinha: 21 dias, cerca de 37,5 °C; humidade 45–55%, subindo para 65–75% nos últimos 3 dias.
- Venda de ovos ao consumidor: até 21 dias depois da postura.
