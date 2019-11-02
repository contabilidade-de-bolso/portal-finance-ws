"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_transaction_type", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      cd_transaction_type: {
        type: Sequelize.STRING,
        required: true,
        primaryKey: true
      },
      nm_transaction_type: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tb_transaction_type");
  }
};
