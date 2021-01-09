const Sequelize = require('sequelize');
const sequelize = require('../helper/Database');

module.exports = class AllModel {

    constructor(){
        this.Op = Sequelize.Op;
    }

    mainUser(){
        class modelUser extends Sequelize.Model {}
        modelUser.init({
                id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
                permission_id: {type: Sequelize.INTEGER},
                fb_UID:{type: Sequelize.STRING},
                gg_email:{type: Sequelize.STRING},
                username:{type: Sequelize.STRING},
                address:{type: Sequelize.STRING},
                created_at:{type: Sequelize.DATE},
                updated_at:{type: Sequelize.DATE},
                status:{type: Sequelize.INTEGER},
                password:{type: Sequelize.STRING},
            },
            { sequelize, modelName: 'users',
                tableName: 'users',
                timestamps: false
            });

        return modelUser;
    }
}

