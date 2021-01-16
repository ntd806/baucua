'use strict';
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

    mainOption(){
        class modelOption extends Sequelize.Model {}
        modelOption.init({
            game_type: Sequelize.INTEGER,
            proportionality: Sequelize.INTEGER,
            created_at: {
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updated_at: {
                type: Sequelize.DATE,
                field: 'updated_at'
            },
            is_play: {
                type: Sequelize.TINYINT,
                field: 'is_play'
            }
        },
        { sequelize, modelName: 'options',
            tableName: 'options',
            timestamps: false
        });

        return modelOption;
    }

    mainMatchesHistory(){
        class modelMatchesHistory extends Sequelize.Model {}
        modelMatchesHistory.init({
            user_id: {
                type: Sequelize.INTEGER,
                validate: {
                    notEmpty: true
                },
                field: 'user_id'
            },
            win: Sequelize.STRING,
            lose: Sequelize.STRING,
            type_bet: {
                type: Sequelize.INTEGER,
                validate: {
                    notEmpty: true
                },
                field: 'type_bet'
            },
            place_bet: {
                type: Sequelize.STRING,
                validate: {
                    notEmpty: true
                },
                field: 'place_bet'
            },
            stake: Sequelize.INTEGER,
            status: Sequelize.STRING,
            created_at: {
                type: Sequelize.DATE,
                field: 'created_at'
            },
        },
        {
        sequelize, modelName: 'transfershistories',
        tableName: 'transfershistories',
        timestamps: false
        });
        return modelMatchesHistory;
    }

    mainBankAccount(){
        class modelBankAccount extends Sequelize.Model {}
        modelBankAccount.init({
            user_id: {
                type: Sequelize.INTEGER,
                validate: {
                  notEmpty: true
                },
                field: 'user_id'
              },
              amount: Sequelize.INTEGER,
              is_block: {
                type: Sequelize.INTEGER,
                validate: {
                  notEmpty: true
                },
                field: 'is_block'
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
        { sequelize, modelName: 'bankaccounts',
            tableName: 'bankaccounts',
            timestamps: false
        });

        return modelBankAccount;
    }

    mainBankAccount() {
        class bankaccounts extends Sequelize.Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                // will be user.users()
                users.belongsTo(models.users, {foreignKey: 'user_id', as: 'users'})
            }
        };
        bankaccounts.init({
            userId: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true
                },
                field: 'user_id'
            },
            amount: DataTypes.INTEGER,
            isBlock: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true
                },
                field: 'is_block'
            },
            status: DataTypes.INTEGER,
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at'
            },
        }, {
            sequelize,
            modelName: 'bankaccounts',
        });
        return bankaccounts;
    }
}

