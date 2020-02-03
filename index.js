"use strict";
//variables requiring specific modules
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");
const { resolve } = require("path");

var PDFDocument, doc;
var fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const puppeteer = require("puppeteer");
//function that employs inquirer to ask these questions for template set up
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
//this is the template and it calls on these specific paramaters
function generateHTML(
  name,
  avatar_url,
  location,
  blog,
  bio,
  followers,
  following,
  html_url,
  starred_url,
  public_repos
) {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  
    <title>Document</title>
  </head>
  
  <body id="yo">
    <div class="jumbotron jumbotron-fluid" id="this">
      <div class="container" id="that">
        <h1 class="display-4"> ${name}</h1>
        <img src='${avatar_url}' id="mage">
        <p class="lead">I am from ${location}.</p>
        <p> ${bio} </p>
        <ul class="list-group">
          <li class="list-group-item" id="homie"><a href="${html_url}"> </a>My GitHub </li>
           <li class="list-group-item" id="homie"> LinkedIn:><a
                href="${blog}">Linkedin</a>
          </li>
          <li class="list-group-item" id="homie"> Number of Followers:  ${followers} </li>
          <li class="list-group-item" id="homie"> Number of Repos: ${public_repos} </li>
          <li class="list-group-item" id="homie"> Pages I Follow:${following}</li>
          <li class="list-group-item" id="homie"><a
              href="${starred_url}"></a>Starred
            Repos </li>
        </ul>
      </div>
    </div>
  </body>
  
  </html>
  `;
}
//this calls on the API and asks for the specific data
async function profGEn() {
  try {
    const { name, favcolor } = await promptUser();
    const queryUrl = `https://api.github.com/users/${name}`;
    const { data } = await axios.get(queryUrl);
    console.log(name, favcolor, data.avatar_url);
    await writeFileAsync(
      "index.html",
      generateHTML(
        name,
        data.avatar_url,
        data.location,
        data.blog,
        data.bio,
        data.followers,
        data.following,
        data.html_url,
        data.starred_url,
        data.public_repos
      ),
      "utf8"
    );
    printPDF();
  } catch (error) {
    console.log(error);
  }
}

//this creates the pdf
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
