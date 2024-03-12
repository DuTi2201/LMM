import { query } from 'express';
import subjectService from "../../service/subjectService";
let getSubjectManagement = async (req, res) => {
    let subjectList = await subjectService.getSubjectList();
    return res.render('subjectManagement/viewSubjectDetail.ejs', {subjectList});

}

const handleDeleteSubject = async(req, res) => {
    await subjectService.deleteSubject(req.params.id);
    return res.redirect('/subject-management');
}

let getCreateSubject = async (req, res) => {
    try {

        return res.render('../views/subjectManagement/createSubject.ejs', {
        })
    } catch (e) {
        console.log(e)
    }

}

const createdSubject =  (req, res) => {
      let subject_name = req.body.subject_name;
      let subject_description = req.body.subject_description;
      let subject_type = req.body.subject_type;
      subjectService.createNewSubject(subject_name, subject_description, subject_type);
     
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
    let subject_name = req.body.subject_name;
    let subject_description = req.body.subject_description;
    let subject_type = req.body.subject_type;

    
    await userService.updateSubjectInfor(id, subject_name, subject_description, subject_type);
   
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