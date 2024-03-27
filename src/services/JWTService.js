import db from "../models/index";
const getGroupWithRole = async(user) => {
    //scop
    let roles = await db.Group.findOne({
        where: { id: user.group_id },
        atributes: ["id", "name", "description"],
        include: {
            model: db.Role,
            atributes: ["id", "url", "description"],
            throgh: { atributes: [] }
        }
    })
    return role ? role : {};
}

module.exports = {
    getGroupWithRole
}