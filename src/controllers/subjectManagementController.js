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

const handleDeleteSubject = async (req, res) => {
    await subjectService.deleteSubject(req.params.id);
    return res.redirect('/subject-management');
}

let getCreateSubject = async (req, res) => {
    try {
        // Query the database to get the list of curriculum names
        let curriculumList = await curriculumService.getCurriculumList();

        return res.render('../views/subjectManagement/createSubject.ejs', {
            curriculumList: curriculumList
        });
    } catch (e) {
        console.log(e)
    }
}



let createdSubject = async (req, res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/subject-management");
    }
    if (!req.file) {
        req.flash("errors", "No file uploaded");
        return res.redirect("/subject-management");
    }
    let fileInfo = {
        file_name: req.file.originalname,
        file_upload: req.file.filename,
        file_path: req.file.path,
        file_size: req.file.size,
        mimetype: req.file.mimetype
    };
    let newSubject = {
        subject_name: req.body.subject_name,
        subject_code: req.body.subject_code,
        subject_description: req.body.subject_description,
        subject_type: req.body.subject_type
    };
    try {
        await subjectService.createNewSubject(newSubject, fileInfo);
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
        return res.render('subjectManagement/editSubject.ejs', { subjectData })
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
        return res.redirect('/subject-management');
    } catch (err) {
        console.log(err);
        return res.redirect('/subject-management');
    }
};

const getEnroll = async (req, res) => {
    try {
        let curriculum = await curriculumService.getCurriculumList();
        let subject;
        if (req.query.curriculum) {
            subject = await subjectService.getSubjectsByCurriculum(req.query.curriculum);
        }
        res.render('../views/subjectManagement/enrollSubject.ejs', { curriculum: curriculum, subject: subject });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

const postEnroll = async (req, res) => {
    try {
        let userId = req.session.userId; 
        let subjectId = req.body.subject;
        await subjectService.enrollSubject(userId, subjectId);
        res.redirect('/'); // Chuyển hướng người dùng tới trang chủ sau khi ghi danh
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}; 

module.exports = {
    getSubjectManagement: getSubjectManagement,
    handleDeleteSubject: handleDeleteSubject,
    getCreateSubject: getCreateSubject,
    createdSubject: createdSubject,
    getUpdateSubject: getUpdateSubject,
    handleUpdateSubject: handleUpdateSubject,
    getEnroll: getEnroll,
    postEnroll: postEnroll
}
