import { query } from 'express';
import materialService from "../../service/materialService";

const getManagementMaterial = async (req, res) => {
    let materialList = await materialService.getMaterialList();
    return res.render('materialManagement/materialManagement.ejs', { materialList });

}

let getCreateMaterial = async (req, res) => {
    try {
        return res.render('materialManagement/createMaterial.ejs', {
        })
    } catch (e) {
        console.log(e)
    }
}

const createdMaterial = (req, res) => {
    let syllabus_id = req.body.syllabus_id;
    let subject_id = req.body.subject_id;
    let subject_name = req.body.subject_name;
    let material_description = req.body.material_description;
    let author = req.body.author;
    let isbn = req.body.isbn;
    let publisher = req.body.publisher;
    let edition = req.body.edition;
    let note = req.body.note;
    let classification = req.body.classification;
    materialService.createNewMaterial(syllabus_id, subject_id, subject_name, material_description, author, isbn, publisher, edition, note, classification);

    return res.redirect('/material-management');


};


const handleDeleteMaterial = async (req, res) => {
    await subjectService.deleteMaterial(req.params.id);
    return res.redirect('/material-management');
}

module.exports = {
    getManagementMaterial: getManagementMaterial,
    getCreateMaterial: getCreateMaterial,
    createdMaterial: createdMaterial,
    handleDeleteMaterial: handleDeleteMaterial,
}