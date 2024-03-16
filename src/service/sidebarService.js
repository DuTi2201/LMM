import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const getSubjectList = async() => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM Subjects');
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }
}

module.exports = {
    getSubjectList,
  
}