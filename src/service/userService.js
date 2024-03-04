import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);



const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (fullname, email, password, phoneNumber, address, gender, actor) =>{
    let hashPass = hashPassword(password);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    connection.query(
        'INSERT INTO users (fullname, email, password, phoneNumber, address, gender, actor	) VALUES (?, ?, ?, ?, ?, ?, ?)', [fullname, email, hashPass, phoneNumber, address, gender, actor],
        function (err, results, fields) {
        }
    )
}
const updateUserInfor = async(id, fullname, email, phoneNumber, address) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    connection.query(
        'UPDATE users SET fullname = ?, email = ?, phoneNumber = ?, address = ? WHERE id=?', [fullname, email, phoneNumber, address, id],
        function (err, results, fields) {
        }
    )
}
const getUserList = async() => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }
}

const deleteUser = async (id) => {
    
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }

}
const getUserById = async (id) => {
    
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }
}


module.exports = {
createNewUser, getUserList,deleteUser,getUserById, updateUserInfor
}