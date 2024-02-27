import { query } from 'express';
let getSearchMaterial = async (req, res) => {
    try {

        return res.render('../views/materialManagement/searchMaterial.ejs', {
        })
    } catch (e) {
        console.log(e)
    }

}


module.exports = {
    getSearchMaterial: getSearchMaterial,
}