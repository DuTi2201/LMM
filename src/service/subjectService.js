import mysql from 'mysql2/promise';
import bluebird from 'bluebird';




const createNewSubject = async (subject_name, subject_description, subject_type) =>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    connection.query(
        'INSERT INTO Subjects (subject_name, subject_description, subject_type) VALUES (?, ?, ?)', [subject_name, subject_description, subject_type],
        function (err, results, fields) {
        }
    )
}
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



const updateSubjectInfor = async(id, subject_name, subject_description, subject_type) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    connection.query(
        'UPDATE Subjects SET subject_name = ?, subject_description = ?, subject_type = ? WHERE id=?', [subject_name, subject_description, subject_type, id],
        function (err, results, fields) {
        }
    )
}

const deleteSubject = async (id) => {
    
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM Subjects WHERE id = ?', [id]);
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }

}
const getSubjectById = async (id) => {
    
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM Subjects WHERE id = ?', [id]);
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }
}


module.exports = {
    createNewSubject,getSubjectList,deleteSubject,getSubjectById,updateSubjectInfor,
  
}