import { query } from 'express';
let getAddMaterial =  (req, res) => {

        return res.render('../views/materialManagement/addMaterial.ejs');
}


module.exports = {
    getAddMaterial: getAddMaterial,
}