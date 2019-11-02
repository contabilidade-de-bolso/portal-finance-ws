"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_transaction", {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "tb_user", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false,
        required: true
      },
      category_group_sub_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tb_category_group_sub",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false,
        required: true
      },
      category_group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tb_category_group",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false,
        required: true
      },
      cd_transaction_type: {
        type: Sequelize.STRING,
        required: true,
        references: {
          model: "tb_transaction_type",
          key: "cd_transaction_type"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false,
        required: true
      },
      nm_transaction: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      vl_transaction: {
        type: Sequelize.NUMERIC,
        allowNull: false,
        required: true
      },
      dt_transaction: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true
      },
      ds_transaction: {
        type: Sequelize.STRING,
        allowNull: true,
        required: true
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
    return queryInterface.dropTable("tb_transaction");
  }
};
