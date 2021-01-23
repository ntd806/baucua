'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../helper/Database');

module.exports = class AllModel {

    constructor(){
        this.Op = Sequelize.Op;
    }

    /**
     * MainAmin
     * author: ntd806
     * Time: 01/23/2021
     */
    mainAdmin(){
        class modelAdmin extends Sequelize.Model {}
        modelAdmin.init({
            id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
            fbUID:{type: Sequelize.STRING},
            gg_email:{type: Sequelize.STRING},
        },
        { sequelize, modelName: 'user_admins',
            tableName: 'user_admins',
            timestamps: false
        });
        return modelAdmin;
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
            phone: {type: Sequelize.NUMBER}
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
            win: Sequelize.INTEGER,
            lose: Sequelize.INTEGER,
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
        sequelize, modelName: 'matcheshistories',
        tableName: 'matcheshistories',
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

    mainCharacter(){
        class modelCharacter extends Sequelize.Model {}
        modelCharacter.init({
            game_type: {
                type: Sequelize.INTEGER,
                field: 'game_type'
            },
            character_1: {
                type: Sequelize.STRING,
                field: 'character_1'
            },
            character_2: {
                type: Sequelize.STRING,
                field: 'character_2'
            },
            character_3: {
                type: Sequelize.STRING,
                field: 'character_3'
            },
            character_4: {
                type: Sequelize.STRING,
                field: 'character_4'
            },
            character_5: {
                type: Sequelize.STRING,
                field: 'character_5'
            },
            character_6: {
                type: Sequelize.STRING,
                field: 'character_6'
            },
            character_7: {
                type: Sequelize.STRING,
                field: 'character_7'
            },
            character_8: {
                type: Sequelize.STRING,
                field: 'character_8'
            },
            character_9: {
                type: Sequelize.STRING,
                field: 'character_9'
            },
            character_10: {
                type: Sequelize.STRING,
                field: 'character_10'
            },
            created_at: {
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updated_at: {
                type: Sequelize.DATE,
                field: 'updated_at'
            },
        },
        { sequelize, modelName: 'characters',
            tableName: 'characters',
            timestamps: false
        });

        return modelCharacter;
    }

    mainConversionRate() {
        class modelConversionRate extends Sequelize.Model {} modelConversionRate.init({
            number_conversion: {
                type:Sequelize.INTEGER,
                field: 'number_conversion'
            },
            type: {
                type:Sequelize.STRING,
                field: 'type'
            },
            created_at: {
                type: Sequelize.DATE,
                field: 'createdAt'
            },
            updated_at: {
                type: Sequelize.TIME,
                field: 'updatedAt'
            }
        },
        { sequelize, modelName: 'conversion_rates',
            tableName: 'conversion_rates',
            timestamps: false
        });

        return modelConversionRate;
    }

}

