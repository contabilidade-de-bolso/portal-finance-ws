import Sequelize from "sequelize";
import * as Yup from "yup";
import CategoryGroup from "../models/CategoryGroup";
import CategoryGroupSub from "../models/CategoryGroupSub";

class CategoryController {
  async list(req, res) {
    const categories = await CategoryGroup.findAll({
      attributes: ["id", "cd_category_group", "nm_category_group", "icon"],
      include: [
        {
          model: CategoryGroupSub,
          as: "category_group_sub",
          attributes: [
            "id",
            "category_group_id",
            "cd_category_group_sub",
            "nm_category_group_sub"
          ]
        }
      ]
    });

    return res.json({ result: categories, sucess: true });
  }

  async searchSubCategory(req, res) {
    const schema = Yup.object().shape({
      nm_category_group_sub: Yup.string().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({
        success: false,
        message: "Necessário informar a sub-categoria.",
        errocode: "FIELDS_REQUIRED"
      });

    const categories = await CategoryGroup.findAll({
      attributes: ["id", "cd_category_group", "nm_category_group", "icon"],
      include: [
        {
          model: CategoryGroupSub,
          as: "category_group_sub",
          attributes: [
            "id",
            "category_group_id",
            "cd_category_group_sub",
            "nm_category_group_sub"
          ],
          where: Sequelize.where(
            Sequelize.fn(
              "convertString",
              Sequelize.col("category_group_sub.nm_category_group_sub")
            ),
            { [Sequelize.Op.iLike]: `%${req.body.nm_category_group_sub}%` }
          )
        }
      ]
    });

    return res.json({ result: categories, sucess: true });
  }
}

export default new CategoryController();
