import { query } from 'express';
import userService from "../../service/userService";

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


module.exports = {
    getAddNewUser: getAddNewUser,
    handleCreateNewUser: handleCreateNewUser,
}