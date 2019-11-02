import Sequelize, { Model } from "sequelize";

class CategoryGroup extends Model {
  static init(sequelize) {
    super.init(
      {
        cd_category_group: Sequelize.STRING,
        nm_category_group: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    CategoryGroup.tableName = "tb_category_group";
    return this;
  }

  static associate(models) {
    this.hasMany(models.CategoryGroupSub, {
      foreignKey: "category_group_id",
      as: "category_group_sub"
    });

    this.hasMany(models.Transaction, {
      foreignKey: "category_group_id",
      as: "transaction",
      sourceKey: "id"
    });
  }
}

export default CategoryGroup;
