import Sequelize, { Model } from "sequelize";

class TransactionType extends Model {
  static init(sequelize) {
    super.init(
      {
        cd_transaction_type: Sequelize.STRING,
        nm_transaction_type: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    TransactionType.tableName = "tb_transaction_type";
    return this;
  }

  static associate(models) {
    this.hasMany(models.Transaction, {
      foreignKey: "cd_transaction_type",
      as: "transaction",
      sourceKey: "cd_transaction_type"
    });
  }
}

export default TransactionType;
