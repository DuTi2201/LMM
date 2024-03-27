require('dotenv').config();
import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from "bcryptjs";
import { getGroupWithRole } from './JWTService';
import { createJWT } from '../middleware/JWTAction';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}
let checkPassword = (inputPassword, hashPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(inputPassword, hashPassword).then((isMatch) => {
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

const registerNewUser = async (rawUserData) => {
    try {
        //check Email are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist!",
                EC: 1
            }
        }
        let hashPassword = hashUserPassword(rawUserData.password);
        await db.User.create({
            firstName: rawUserData.firstName,
            lastName: rawUserData.lastName,
            email: rawUserData.email,
            password: bcrypt.hashSync(rawUserData.password, salt),
            phonenumber: rawUserData.phonenumber,
            gender: rawUserData.gender
        })
        return {
            EM: "Create a new user successful",
            EC: '0'
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Something Wrong...",
            EC: -2
        }
    }
}

let handleLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            console.log('>>>found user with email')
            let isCorrectPassword = await checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                //test role
                let groupWithRoles = await getGroupWithRole(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                let token = createJWT(payload);

                return {
                    EM: "successful",
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles

                    }
                }
            }
        }
        return {
            EM: "Your email or password is incorrect!",
            EC: 1,
            DT: ''
        }
    } catch (error) {
        console.log(err)
        return {
            EM: "Something Wrong...",
            EC: -2
        }
    }
}


const findUserByEmail = async (email) => {
    let user = {};
    user = await db.User.findOne({
        where: {email:email},
    })
    return user.get({ plain: true });
}

const findUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: {id:id},
    })
    return user.get({ plain: true });
}

// const checkPassword = (inputPassword, hashPassword) => {
//     return bcrypt.compareSync(inputPassword, hashPassword);

// }


module.exports = {
    handleLogin: handleLogin,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    registerNewUser: registerNewUser,
    checkPassword: checkPassword
};