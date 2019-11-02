import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import User from "../app/models/User";
import CategoryGroup from "../app/models/CategoryGroup";
import CategoryGroupSub from "../app/models/CategoryGroupSub";
import Transaction from "../app/models/Transaction";
import TransactionType from "../app/models/TransactionType";

const models = [
  User,
  CategoryGroup,
  CategoryGroupSub,
  Transaction,
  TransactionType
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
