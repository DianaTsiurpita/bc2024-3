const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
    .version('1.0.0')
    .requiredOption('-i, --input <path>', 'шлях до файлу, який даємо для читання')
    .option('-o, --output <path>', 'шлях до файлу, у якому записуємо результат')
    .option('-d, --display', 'виводити результат у консоль');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

let inputData;
try {
    inputData = fs.readFileSync(options.input, 'utf-8');
} catch (error) {
    console.error('Cannot find input file');
    process.exit(1);
}

let jsonData;
try {
    jsonData = JSON.parse(inputData);
} catch (error) {
    console.error('Invalid JSON format');
    process.exit(1);
}

const result = {};
if (jsonData && Array.isArray(jsonData)) {
    jsonData.forEach(item => {
        if (item.category === 'Доходи, усього') {
            result['Доходи, усього'] = item.value;
        }
        if (item.category === 'Витрати, усього') {
            result['Витрати, усього'] = item.value;
        }
    });
}

if (options.display) {
    Object.entries(result).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
}

if (options.output) {
    fs.writeFileSync(options.output, JSON.stringify(result, null, 2));
}
