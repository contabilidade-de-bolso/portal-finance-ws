"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tb_category_group_sub", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      category_group_id: {
        type: Sequelize.INTEGER,
        references: { model: "tb_category_group", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      cd_category_group_sub: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nm_category_group_sub: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable("tb_category_group_sub");
  }
};
