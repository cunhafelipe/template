const ejs = require("ejs");
const puppeteer = require("puppeteer");
const fs = require("fs");

async function renderTemplate() {
  try {
    const templatePath = "./template.ejs";
    const template = fs.readFileSync(templatePath, "utf-8");
    const html = ejs.render(template);
    return html;
  } catch (error) {
    console.error("Erro ao renderizar o template:", error);
    throw error;
  }
}

async function generatePDF(html) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({ path: "output.pdf", format: "A4" });
    // await browser.close();
    console.log("PDF gerado com sucesso!");
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error);
    throw error;
  }
}

async function main() {
  try {
    const html = await renderTemplate();
    await generatePDF(html);
  } catch (error) {
    console.error("Erro no processo:", error);
  }
}

main();
