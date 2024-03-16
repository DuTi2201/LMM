import { query } from 'express';
import subjectService from "../../service/subjectService";

let getSubjectManagement = async (req, res) => {
    try {
        let subjectList = await subjectService.getSubjectList();
        return res.render('subjectManagement/viewSubjectDetail.ejs', { subjectList: subjectList });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}


const handleDeleteSubject = async(req, res) => {
    await subjectService.deleteSubject(req.params.id);
    return res.redirect('/subject-management');
}

let getCreateSubject = async (req, res) => {
    try {

        return res.render('subjectManagement/createSubject.ejs', {
        })
    } catch (e) {
        console.log(e)
    }

}

const createdSubject =  (req, res) => {
    let subject_name = req.body.subject_name;
    let subject_code = req.body.subject_code;
      let subject_description = req.body.subject_description;
      let total_credits = req.body.total_credits;
      subjectService.createNewSubject(subject_code, subject_name, subject_description, total_credits);
     
      return res.redirect('/subject-management');


};
const getUpdateSubject = async (req, res) => {
    try {
        let id = req.params.id;
        let subject = await subjectService.getSubjectById(id);
        let subjectData = {};
        if (subject && subject.length > 0) {
            subjectData = subject[0]
        }
        return res.render('subjectManagement/editSubject.ejs', {subjectData})
    } catch (e) {
        console.log(e)
    }

}
const handleUpdateSubject = async (req, res) => {
    let id = req.body.id;
    let subject_code = req.body.subject_code;
    let subject_name = req.body.subject_name;
    let subject_description = req.body.subject_description;
    let total_credits = req.body.total_credits;

    
    await subjectService.updateSubjectInfor(id, subject_code, subject_name, subject_description, total_credits);
   
    return res.redirect('/subject-management');
}
module.exports = {
    getSubjectManagement: getSubjectManagement,
    handleDeleteSubject: handleDeleteSubject,
    getCreateSubject: getCreateSubject,
    createdSubject: createdSubject,
    getUpdateSubject: getUpdateSubject,
    handleUpdateSubject:handleUpdateSubject,
}