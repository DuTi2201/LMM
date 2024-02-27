import { query } from 'express';
let getLoginPage = async (req, res) => {
    try {

        return res.render('../views/common/loginPage.ejs', {
        })
    } catch (e) {
        console.log(e)
    }

}


module.exports = {
    getLoginPage: getLoginPage,
}