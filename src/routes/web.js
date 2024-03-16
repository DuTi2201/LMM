import express from "express";
import passport from 'passport';
import homeController, { getHomePage } from "../controller/common/homeController";
import loginController, { getLoginPage } from "../controller/common/loginController";
import materialManagementController, { getManagementMaterial, getCreateMaterial, handleDeleteMaterial, createdMaterial } from "../controller/materialManagement/materialManagementController";
import accountManageController, { getAccountManage, getEditProfilePage, getAddNewUser, handleUpdateUser, handleCreateNewUser } from "../controller/accountManagement/accountManageController";
import subjectManagementController, { createdSubject, getCreateSubject, getSubjectManagement, handleDeleteSubject, getUpdateSubject } from "../controller/subjectManagement/subjectManagementController";
import curriculumManagementController, { createdCurriculum, getCreateCurriculum, getCurriculumManagement, handleDeleteCurriculum, getUpdateCurriculum, handleUpdateCurriculum } from "../controller/curriculumManagement/curriculumManagementController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/home', homeController.getHomePage);

  // router.get('/material-management/search-material', materialManagementController.getSearchMaterial);
  router.get('/login', loginController.getLoginPage);
  router.post('/account-management/delete-user/:id', accountManageController.handleDeleteUser);
  router.get('/material-management', materialManagementController.getManagementMaterial);
  router.get('/material-management/create-material', materialManagementController.getCreateMaterial);
  router.post('/material-management/create-material/material-created', materialManagementController.createdMaterial);
  router.post('/material-management/delete-material/:id', materialManagementController.handleDeleteMaterial);
  router.get('/account-management/edit-profile/:id', accountManageController.getEditProfilePage);
  router.post('/account-management/edit-profile/updated-user', accountManageController.handleUpdateUser);
  router.get('/account-management', accountManageController.getAccountManage);
  router.get('/account-management/add-newUser', accountManageController.getAddNewUser);
  router.post('/account-management/add-newUser/create-user', accountManageController.handleCreateNewUser);
  router.get('/subject-management', subjectManagementController.getSubjectManagement);
  router.get('/subject-management/create-subjects', subjectManagementController.getCreateSubject);
  router.post('/subject-management/create-subjects/subject-created', subjectManagementController.createdSubject);
  router.post('/subject-management/delete-subject/:id', subjectManagementController.handleDeleteSubject);
  router.get('/subject-management/update-subjects/:id', subjectManagementController.getUpdateSubject);
  router.post('/subject-management/update-subjects/subject-updated', subjectManagementController.handleUpdateSubject);
  router.get('/subject-management', subjectManagementController.getSubjectManagement);
  router.get('/subject-management/create-subjects', subjectManagementController.getCreateSubject);
  router.post('/subject-management/create-subjects/subject-created', subjectManagementController.createdSubject);
  router.post('/subject-management/delete-subject/:id', subjectManagementController.handleDeleteSubject);
  router.get('/subject-management/update-subjects/:id', subjectManagementController.getUpdateSubject);
  router.post('/subject-management/update-subjects/subject-updated', subjectManagementController.handleUpdateSubject);

  router.get('/curriculum-management', curriculumManagementController.getCurriculumManagement);
  router.get('/curriculum-management/create-curriculum', curriculumManagementController.getCreateCurriculum);
  router.post('/curriculum-management/create-curriculum/curriculum-created', curriculumManagementController.createdCurriculum);
  router.post('/curriculum-management/delete-curriculum/:id', curriculumManagementController.handleDeleteCurriculum);
  router.get('/curriculum-management/update-curriculum/:id', curriculumManagementController.getUpdateCurriculum);
  router.post('/curriculum-management/update-curriculum/curriculum-updated', curriculumManagementController.handleUpdateCurriculum);
  // router.get('/api/get-all-users', userController.handleGetAllUsers);
  // router.post('/api/create-new-user', userController.handleCreateNewUser);
  // router.put('/api/edit-user', userController.handleEditUser);
  // router.delete('/api/delete-user', userController.handleDeleteUser);

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  return app.use("/", router);
}

module.exports = initWebRoutes;