import { query } from 'express';
import userService from "../../service/userService";
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
    getEditProfilePage, handleUpdateUser
}