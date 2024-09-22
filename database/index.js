import mysql from 'mysql2';
import 'dotenv/config'

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USERNAME,       
    password: process.env.DB_PASSWORD, 
    database: 'medintuit'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

export default connection;
