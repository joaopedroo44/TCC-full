const {Pool} = require('pg');

const db = new Pool ({
    user: 'postgres',
    host: 'postgres.railway.internal',
    database: 'railway',
    password: 'aCrcqCpAVkgsZwRvYCWdlfKQULDfoflM',
    port: 5432
});

db.connect((err) => {
if (err) { 
    console.error("Erro ao conectar com PostgreSQL!", err);
}
else {
    console.log("Conectando ao banco PostgreSQL!");
}
});

module.exports = db;