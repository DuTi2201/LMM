import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);



const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (account_firstname, account_lastname, account_username, account_email, account_password, account_phonenumber, account_address, account_gender) =>{
    let hashPass = hashPassword(account_password);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    connection.query(
        'INSERT INTO Accounts (account_firstname, account_lastname, account_username, account_email, account_password, account_phonenumber, account_address, account_gender	) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [account_firstname, account_lastname, account_username, account_email, hashPass, account_phonenumber, account_address, account_gender],
        function (err, results, fields) {
        }
    )
}
const updateUserInfor = async(id, account_firstname, account_lastname, account_email, account_phonenumber, account_address) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'LMMS',
        Promise:bluebird,
      });
    connection.query(
        'UPDATE Accounts SET account_firstname, account_lastname = ?, account_email = ?, account_phonenumber = ?, account_address = ? WHERE id=?', [account_firstname, account_lastname, account_email, account_phonenumber, account_address, id],
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
        const [rows, fields] = await connection.execute('SELECT * FROM Accounts');
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
        const [rows, fields] = await connection.execute('DELETE FROM Accounts WHERE id = ?', [id]);
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
        const [rows, fields] = await connection.execute('SELECT * FROM Accounts WHERE id = ?', [id]);
        return rows;
    } catch (error) {
            console.log('>>check erro: ', error)
        }
}


module.exports = {
createNewUser, getUserList,deleteUser,getUserById, updateUserInfor
}