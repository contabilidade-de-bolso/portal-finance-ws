"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("tb_transaction", "pending", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("tb_transaction", "pending");
  }
};
