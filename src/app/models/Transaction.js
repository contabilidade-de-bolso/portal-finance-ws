import Sequelize, { Model } from "sequelize";

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        category_group_sub_id: Sequelize.INTEGER,
        category_group_id: Sequelize.INTEGER,
        nm_transaction: Sequelize.STRING,
        vl_transaction: Sequelize.NUMBER,
        dt_transaction: Sequelize.INTEGER,
        ds_transaction: Sequelize.STRING,
        cd_transaction_type: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    Transaction.tableName = "tb_transaction";

    return this;
  }

  static associate(models) {
    this.belongsTo(models.CategoryGroup, {
      foreignKey: "category_group_id",
      as: "category_group",
      targetKey: "id"
    });

    this.belongsTo(models.CategoryGroupSub, {
      foreignKey: "category_group_sub_id",
      as: "category_group_sub",
      targetKey: "id"
    });

    this.belongsTo(models.TransactionType, {
      foreignKey: "cd_transaction_type",
      as: "transaction_type",
      targetKey: "cd_transaction_type"
    });
  }
}

export default Transaction;
