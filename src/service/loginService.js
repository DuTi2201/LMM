import DBConnection from "../configs/DBConnection";
import bcrypt from "bcryptjs";
import { Op } from 'sequelize';
// import { getGroupWithRole } from './JWTService';
import { use } from "passport";
// import { createJWT } from '../middleware/JWTAction';


const salt = bcrypt.genSaltSync(10);



const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

// const handleUserLogin = async (rawData) => {
//     try {
//         let user = await DBConnection.User.findOne({
//             where: {
//                 [Op.or]: [
//                     { email: rawData.valueLogin },
//                     { phone: rawData.valueLogin }
//                 ]
//             }
//         })
//         if (user) {
//             let isCorrectPassword = checkPassword(rawData.password, user.password)
//             if (isCorrectPassword == true) {
//                 let groupWithRole = await getGroupWithRole(user);
//                 let payload = {
//                     email: user.email,
//                     groupWithRole,
//                     username: user.username
//                 }
//                 let token = createJWT(payload);
//                 return {
//                     EM: 'ok!',
//                     EC: 0,
//                     DT: {
//                         access_token: token,
//                         groupWithRole,
//                         email: user.email,
//                         username: user.username
//                     }
//                 }
//             }
//         }
//     } catch (err) {
//         reject(err);
//     }
// }

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        let user = await findUserByEmail(email);
        if (user) {
            //compare password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user email "${email}" doesn't exist`);
        }
    });
};


let findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `email` = ?  ', email,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `id` = ?  ', id,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let comparePassword = (password, userObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(password, userObject.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(`The password that you've entered is incorrect`);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {

    hashUserPassword: hashUserPassword,
    handleUserLogin: handleUserLogin,
    handleLogin: handleLogin,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePassword: comparePassword
};