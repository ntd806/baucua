const Option = require('../../models/useradmins');

let userAdminModel= new Option();

const getUserByUsername = async(username) => {
    return await userAdminModel.getUserAdminByUsername(username);
}

const updateToken = async(id, token) => {
    return await userAdminModel.updateTokenById(id, token);
}

module.exports = {
    getUserByUsername,
    updateToken
};
