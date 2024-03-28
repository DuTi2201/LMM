require('dotenv').config();
import db from "../models/index";


const checkSubjectCodeExist = async (SubjectCode) => {
    let subjct = await db.Subject.findOne({
        where: { subject_code: SubjectCode }
    })
    if (subjct) {
        return true;
    }
    return false;
}

const getSubjectList = async () => {
    try {
        let subjectList = [];
        subjectList = await db.Subject.findAll();
    return subjectList
    } catch (e) {
        console.log(e)
        return {
            EM: "Something Wrong...",
            EC: -2
        }
    }
    
}

const createnewSubject = async (rawSubjectData, fileInfo) => {
    try {
        //check curriculum_code are exist
        let isCodeExist = await checkSubjectCodeExist(rawSubjectData.subject_code);
        if (isCodeExist === true) {
            return {
                EM: "The Subject Code is already exist!",
                EC: 1
            }
        }
        
        let newFile = await db.File.create(fileInfo);
        let newSubject = {
            subject_name: rawSubjectData.subject_name,
            subject_code: rawSubjectData.subject_code,
            subject_description: rawSubjectData.subject_description,
            subject_type: rawSubjectData.subject_type
        };
        let createdSubject = await db.Subject.create(newSubject);

        await db.File_Subject.create({
            subject_id: createdSubject.id,
            file_id: newFile.id
          });
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


// const createNewSubject = async (rawSubjectData) => {
//     try {
//         //check curriculum_code are exist
//         let isCodeExist = await checkSubjectCodeExist(rawSubjectData.subject_code);
//         if (isCodeExist === true) {
//             return {
//                 EM: "The Subject Code is already exist!",
//                 EC: 1
//             }
//         }
//         await db.Subject.create({
//             subject_name: rawSubjectData.subject_name,
//             subject_code: rawSubjectData.subject_code,
//             subject_description: rawSubjectData.subject_description,
//             subject_type: rawSubjectData.subject_type
//         })
//         return {
//             EM: "Create a new subject successful",
//             EC: '0'
//         }
//     } catch (e) {
//         console.log(e)
//         return {
//             EM: "Something Wrong...",
//             EC: -2
//         }
//     }
// }

const findSubjectById = async (id) => {
    let subjct = {};
    subjct = await db.Subject.findOne({
        where: {id:id},
    })
    return subjct.get({ plain: true });
}

const updateSubjectInfor = async (subject_name, subject_description, subject_type, id) => {
    try {
      // Cập nhật Curriculum
      await db.Subject.update({ subject_name, subject_description, subject_type },
        { where: { id: id}
        }
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  };


const deleteSubject = async (subjectId) => {
    await db.Subject.destroy({
        where: { id: subjectId }
    })
   
};

const getSubjectsByCurriculum = async (curriculumId) => {
    let curriculumSubjects = await db.Curriculum_Subject.findAll({
        where: { curriculum_id: curriculumId }
    });
    let subjectIds = curriculumSubjects.map(cs => cs.subject_id);
    return await db.Subject.findAll({
        where: { id: subjectIds }
    });
};

const enrollSubject = async (userId, subjectId) => {
    return await db.Subject_User.create({ user_id: userId, subject_id: subjectId });
};

module.exports = {
    createNewSubject,getSubjectList,deleteSubject,findSubjectById,updateSubjectInfor, getSubjectsByCurriculum, enrollSubject
  
}