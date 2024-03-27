require('dotenv').config();
import db from "../models/index";

const checkCurriCodeExist = async (curriCode) => {
    let curri = await db.Curriculum.findOne({
        where: { curriculum_code: curriCode }
    })
    if (curri) {
        return true;
    }
    return false;
}

const getCurriculumList = async () => {
    try {
        let curriList = [];
    curriList = await db.Curriculum.findAll();
    return curriList
    } catch (e) {
        console.log(e)
        return {
            EM: "Something Wrong...",
            EC: -2
        }
    }
    
}

const createNewCurriculum = async (rawCurriculumData) => {
    try {
        //check curriculum_code are exist
        let isCodeExist = await checkCurriCodeExist(rawCurriculumData.curriculum_code);
        if (isCodeExist === true) {
            return {
                EM: "The Curriculum Code is already exist!",
                EC: 1
            }
        }
        await db.Curriculum.create({
            curriculum_name: rawCurriculumData.curriculum_name,
            curriculum_code: rawCurriculumData.curriculum_code,
            curriculum_description: rawCurriculumData.curriculum_description,
            total_credits: rawCurriculumData.total_credits
        })
        return {
            EM: "Create a new curriculum successful",
            EC: '0'
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Something Wrong...",
            EC: -2
        }
    }
}

const findCurriculumById = async (id) => {
    let curri = {};
    curri = await db.Curriculum.findOne({
        where: {id:id},
    })
    return curri.get({ plain: true });
}

const updateCurriculumInfor = async (curriculum_name, curriculum_description, total_credits, id) => {
    try {
      // Cập nhật người dùng
      await db.Curriculum.update({ curriculum_name, curriculum_description, total_credits },
        { where: { id: id}
        }
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

const deleteCurriculum = async (curriId) => {
    await db.Curriculum.destroy({
       where: { id:curriId }
   })
   
}

module.exports = {
    createNewCurriculum,getCurriculumList,deleteCurriculum,findCurriculumById,updateCurriculumInfor,
  
}