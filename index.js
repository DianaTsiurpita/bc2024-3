const { program } = require('commander');
const fs = require('fs');

function writeOutput(output, result) {
    try {
        fs.writeFileSync(output, JSON.stringify(result, null, 2));
    } catch (err) {
        console.error('Error writing to output file:', err);
        process.exit(1);
    }
}

program
    .requiredOption('-i, --input <file>')
    .option('-o, --output <file>')
    .option('-d, --display')
    .parse()

const options = program.opts();

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

let result;

try {
    const data = fs.readFileSync(options.input, 'utf-8');
    const records = JSON.parse(data);
    const formattedResults = {};

    records.forEach(record => {
        if (record.txt === "Доходи, усього" || record.txt === "Витрати, усього") {
            formattedResults[record.txt] = record.value;
        }
    });

    result = formattedResults;

} catch (err) {
    console.error('Error reading or parsing input file:', err);
    process.exit(1);
}

if (options.output) {
    writeOutput(options.output, result);
}

if (options.display) {
    console.log(result);
}
