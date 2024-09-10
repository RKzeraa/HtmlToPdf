
# Explicação do Código

## Descrição

Com esse codigo é possivel gerar um arquivo PDF a partir de um template HTML, substituindo placeholders com dados dinâmicos fornecidos via sistema. Nele utilizei a biblioteca `html-pdf` para a geração do PDF e o módulo `fs` do Node.js para leitura de arquivos.

</br>

## Linha por Linha

```js
import fs from 'fs';
```
- **O que faz:** Importa o módulo `fs` (File System) do Node.js, que fornece funcionalidades para manipulação de arquivos, como leitura, escrita, exclusão, etc.

</br>

```js
import pdf from 'html-pdf';
```
- **O que faz:** Importa a biblioteca `html-pdf`, que converte HTML em arquivos PDF. Ela utiliza o conteúdo HTML e o renderiza em formato PDF.

</br>

```js
import { DataService } from './dataService.js';
```
- **O que faz:** Importa a classe `DataService` de um arquivo externo chamado `dataService.js`. Esse serviço é responsável por fornecer os dados que serão usados para preencher o template HTML.

</br>

### Função `generatePDF`

```js
export const generatePDF = async (dados) => {
```
- **O que faz:** Define e exporta uma função assíncrona chamada `generatePDF`, que recebe como argumento um objeto `dados`. Esta função gera um arquivo PDF a partir de um template HTML preenchido com os dados fornecidos.

</br>

```js
const htmlTemplate = fs.readFileSync('template.html', 'utf8');
```
- **O que faz:** Lê o conteúdo do arquivo `template.html` no sistema de arquivos utilizando `fs.readFileSync`. O segundo parâmetro (`'utf8'`) garante que o arquivo seja lido como texto (string), em vez de um buffer. Esse arquivo HTML contém placeholders (como `{{name}}`), que serão substituídos pelos valores reais vindos do objeto `dados`.

</br>

```js
// Substituir placeholders no HTML
let htmlContent = htmlTemplate;
```
- **O que faz:** Inicializa a variável `htmlContent` com o conteúdo do template HTML (`htmlTemplate`). Essa variável será modificada para substituir os placeholders pelos valores reais.

</br>

```js
for (const key in dados) {
    htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), dados[key]);
}
```
- **O que faz:** Itera sobre cada chave (key) do objeto `dados`. Para cada chave, ele busca por placeholders no formato `{{key}}` dentro do `htmlContent` e os substitui pelos valores correspondentes em `dados[key]`. O uso de `RegExp` garante que todas as ocorrências de um determinado placeholder (globalmente, devido à flag `'g'`) sejam substituídas. 
  - Exemplo: Se `dados = { name: "João", date: "10/09/2024" }`, ele substituirá todos os `{{name}}` por "João" e `{{date}}` por "10/09/2024".

</br>

```js
// Função para gerar o PDF a partir do HTML
const generatePdfFromHtml = (htmlContent, outputPath) => {
```
- **O que faz:** Define uma função auxiliar chamada `generatePdfFromHtml`, que recebe dois parâmetros: o conteúdo HTML preenchido (`htmlContent`) e o caminho de saída (`outputPath`) onde o PDF será salvo. Esta função retorna uma `Promise`, permitindo que seu processo assíncrono seja tratado posteriormente.

</br>

```js
return new Promise((resolve, reject) => {
    pdf.create(htmlContent).toFile(outputPath, (err, res) => {
        if (err) return reject(err);
        resolve(res.filename);
    });
});
```
- **O que faz:** A função usa o método `pdf.create()` da biblioteca `html-pdf` para criar um PDF a partir do conteúdo HTML (`htmlContent`). O método `toFile()` grava o arquivo PDF gerado no caminho especificado (`outputPath`).
  - Se houver algum erro ao gerar o PDF, ele chama `reject(err)`, rejeitando a Promise.
  - Se o PDF for gerado com sucesso, ele resolve a Promise com o nome do arquivo gerado (`res.filename`).

</br>

