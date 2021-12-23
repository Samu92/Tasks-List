const fs = require('fs');

const file = './db/data.json';

const saveToDb = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readDb = () => {
    if(!fs.existsSync(file)){
        return null;
    }
    
    return JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}));
}

module.exports = {
    saveToDb,
    readDb
}