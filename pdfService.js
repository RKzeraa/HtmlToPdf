impot { PDFDocument } from 'pdf-lib';

export const generatePDF = async (dados) => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([600, 800]);

    page.drawText(`Nome: ${dados.nome}`, {x: 50, y: 750});
    page.drawText(`Nome: ${dados.horas}`, {x: 50, y: 750});
    page.drawText(`Nome: ${dados.datas}`, {x: 50, y: 750});

    const pdfBytes = await doc.save();

    return pdfBytes;
}