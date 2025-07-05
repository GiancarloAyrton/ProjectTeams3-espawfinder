const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  
  database: 'myPetApp'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err.stack);
    return;
  }
  console.log('Conectado a MySQL');
});

module.exports = connection;
