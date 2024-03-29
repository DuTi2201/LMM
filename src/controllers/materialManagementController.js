import { query } from 'express';
import materialService from "../services/materialService";
import subjectService from "../services/subjectService";

const getManagementMaterial = async (req, res) => {
    let materialList = await materialService.getMaterialList();
    
    return res.render('../views/materialManagement/materialManagement.ejs', { materialList });

}

let getCreateMaterial = async (req, res) => {
    try {
        let subjectList = await subjectService.getSubjectList();
        return res.render('../views/materialManagement/createMaterial.ejs', { subjectList });
    } catch (e) {
        console.log(e)
    }
}


const createdMaterial = (req, res) => {
    
    let rawMaterialData = {
        subject_id: req.body.subject_id,
        material_name: req.body.material_name,
        material_author: req.body.material_author,
        material_isbn: req.body.material_isbn,
        material_publisher: req.body.material_publisher,
        material_edition: req.body.material_edition,
        material_classification: req.body.material_classification
    };
    let fileInfo = { file_name: req.file.originalname,
        file_upload: req.file.filename,
        file_path: req.file.path,
        file_size: req.file.size,
        mimetype: req.file.mimetype};  // replace with actual fileInfo if needed
    materialService.createNewMaterial(rawMaterialData, fileInfo);
    return res.redirect('/material-management');
};

const handleDeleteMaterial = async (req, res) => {
    await materialService.deleteMaterial(req.params.id);
    return res.redirect('/material-management');
}

module.exports = {
    getManagementMaterial: getManagementMaterial,
    getCreateMaterial: getCreateMaterial,
    createdMaterial: createdMaterial,
    handleDeleteMaterial: handleDeleteMaterial,
}