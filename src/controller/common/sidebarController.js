import { query } from 'express';
import sidebarService from "../../service/sidebarService";
let getSubjectManagement = async (req, res) => {
    try {
        let subjectList = await sidebarService.getSubjectList();
        return res.render('partials/sidebar/mainSidebar.ejs', { subjectList: subjectList });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getSubjectManagement: getSubjectManagement,
}