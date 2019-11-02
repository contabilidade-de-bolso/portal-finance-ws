import Sequelize, { Model } from "sequelize";

class CategoryGroupSub extends Model {
  static init(sequelize) {
    super.init(
      {
        cd_category_group_sub: Sequelize.STRING,
        nm_category_group_sub: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    CategoryGroupSub.tableName = "tb_category_group_sub";
    return this;
  }

  static associate(models) {
    this.hasMany(models.Transaction, {
      foreignKey: "category_group_sub_id",
      as: "transaction",
      sourceKey: "id"
    });
  }
}

export default CategoryGroupSub;
