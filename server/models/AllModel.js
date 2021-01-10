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
            fbUID:{type: Sequelize.STRING},
            gg_email:{type: Sequelize.STRING},
            name:{type: Sequelize.STRING},
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

    mainTransferHistory(){
        class modelTransferHistory extends Sequelize.Model {}
        modelTransferHistory.init({
                user_id: {
                    type: Sequelize.INTEGER,
                    validate: {
                        notEmpty: true
                    },
                    field: 'user_id'
                },
                bank_acc_id: Sequelize.INTEGER,
                summand: Sequelize.INTEGER,
                destination_id: Sequelize.INTEGER,
                arrival_id: Sequelize.INTEGER,
                transfer_at: {
                    type: Sequelize.DATE,
                    field: 'transfer_at'
                },
                status: Sequelize.INTEGER,
                created_at: {
                    type: Sequelize.DATE,
                    field: 'created_at'
                },
                updated_at: {
                    type: Sequelize.DATE,
                    field: 'updated_at'
                },
            },
            { sequelize, modelName: 'transfershistories',
                tableName: 'transfershistories',
                timestamps: false
            });

        return modelTransferHistory;
    }
}

