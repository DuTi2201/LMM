import { query } from 'express';
import { validationResult } from 'express-validator';
import userService from "../services/userService";
import login_registerService from "../services/login_registerService";

let getAccountManagement = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render('../views/accountManagement/accountManage.ejs', { userList });

};
let handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect('/account-management');
};

let getAddNewUser = async (req, res) => {
    try {

        return res.render('../views/accountManagement/addUser.ejs', {
        })
    } catch (e) {
        console.log(e)
    }

};
let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/account-management");
    }

    //create a new user
    let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
        gender: req.body.gender
    };
    try {
        await login_registerService.registerNewUser(newUser);
        return res.redirect("/account-management");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/account-management");
    }
};

const getUpdateUserPage = async (req, res) => {
        let id = req.params.id;
        let user = await userService.findUserById(id);
        let userData = user;
        return res.render('../views/accountManagement/updateProfile.ejs', { userData })
};

const handleUpdateUser = async (req, res) => {
    let updateUser = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phonenumber: req.body.phonenumber,
        gender: req.body.gender
    };
    try {
      await userService.updateUserInfor(updateUser.firstName, updateUser.lastName, updateUser.phonenumber, updateUser.gender, updateUser.id);
      // Hiển thị trang chỉnh sửa người dùng với thông tin người dùng đã cập nhật
      return res.redirect('/account-management')
    } catch (err) {
      console.log(err);
      return res.redirect('/account-management'); // Hoặc bất kỳ trang nào bạn muốn chuyển hướng đến khi có lỗi
    }
  };


// const handleUpdateUser = async (req, res) => {
//     let updateUser = {
//         id: req.body.id,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password,
//         phonenumber: req.body.phonenumber,
//         gender: req.body.gender
//     };
//     try {
//         await userService.updateUserInfor(updateUser);
//         return res.redirect("/account-management");
//     } catch (err) {
//         req.flash("errors", err);
//         return res.redirect("/account-management");
//     }
// };
module.exports = {
    getAccountManagement: getAccountManagement,
    handleDeleteUser: handleDeleteUser,
    createNewUser: createNewUser,
    getAddNewUser: getAddNewUser,
    getUpdateUserPage:getUpdateUserPage,
    handleUpdateUser,handleUpdateUser
}