import express from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import accountManagementController from "../controllers/accountManagementController";
import curriculumManagementController from "../controllers/curriculumManagementController";
import subjectManagementController from "../controllers/subjectManagementController";
import JWTAction from "../middleware/JWTAction";
// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    // router.all('*', JWTAction.checkUserJWT, JWTAction.checkUserPermission);
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login", loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.post('/account-management/delete-user/:id', accountManagementController.handleDeleteUser);
    router.get('/account-management/edit-profile/:id', accountManagementController.getUpdateUserPage);
    router.post('/account-management/edit-profile/updated-user', accountManagementController.handleUpdateUser);
    router.get('/account-management', accountManagementController.getAccountManagement);
    router.get('/account-management/add-newUser', accountManagementController.getAddNewUser);
    router.post('/account-management/add-newUser/created-user', accountManagementController.createNewUser);

    router.get('/curriculum-management', curriculumManagementController.getCurriculumManagement);
    router.get('/curriculum-management/create-curriculum', curriculumManagementController.getCreateCurriculum);
    router.post('/curriculum-management/create-curriculum/curriculum-created', curriculumManagementController.createdCurriculum);
    router.post('/curriculum-management/delete-curriculum/:id', curriculumManagementController.handleDeleteCurriculum);
    router.get('/curriculum-management/update-curriculum/:id', curriculumManagementController.getUpdateCurriculum);
    router.post('/curriculum-management/update-curriculum/curriculum-updated', curriculumManagementController.handleUpdateCurriculum);

    router.get('/subject-management', subjectManagementController.getSubjectManagement);
    router.get('/subject-management/create-subjects', subjectManagementController.getCreateSubject);
    router.post('/subject-management/create-subjects/subject-created', subjectManagementController.createdSubject);
    router.post('/subject-management/delete-subject/:id', subjectManagementController.handleDeleteSubject);
    router.get('/subject-management/update-subjects/:id', subjectManagementController.getUpdateSubject);
    router.post('/subject-management/update-subjects/subject-updated', subjectManagementController.handleUpdateSubject);

    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
};
module.exports = initWebRoutes;