```js
const outputPath = `${normalizeString(dados.name)}_${formatDate()}.pdf`;
```
- **O que faz:** Define o caminho de saída para o arquivo PDF gerado. Ele cria um nome único com base no nome do aluno formatado (onde é feita a remoção de espaços, acentos e convertido para minúsculo) e a data atual que foi gerada (no formato ddMMyyyyHHmm). `${normalizeString(dados.name)}_${formatDate()}.pdf`, garantindo que cada PDF tenha um nome diferente e não sobrescreva arquivos anteriores. (Pode ser feita uma logica simples para manter 1 arquivo anterior, e o atual, caso seja necessario voltar para o estado anterior, ou tentar trabalhar de uma forma mais avançada ao editar o arquivo)
- No **normalize("NFD")** transforma caracteres acentuados como "ã" em uma combinação de "a" e uma marca diacrítica.
- No **replace(/[\u0300-\u036f]/g, "")** remove as marcas diacríticas (os acentos).
- No **replace(/\s+/g, '')** o `\s+` é uma expressão regular que corresponde a qualquer espaço em branco (incluindo espaços, quebras de linha, tabs, etc.) e o operador `+` faz com que ele corresponda a uma ou mais ocorrências. O `g` após a expressão regular significa "global", ou seja, ele substitui todas as ocorrências encontradas, e não apenas a primeira.
</br>

```js
await generatePdfFromHtml(htmlContent, outputPath);
```
- **O que faz:** Chama a função `generatePdfFromHtml`, passando o HTML preenchido e o caminho de saída. Como essa função retorna uma Promise, o uso de `await` faz com que o código espere até que o PDF seja gerado e salvo.

</br>

```js
console.log('PDF gerado e preenchido com sucesso!');
```
- **O que faz:** Exibe no console uma mensagem informando que o PDF foi gerado com sucesso.

</br>

### Função principal `main`

```js
const main = async () => {
```
- **O que faz:** Define a função assíncrona principal (`main`), responsável por orquestrar o fluxo completo: obter dados, gerar o HTML preenchido e converter isso em PDF.

</br>

```js
const dataService = new DataService();
```
- **O que faz:** Cria uma nova instância de `DataService`. Esse serviço é responsável por fornecer os dados dinâmicos que serão usados no template HTML.

</br>

```js
const dados = await dataService.getData();
```
- **O que faz:** Chama o método `getData()` do `DataService` e armazena os dados retornados na variável `dados`. A função `getData` provavelmente retorna uma Promise, então o uso de `await` é necessário para aguardar a conclusão da operação (como buscar dados de uma API, banco de dados, etc.).

</br>

```js
await generatePDF(dados);
```
- **O que faz:** Chama a função `generatePDF` passando os dados obtidos pelo `DataService`. Isso aciona o processo de geração do PDF.

</br>

```js
main().catch(err => console.error(err));
```
- **O que faz:** Executa a função `main()` e, se ocorrer algum erro durante sua execução, o `catch()` captura esse erro e o exibe no console usando `console.error(err)`.

</br>

### Resumo do Fluxo

1. O código lê um template HTML (`template.html`) e substitui os placeholders (ex.: `{{name}}`, `{{date}}`) por dados que estão no sistema, nesse caso o do `DataService`.
2. Com o HTML preenchido, vai ser gerado um arquivo PDF usando a biblioteca `html-pdf` e vai ser salvo o arquivo cujo nome vai ser o nome do aluno formatado (remoção de espaços, acentos e convertido para minúsculo) e a data atual que foi gerada (no formato ddMMyyyyHHmm).
3. A função principal (`main`) coordena o processo: obtém os dados, gera o PDF e trata possíveis erros.

### Pontos importantes

- **Assincronismo:** O código usa `async/await` para garantir que as operações assíncronas (como leitura de arquivos e geração de PDF) sejam realizadas de forma sequencial e adequada.
- **Promises:** A função `generatePdfFromHtml` retorna uma `Promise`, permitindo o controle adequado de operações que envolvem processamento e escrita de arquivos.
- **Flexibilidade:** O uso de placeholders no HTML e a substituição dinâmica permite que o código seja reutilizado para gerar PDFs personalizados com diferentes dados.
