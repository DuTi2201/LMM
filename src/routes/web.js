import express from "express";
import homeController, { getHomePage } from "../controller/common/homeController";
import loginController, { getLoginPage } from "../controller/common/loginController";
import editProfileController, { getEditProfilePage } from "../controller/accountManagement/editProfileController";
import addMaterialController, { getAddMaterial } from "../controller/materialManagement/addMaterialController";
import managemenController, { getManagementMaterial } from "../controller/materialManagement/materialManagementController";
import searchMaterialController, { getSearchMaterial } from "../controller/materialManagement/searchMaterialController";
import accountManageController, { getAccountManage } from "../controller/accountManagement/accountManageController";
import addUserController, { getAddNewUser } from "../controller/accountManagement/addUserController";
// import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/home', homeController.getHomePage);
    router.get('/management/add-material', addMaterialController.getAddMaterial);
    router.get('/management/search-material', searchMaterialController.getSearchMaterial);
    router.get('/login', loginController.getLoginPage);
    router.post('/account-management/delete-user/:id', accountManageController.handleDeleteUser);
    router.get('/management', managemenController.getManagementMaterial);
    router.get('/account-management/edit-profile/:id', editProfileController.getEditProfilePage);
    router.post('/account-management/edit-profile/update-user', editProfileController.handleUpdateUser);
    router.get('/account-management', accountManageController.getAccountManage);
    router.get('/account-management/add-newUser', addUserController.getAddNewUser);
    router.post('/account-management/add-newUser/create-user', addUserController.handleCreateNewUser);
    // router.get('/delete-crud', homeController.deleteCRUD);
    // router.post('/api/login', userController.handleLogin);
    // router.get('/api/get-all-users', userController.handleGetAllUsers);
    // router.post('/api/create-new-user', userController.handleCreateNewUser);
    // router.put('/api/edit-user', userController.handleEditUser);
    // router.delete('/api/delete-user', userController.handleDeleteUser);
    return app.use("/", router);
}

module.exports = initWebRoutes;