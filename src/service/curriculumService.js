import mysql from 'mysql2/promise';
import bluebird from 'bluebird';




const createNewCurriculum = async (curriculum_code, curriculum_name, curriculum_description, total_credits) =>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    connection.query(
        'INSERT INTO Curriculums (curriculum_code, curriculum_name, curriculum_description, total_credits) VALUES (?, ?, ?, ?)', [curriculum_code, curriculum_name, curriculum_description, total_credits],
        function (err, results, fields) {
        }
    )
}
const getCurriculumList = async() => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM Curriculums');
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }
}



const updateCurriculumInfor = async(id, curriculum_code, curriculum_name, curriculum_description, total_credits) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    connection.query(
        'UPDATE Curriculums SET curriculum_code= ?, curriculum_name = ?, curriculum_description = ?, total_credits = ? WHERE id=?', [curriculum_code, curriculum_name, curriculum_description, total_credits, id],
        function (err, results, fields) {
        }
    )
}

const deleteCurriculum = async (id) => {
    
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM Curriculums WHERE id = ?', [id]);
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }

}
const getCurriculumById = async (id) => {
    
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM Curriculums WHERE id = ?', [id]);
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }
}


module.exports = {
    createNewCurriculum,getCurriculumList,deleteCurriculum,getCurriculumById,updateCurriculumInfor,
  
}