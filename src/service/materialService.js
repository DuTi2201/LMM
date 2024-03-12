import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const getMaterialList = async() => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM Materials');
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }
}
const createNewMaterial = async (syllabus_id, subject_id, subject_name, material_description, author, isbn, publisher, edition, note, classification) =>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    connection.query(
        'INSERT INTO Materials (syllabus_id, subject_id, subject_name, material_description, author, isbn, publisher, edition, note, classification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [syllabus_id, subject_id, subject_name, material_description, author, isbn, publisher, edition, note, classification],
        function (err, results, fields) {
        }
    )
}
const deleteMaterial = async (id) => {
    
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM Materials WHERE id = ?', [id]);
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }

}

module.exports = {
    getMaterialList,deleteMaterial, createNewMaterial,
  
}