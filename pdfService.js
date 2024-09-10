import fs from 'fs';
import pdf from 'html-pdf';
import { DataService } from './dataService.js'; // Corrigir o caminho de importação

export const generatePDF = async (dados) => {
    const htmlTemplate = fs.readFileSync('template.html', 'utf8');

    // Substituir placeholders no HTML
    let htmlContent = htmlTemplate;
    for (const key in dados) {
        htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), dados[key]);
    }

    // Função para gerar o PDF a partir do HTML
    const generatePdfFromHtml = (htmlContent, outputPath) => {
        return new Promise((resolve, reject) => {
            pdf.create(htmlContent).toFile(outputPath, (err, res) => {
                if (err) return reject(err);
                resolve(res.filename);
            });
        });
    };

    // Função para remover acentos e normalizar o nome
    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').toLowerCase();
    };
  

    // Função para formatar a data no formato ddMMyyyyHHmm
    const formatDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); // dia com dois dígitos
        const month = String(today.getMonth() + 1).padStart(2, '0'); // mês com dois dígitos (janeiro é 0)
        const year = today.getFullYear(); // ano com quatro dígitos
        const hour = String(today.getHours()).padStart(2, '0'); // hora com dois dígitos
        const minute = String(today.getMinutes()).padStart(2, '0'); // minuto com dois dígitos
        // Caso deseje pode por segundos também
    
        return `${day}${month}${year}${hour}${minute}`; // formato ddMMyyyyHHmm
    };

    const outputPath = `${normalizeString(dados.name)}_${formatDate()}.pdf`;
    await generatePdfFromHtml(htmlContent, outputPath);

    console.log('PDF gerado e preenchido com sucesso!');
};

// Função principal para buscar os dados e gerar o PDF
const main = async () => {
    const dataService = new DataService();
    const dados = await dataService.getData();
    await generatePDF(dados);
};

main().catch(err => console.error(err));