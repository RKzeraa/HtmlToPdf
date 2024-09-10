# HtmlToPdf

- **fs (File System):** Para leitura do template HTML.
- **html-pdf:** Para converter HTML em um arquivo PDF.
- **dataService.js:** Um serviço de dados para buscar os valores dinâmicos.

##### Passos:

1. Instalar as dependências necessárias:

```bash
npm install pdf-lib html-pdf
```

</br>

> [!IMPORTANT]
> Passar o modelo do Frequencia.pdf que já tem com os dados, só que para html, podendo carregar todos os modelos em html para melhor manipulação dos dados! Não esquecer de colocar todos os placeholders de onde deve ser preenchido os dados referente as propriedades passadas. Ex: <td>Nome: {{name}}</td> ({{name}} é o placeholder para propriedade 'name')

2. Arquivo template.html (Coloca o nome especifico do documento nesse caso frequencia.html) com o conteúdo do PDF em formato HTML

- [`template.html`](https://github.com/RKzeraa/HtmlToPdf/blob/main/template.html)
- [`Exemplo de retorno PDF`](https://github.com/RKzeraa/HtmlToPdf/blob/main/joaodasilva_100920241231.pdf)

</br>

###### Como Funciona

- **Template HTML:** Um arquivo HTML (template.html) é lido usando o módulo fs (File System). Este template deve conter placeholders como {{name}}, {{date}}, etc.

- **Substituição dos Placeholders:** O código substitui esses placeholders com dados reais fornecidos pelo serviço de dados (dataService.js).

- **Geração do PDF:** O HTML modificado é então convertido em um arquivo PDF usando a biblioteca html-pdf.

- **Saída:** O PDF é salvo em um arquivo cujo nome é com base no nome do aluno formatado (remoção de espaços, acentos e convertido para minúsculo) e a data atual que foi gerada (no formato ddMMyyyyHHmm).

</br>

> [!IMPORTANT]
> Certifique-se de que o arquivo package.json contém "type": "module"

```json
{
  "name": "html-to-pdf",
  "version": "1.0.0",
  "main": "pdfService.js",
  "type": "module",
  "scripts": {
    "start": "node pdfService.js"
  },
  "dependencies": {
    "html-pdf": "^3.0.1",
    "pdf-lib": "^1.17.1"
  }
}

```

</br>

3. Criei um arquivo chamado dataService.js para simular os dados que tu vai pegar do sistema (É mais ou menos o dado que tu vai passar como paramentro quando chamar o metodo generatePDF) 

```js
const dataService = new DataService();
const dados = await dataService.getData();
await generatePDF(dados);
```
</br>

- [`dataService.js`](https://github.com/RKzeraa/HtmlToPdf/blob/main/dataService.js)

</br>

```js
export class DataService {
    async getData() {
        return {
            name: 'João da Silva',
            date: '13/01/2002',
            course: 'Engenharia de Software',
            studentRegistration: '202012345',
            shift: 'Noturno',
            documentId: '12345678910',
            documentCpf: '123.456.789-10',
            maritalStatus: 'Solteiro'
            //Adicionar todas propriedades que irá preencher o documento
        };
    }
}
```

</br>

4. Modificar o script pdfService.js para gerar e preencher o PDF 
- [`pdfService.js`](https://github.com/RKzeraa/HtmlToPdf/blob/main/pdfService.js)
- [`Explicação do Codigo`](https://github.com/RKzeraa/HtmlToPdf/blob/main/codeExplanation.md)

5. Execute o código:

> [!IMPORTANT]
> Nesse exemplo que fiz para executar basta realizar esse comando, mas no sistema pode rodar o projeto normal e realizar a chamada do pdfService

```bash
node pdfService.js
```