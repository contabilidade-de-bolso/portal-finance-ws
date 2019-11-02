"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("tb_category_group", "icon", {
      type: Sequelize.STRING,
      defaultValue: "fas fa-wallet",
      allowNull: false
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("tb_category_group", "icon");
  }
};
