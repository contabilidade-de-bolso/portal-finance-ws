import Sequelize from "sequelize";
import * as Yup from "yup";
import Transaction from "../models/Transaction";
import TransactionType from "../models/TransactionType";
import CategoryGroup from "../models/CategoryGroup";
import CategoryGroupSub from "../models/CategoryGroupSub";
import { startOfMonth, format, endOfMonth } from "date-fns";

class ResumeTransactionController {
  async getResumeTransaction(req, res) {
    var { currentDate } = req.body;

    var resume = await Transaction.findAll({
      attributes: [
        "category_group_id",
        [Sequelize.fn("sum", Sequelize.col("vl_transaction")), "vl_transaction"]
      ],
      include: [
        {
          model: CategoryGroup,
          as: "category_group",
          attributes: ["nm_category_group"]
        }
      ],
      where: {
        user_id: req.userId,
        dt_transaction: {
          [Sequelize.Op.between]: [
            format(
              startOfMonth(
                new Date(
                  currentDate.year,
                  currentDate.month - 1,
                  currentDate.day
                )
              ),
              "yyyyMMdd"
            ),
            format(
              endOfMonth(
                new Date(
                  currentDate.year,
                  currentDate.month - 1,
                  currentDate.day
                )
              ),
              "yyyyMMdd"
            )
          ]
        }
      },
      group: [
        "category_group_id",
        "category_group.nm_category_group",
        "category_group.id"
      ]
    });

    resume = resume
      .map(item => {
        item.nm_category_group = item.category_group.nm_category_group;
        return item;
      })
      .sort((a, b) => {
        return b.vl_transaction - a.vl_transaction;
      });

    return res.json({ result: resume, sucess: true });
  }

  async getResumeTransactionGrid(req, res) {
    var { currentDate } = req.body;

    var resume = await Transaction.findAll({
      attributes: [
        "dt_transaction",
        "nm_transaction",
        "category_group_id",
        "vl_transaction",
        "cd_transaction_type"
      ],
      include: [
        {
          model: CategoryGroup,
          as: "category_group",
          attributes: ["nm_category_group", "icon"]
        },
        {
          model: TransactionType,
          as: "transaction_type",
          attributes: ["nm_transaction_type"]
        }
      ],
      where: {
        user_id: req.userId,
        dt_transaction: {
          [Sequelize.Op.between]: [
            format(
              startOfMonth(
                new Date(
                  currentDate.year,
                  currentDate.month - 1,
                  currentDate.day
                )
              ),
              "yyyyMMdd"
            ),
            format(
              endOfMonth(
                new Date(
                  currentDate.year,
                  currentDate.month - 1,
                  currentDate.day
                )
              ),
              "yyyyMMdd"
            )
          ]
        }
      },
      order: [["vl_transaction", "desc"]]
    });

    resume = resume
      .map(item => {
        if (item.cd_transaction_type == "SAI")
          item.vl_transaction = -1 * item.vl_transaction;

        item.nm_category_group = item.category_group.nm_category_group;
        return item;
      })
      .sort((a, b) => b.vl_transaction - a.vl_transaction);

    return res.json({ result: resume, sucess: true });
  }

