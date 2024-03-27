require('dotenv').config();
import db from "../models/index";


const saveFileInfo = async (file) => {
  try {
    let createdFile = await db.File.create({
      file_upload: file.file_upload,
      file_path: file.file_path,
      file_size: file.file_size,
      mimetype: file.mimetype
    });
    return createdFile;
  } catch (err) {
    console.log(err);
    throw err;
  }
};



module.exports = {
   saveFileInfo
}
