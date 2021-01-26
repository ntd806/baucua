const Option = require('../../models/useradmins');

let userAdminModel= new Option();

const getUserByUsername = async(username) => {
    return await userAdminModel.getUserAdminByUsername(username);
}

module.exports = {
    getUserByUsername
};
