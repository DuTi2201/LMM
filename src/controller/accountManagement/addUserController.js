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
    let fullname = req.body.fullname;
    let email = req.body.email;
    let password = req.body.password; 
    let phoneNumber = req.body.phoneNumber;
    let address = req.body.address;
    let gender = req.body.gender;
    let actor = req.body.actor;
    
    userService.createNewUser(fullname, email, password, phoneNumber, address, gender, actor);
   
    return res.redirect('/account-management');
}


module.exports = {
    getAddNewUser: getAddNewUser,
    handleCreateNewUser: handleCreateNewUser,
}