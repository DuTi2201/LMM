import { query } from 'express';
let getEditProfilePage = async (req, res) => {
    try {

        return res.render('../views/accountManage/editProfilePage.ejs', {
        })
    } catch (e) {
        console.log(e)
    }

}


module.exports = {
    getEditProfilePage: getEditProfilePage,
}