  async getResumeTransactionSubCategory(req, res) {
    var { currentDate } = req.body;
    const schema = Yup.object().shape({
      category_group_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({
        success: false,
        errormessage: "Todos os campos são necessarios."
      });

    var { category_group_id } = req.body;

    var resume = await Transaction.findAll({
      attributes: ["category_group_sub_id", "vl_transaction", "nm_transaction"],
      include: [
        {
          model: CategoryGroupSub,
          as: "category_group_sub",
          attributes: ["nm_category_group_sub"]
        }
      ],
      where: {
        user_id: req.userId,
        category_group_id,
        dt_transaction: {
          [Sequelize.Op.between]: [
            format(
              startOfMonth(
                new Date(
                  currentDate.year,
                  currentDate.month - 1,
                  currentDate.day
                )
              ),
              "yyyyMMdd"
            ),
            format(
              endOfMonth(
                new Date(
                  currentDate.year,
                  currentDate.month - 1,
                  currentDate.day
                )
              ),
              "yyyyMMdd"
            )
          ]
        }
      }
    });

    resume = resume
      .map(item => {
        item.nm_category_group_sub =
          item.category_group_sub.nm_category_group_sub;
        return item;
      })
      .sort((a, b) => {
        return b.vl_transaction - a.vl_transaction;
      });

    return res.json({ result: resume, sucess: true });
  }

  async getResumeTransactionGridSubCategoria(req, res) {
    var { currentDate } = req.body;

    const schema = Yup.object().shape({
      category_group_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({
        success: false,
        errormessage: "Todos os campos são necessarios."
      });

    var { category_group_id } = req.body;

    var resume = await Transaction.findAll({
      attributes: [
        "dt_transaction",
        "nm_transaction",
        "category_group_id",
        "vl_transaction",
        "cd_transaction_type"
      ],
      include: [
        {
          model: CategoryGroup,
          as: "category_group",
          attributes: ["icon"]
        },
        {
          model: CategoryGroupSub,
          as: "category_group_sub",
          attributes: ["nm_category_group_sub"]
        },
        {
          model: TransactionType,
          as: "transaction_type",
          attributes: ["nm_transaction_type"]
        }
      ],
      where: {
        category_group_id,
        user_id: req.userId,
        dt_transaction: {
          [Sequelize.Op.between]: [
            format(
              startOfMonth(
                new Date(
                  currentDate.year,
                  currentDate.month - 1,
                  currentDate.day
                )
              ),
              "yyyyMMdd"
            ),
            format(
              endOfMonth(
                new Date(
                  currentDate.year,
                  currentDate.month - 1,
                  currentDate.day
                )
              ),
              "yyyyMMdd"
            )
          ]
        }
      },
      order: [["vl_transaction", "desc"]]
    });

    resume = resume.map(item => {
      if (item.cd_transaction_type == "SAI")
        item.vl_transaction = -1 * item.vl_transaction;

      item.nm_category_group_sub =
        item.category_group_sub.nm_category_group_sub;
      return item;
    });

    return res.json({ result: resume, sucess: true });
  }

  async getDetailDashboard(req, res) {
    var { currentDate } = req.body;

    var where = {
      user_id: req.userId,
      cd_transaction_type: "ENT",
      dt_transaction: {
        [Sequelize.Op.between]: [
          format(
            startOfMonth(
              new Date(currentDate.year, currentDate.month - 1, currentDate.day)
            ),
            "yyyyMMdd"
          ),
          format(
            endOfMonth(
              new Date(currentDate.year, currentDate.month - 1, currentDate.day)
            ),
            "yyyyMMdd"
          )
        ]
      }
    };

    var dataREC = await Transaction.findAll({
      attributes: ["nm_transaction", "vl_transaction"],
      where
    });

    where["cd_transaction_type"] = "SAI";
    var dataDES = await Transaction.findAll({
      attributes: ["nm_transaction", "vl_transaction"],
      where
    });

    var value = 0;
    dataREC.map(item => (value += parseFloat(item.vl_transaction)));
    let REC = {
      id: "REC",
      title: "Receita",
      value: value,
      date: format(
        new Date(currentDate.year, currentDate.month - 1, currentDate.day),
        "yyyyMMdd"
      ),
      graph: dataREC
        .map(item => [item.nm_transaction, parseFloat(item.vl_transaction)])
        .sort((a, b) => b[1] - a[1])
    };
    REC["value"] = REC["value"] ? REC["value"] : 0;

    value = 0;
    dataDES.map(item => (value += parseFloat(item.vl_transaction)));
    let DES = {
      id: "DES",
      title: "Despesa",
      value: value,
      date: format(
        new Date(currentDate.year, currentDate.month - 1, currentDate.day),
        "yyyyMMdd"
      ),
      graph: dataDES
        .map(item => [item.nm_transaction, parseFloat(item.vl_transaction)])
        .sort((a, b) => b[1] - a[1])
    };
    DES["value"] = DES["value"] ? DES["value"] : 0;

    let SAL = {
      id: "SAL",
      title: "Balanço",
      value: REC["value"] - DES["value"],
      date: format(
        new Date(currentDate.year, currentDate.month - 1, currentDate.day),
        "yyyyMMdd"
      ),
      graph: [["Receitas", REC["value"]], ["Despesas", DES["value"]]]
    };

    return res.json({ result: [REC, DES, SAL], sucess: true });
  }
}

export default new ResumeTransactionController();
