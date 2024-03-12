import { query } from 'express';
import userService from "../../service/userService";
let getAccountManage = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render('../views/accountManage/accountManage.ejs',{userList});

}
const handleDeleteUser = async(req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect('/account-management');
}

let getAddNewUser = async (req, res) => {
    try {

        return res.render('../views/accountManage/addUser.ejs', {
        })
    } catch (e) {
        console.log(e)
    }

}
const handleCreateNewUser = (req, res) => {
    let account_firstname = req.body.account_firstname;
    let account_lastname = req.body.account_lastname;
    let account_username = req.body.account_username;
    let account_email = req.body.account_email;
    let account_password = req.body.account_password; 
    let account_phonenumber = req.body.account_phonenumber;
    let account_address = req.body.account_address;
    let account_gender = req.body.account_gender;
    // let actor = req.body.actor;
    
    userService.createNewUser(account_firstname, account_lastname, account_username, account_email, account_password, account_phonenumber, account_address, account_gender);
   
    return res.redirect('/account-management');
}

const getEditProfilePage = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await userService.getUserById(id);
        let userData = {};
        if (user && user.length > 0) {
            userData = user[0]
        }
        return res.render('../views/accountManage/editProfilePage.ejs', {userData})
    } catch (e) {
        console.log(e)
    }

}
const handleUpdateUser = async (req, res) => {
    let id = req.body.id;
    let account_firstname = req.body.account_firstname;
    let account_lastname = req.body.account_lastname;
    let account_email = req.body.account_email;
    let account_phonenumber = req.body.account_phonenumber;
    let account_address = req.body.account_address;

    
    await userService.updateUserInfor(id, account_firstname, account_lastname, account_email, account_phonenumber, account_address);
   
    return res.redirect('/account-management');
}
module.exports = {
    getAccountManage: getAccountManage,
    handleDeleteUser: handleDeleteUser,
    getAddNewUser: getAddNewUser,
    handleCreateNewUser: handleCreateNewUser,
    getEditProfilePage, handleUpdateUser
}