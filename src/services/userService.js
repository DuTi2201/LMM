require('dotenv').config();
import db from "../models/index";

const getUserList = async () => {
  try {
      let userList = await db.User.findAll();
      return userList;
  } catch (error) {
      console.log(error);
      throw new Error("Error while fetching user list");
  }
}

const deleteUser = async (userId) => {
     await db.User.destroy({
        where: { id:userId }
    })
    
}

const findUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: {id:id},
    })
    return user.get({ plain: true });
}

const updateUserInfor = async (firstName, lastName, phonenumber, gender, id ) => {
    try {
      // Cập nhật người dùng
      await db.User.update({ firstName, lastName, phonenumber, gender },
        { where: { id: id}
        }
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

module.exports = {
 getUserList,deleteUser,findUserById, updateUserInfor
}