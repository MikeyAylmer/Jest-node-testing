/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

// generate text from new Markov Machine.
function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`ERROR CANT READ FILE: ${path}: ${err}`);
            process.exit(1)
        }
        generateText("DATA..", data)
    })
}

async function makeUrlText(url) {
    let resp;
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`CANT READ URL: ${url} : ${err}`)
        process.exit(1);
    }
    generateText(resp.data)
}