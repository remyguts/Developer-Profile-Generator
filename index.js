"use strict";
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");
const { resolve } = require("path");

var PDFDocument, doc;
var fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const puppeteer = require("puppeteer");
// doc = new PDFDocument();
// doc.pipe(fs.createWriteStream("output.pdf"));
// // PDF Creation logic goes here

// doc.fontSize(15).text("hello world", 50, 50);

// doc.text(generateHTML(), {
//   width: 410,
//   align: "left"
// });
// doc.end();

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your Github Username?"
    },
    {
      type: "list",
      name: "favcolor",
      message: "What is your favorite color",
      choices: ["red", "black", "green"]
    }
  ]);
}

function generateHTML() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is Remy</h1>
    <p class="lead">I am from Seattle.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is remyguts</li>
      <li class="list-group-item">LinkedIn: blahhhh</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

async function profGEn() {
  try {
    const { name, favcolor } = await promptUser();
    const queryUrl = `https://api.github.com/users/${name}`;
    const { data } = await axios.get(queryUrl);
    console.log(name, favcolor, data);
    await writeFileAsync("index.html", generateHTML(), "utf8");
    printPDF();
  } catch (error) {
    console.log(error);
  }
}
async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`file://${resolve(__dirname, "index.html")}`, {
    waitUntil: "networkidle0"
  });

  const pdf = await page.pdf({ format: "A4" });
  await writeFileAsync("resume.pdf", pdf, "binary");
  await browser.close();
}

profGEn();
