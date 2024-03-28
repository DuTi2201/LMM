import { query } from 'express';
import { validationResult } from 'express-validator';
import curriculumService from "../services/curriculumService";


let getCurriculumManagement = async (req, res) => {
    let curriculumList = await curriculumService.getCurriculumList();
    return res.render('../views/curriculumManagement/viewCurriculum.ejs', { curriculumList });

};
let handleDeleteCurriculum = async (req, res) => {
    await curriculumService.deleteCurriculum(req.params.id);
    return res.redirect('/curriculum-management');
};

let getCreateCurriculum = async (req, res) => {
    try {

        return res.render('../views/curriculumManagement/addNewCurriculum.ejs', {
        })
    } catch (e) {
        console.log(e)
    }

};

let createdCurriculum = async (req, res) => {
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

    

    //create a new curriculum
    let fileInfo = {
        file_name: req.file.originalname,
        file_upload: req.file.filename,
        file_path: req.file.path,
        file_size: req.file.size,
        mimetype: req.file.mimetype
      };
    let newCurriculum = {
        curriculum_name: req.body.curriculum_name,
        curriculum_code: req.body.curriculum_code,
        curriculum_description: req.body.curriculum_description,
        total_credits: req.body.total_credits
    };
    try {
        await curriculumService.createNewCurriculum(newCurriculum, fileInfo);
        return res.redirect("/curriculum-management");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/curriculum-management");
    }
};

const getUpdateCurriculum = async (req, res) => {
    let id = req.params.id;
    let curriculum = await curriculumService.findCurriculumById(id);
    let curriculumData = curriculum;
    return res.render('../views/curriculumManagement/editCurriculum.ejs', { curriculumData })
};

const handleUpdateCurriculum = async (req, res) => {
    let updateCurriculum = {
        id: req.body.id,
        curriculum_name: req.body.curriculum_name,
        curriculum_description: req.body.curriculum_description,
        total_credits: req.body.total_credits
    };
    try {
        await curriculumService.updateCurriculumInfor(updateCurriculum.curriculum_name, updateCurriculum.curriculum_description, updateCurriculum.total_credits, updateCurriculum.id);
        return res.redirect('/curriculum-management')
    } catch (err) {
        console.log(err);
        return res.redirect('/curriculum-management');
    }
};




module.exports = {
    getCurriculumManagement: getCurriculumManagement,
    handleDeleteCurriculum: handleDeleteCurriculum,
    getCreateCurriculum: getCreateCurriculum,
    createdCurriculum: createdCurriculum,
    getUpdateCurriculum: getUpdateCurriculum,
    handleUpdateCurriculum: handleUpdateCurriculum,

}