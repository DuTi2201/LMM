import { query } from 'express';
let getManagementMaterial = async (req, res) => {
    try {

        return res.render('../views/materialManagement/managementMaterial.ejs', {
        })
    } catch (e) {
        console.log(e)
    }

}


module.exports = {
    getManagementMaterial: getManagementMaterial,
}