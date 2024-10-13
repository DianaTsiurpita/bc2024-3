const fs = require('fs');
const https = require('https');

const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/banksincexp?date=20240801&period=m&json";

https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });


    response.on('end', () => {
        fs.writeFileSync('data.json', data);
        console.log('Дані збережено у data.json');
    });
}).on('error', (err) => {
    console.log('Помилка: ' + err.message);
});
