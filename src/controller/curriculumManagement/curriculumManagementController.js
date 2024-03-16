import { query } from 'express';
import curriculumService from "../../service/curriculumService";

let getCurriculumManagement = async (req, res) => {
    try {
        let curriculumList = await curriculumService.getCurriculumList();
        return res.render('curriculumManagement/viewCurriculum.ejs', { curriculumList: curriculumList });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}


const handleDeleteCurriculum = async(req, res) => {
    await curriculumService.deleteCurriculum(req.params.id);
    return res.redirect('/curriculum-management');
}

let getCreateCurriculum = async (req, res) => {
    try {

        return res.render('curriculumManagement/addNewCurriculum.ejs', {
        })
    } catch (e) {
        console.log(e)
    }

}

const createdCurriculum =  (req, res) => {
    let curriculum_name = req.body.curriculum_name;
    let curriculum_code = req.body.curriculum_code;
      let curriculum_description = req.body.curriculum_description;
      let total_credits = req.body.total_credits;
      curriculumService.createNewCurriculum(curriculum_code, curriculum_name, curriculum_description, total_credits);
     
      return res.redirect('/curriculum-management');


};
const getUpdateCurriculum = async (req, res) => {
    try {
        let id = req.params.id;
        let curriculum = await curriculumService.getCurriculumById(id);
        let curriculumData = {};
        if (curriculum && curriculum.length > 0) {
            curriculumData = curriculum[0]
        }
        return res.render('curriculumManagement/editCurriculum.ejs', {curriculumData})
    } catch (e) {
        console.log(e)
    }

}
const handleUpdateCurriculum = async (req, res) => {
    let id = req.body.id;
    let curriculum_code = req.body.curriculum_code;
    let curriculum_name = req.body.curriculum_name;
    let curriculum_description = req.body.curriculum_description;
    let total_credits = req.body.total_credits;

    
    await curriculumService.updateCurriculumInfor(id, curriculum_code, curriculum_name, curriculum_description, total_credits);
   
    return res.redirect('/curriculum-management');
}
module.exports = {
    getCurriculumManagement: getCurriculumManagement,
    handleDeleteCurriculum: handleDeleteCurriculum,
    getCreateCurriculum: getCreateCurriculum,
    createdCurriculum: createdCurriculum,
    getUpdateCurriculum: getUpdateCurriculum,
    handleUpdateCurriculum:handleUpdateCurriculum,
}