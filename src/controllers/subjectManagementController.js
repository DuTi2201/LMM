import { query } from 'express';
import { validationResult } from 'express-validator';
import subjectService from "../services/subjectService";
import curriculumService from "../services/curriculumService";

let getSubjectManagement = async (req, res) => {
    try {
        let subjectList = await subjectService.getSubjectList();
        return res.render('../views/subjectManagement/viewSubjectDetail.ejs', { subjectList });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }

};

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

let createdSubject = async (req, res) => {
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
    let newSubject = {
        subject_name: req.body.subject_name,
        subject_code: req.body.subject_code,
        subject_description: req.body.subject_description,
        subject_type: req.body.subject_type
    };
    try {
        await subjectService.createNewSubject(newSubject);
        return res.redirect("/subject-management");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/subject-management");
    }
};

const getUpdateSubject = async (req, res) => {
    try {
        let id = req.params.id;
        let subject = await subjectService.findSubjectById(id);
        let subjectData = subject;
        return res.render('subjectManagement/editSubject.ejs', {subjectData})
    } catch (e) {
        console.log(e)
    }

}

const handleUpdateSubject = async (req, res) => {
    let updateSubject = {
        id: req.body.id,
        subject_name: req.body.subject_name,
        subject_description: req.body.subject_description,
        subject_type: req.body.subject_type
    };
    try {
      await subjectService.updateSubjectInfor(updateSubject.subject_name, updateSubject.subject_description, updateSubject.subject_type, updateSubject.id);
      return res.redirect('/subject-management')
    } catch (err) {
      console.log(err);
      return res.redirect('/subject-management'); 
    }
};

const getEnroll = async (req, res) => {
    let curriculum = await curriculumService.getCurriculumList();
    let subject;
    if (req.query.curriculum) {
        subject = await subjectService.getSubjectsByCurriculum(req.query.curriculum);
    }
    res.render('../views/subjectManagement/enrollSubject.ejs', { curriculum: curriculum, subject: subject });
};

const postEnroll = async (req, res) => {
    let userId = req.session.userId; // Giả sử bạn lưu id của người dùng trong session
    let subjectId = req.body.subject;
    await subjectService.enrollSubject(userId, subjectId);
    res.redirect('/'); // Chuyển hướng người dùng tới trang chủ sau khi ghi danh
};



module.exports = {
    getSubjectManagement: getSubjectManagement,
    handleDeleteSubject: handleDeleteSubject,
    getCreateSubject: getCreateSubject,
    createdSubject: createdSubject,
    getUpdateSubject: getUpdateSubject,
    handleUpdateSubject: handleUpdateSubject,
    getEnroll: getEnroll,
    postEnroll:postEnroll
}