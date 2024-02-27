import { query } from 'express';
// import db from '../models/index';
// import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        // let data = await db.User.findAll();

        return res.render('../views/common/homepage.ejs', {
            // data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }

}


module.exports = {
    getHomePage: getHomePage,
}