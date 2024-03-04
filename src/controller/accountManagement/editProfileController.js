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
    let fullname = req.body.fullname;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let address = req.body.address;

    
    await userService.updateUserInfor(id, fullname, email, phoneNumber, address);
   
    return res.redirect('/account-management');
}


module.exports = {
    getEditProfilePage, handleUpdateUser
}