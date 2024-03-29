require('dotenv').config();
import db from "../models/index";



const getMaterialList = async () => {
    try {
      let materialList = await db.Material.findAll({
        include: [{
          model: db.File,
          as: 'file',
          required: false,
          through: { model: db.Material_File }
          }]
      });
      return materialList;
    } catch (e) {
      console.log(e);
      return {
        EM: "Something Wrong...",
        EC: -2
      };
    }
};
  
const checkMaterialCodeExist = async (ISBN) => {
  let Material = await db.Material.findOne({
      where: { material_isbn: ISBN }
  })
  if (Material) {
      return true;
  }
  return false;
}

const createNewMaterial = async (rawMaterialData, fileInfo) => {
  try {
      if (!rawMaterialData || !rawMaterialData.material_isbn) {
          return {
              EM: "Invalid input data",
              EC: -1
          }
      }

      let isCodeExist = await checkMaterialCodeExist(rawMaterialData.material_isbn);
      if (isCodeExist === true) {
          return {
              EM: "The Material is already exist!",
              EC: 1
          }
      }
      
      let newFile = await db.File.create(fileInfo);
      let newMaterial = {
        subject_id: rawMaterialData.subject_id,
          material_name: rawMaterialData.material_name,
          material_author: rawMaterialData.material_author,
          material_isbn: rawMaterialData.material_isbn,
          material_publisher: rawMaterialData.material_publisher,
          material_edition: rawMaterialData.material_edition,
          material_classification: rawMaterialData.material_classification,
      };
      let createdMaterial = await db.Material.create(newMaterial);

      await db.Material_File.create({
          material_id: createdMaterial.id,
          file_id: newFile.id
        });
      return {
          EM: "Create a new material successful",
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


const deleteMaterial = async (id) => {
  try {
    const material = await db.Material.destroy({
      where: {
        id: id
      }
    });
    return material;
  } catch (e) {
    console.log(e);
    return {
      EM: "Something Wrong...",
      EC: -2
    };
  }
}

module.exports = {
    getMaterialList,deleteMaterial, createNewMaterial,
  
}