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

module.exports = {
    getAccountManage: getAccountManage,
    handleDeleteUser:handleDeleteUser,
}