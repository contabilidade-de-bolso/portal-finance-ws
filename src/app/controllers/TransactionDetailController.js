import Sequelize from "sequelize";
import * as Yup from "yup";
import Transaction from "../models/Transaction";
import TransactionType from "../models/TransactionType";
import CategoryGroup from "../models/CategoryGroup";
import CategoryGroupSub from "../models/CategoryGroupSub";
import { startOfMonth, format, endOfMonth } from "date-fns";

class TransactionDetailController {
  async getDetailCard(req, res) {
    const { cd_transaction_type } = req.body;
    var where = {
      user_id: req.userId,
      cd_transaction_type,
      pending: false
    };

    where = JSON.parse(JSON.stringify(where));
    where["dt_transaction"] = {
      [Sequelize.Op.between]: [
        format(startOfMonth(new Date()), "yyyyMMdd"),
        format(endOfMonth(new Date()), "yyyyMMdd")
      ]
    };

    var [not_pending] = await Transaction.findAll({
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("vl_transaction")), "vl_transaction"]
      ],
      where
    });

    where["pending"] = true;
    var [pending] = await Transaction.findAll({
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("vl_transaction")), "vl_transaction"]
      ],
      where
    });

    const cd_transaction_type_resp =
      cd_transaction_type != "ENT" || cd_transaction_type != "SAI"
        ? "AMB"
        : cd_transaction_type;

    let PENDING = {
      cd_transaction_type: cd_transaction_type_resp,
      value: parseFloat(
        pending.vl_transaction ? parseFloat(pending.vl_transaction) : 0
      )
    };

    let NOT_PENDING = {
      cd_transaction_type: cd_transaction_type_resp,
      value: parseFloat(
        not_pending.vl_transaction ? parseFloat(not_pending.vl_transaction) : 0
      )
    };

    let BALANCE = {
      cd_transaction_type: cd_transaction_type_resp,
      value: PENDING["value"] - NOT_PENDING["value"]
    };

    PENDING["type"] = "PENDING";
    NOT_PENDING["type"] = "NOT_PENDING";
    BALANCE["type"] = "BALANCE";

    return res.json({ result: [PENDING, NOT_PENDING, BALANCE], success: true });
  }

  async getDetailCardChart(req, res) {
    const { cd_transaction_type } = req.body;
    const include = [
      {
        model: CategoryGroup,
        as: "category_group",
        attributes: ["nm_category_group"]
      }
    ];
    const group = [
      "category_group_id",
      "category_group.nm_category_group",
      "category_group.id"
    ];
    var where = {
      user_id: req.userId,
      cd_transaction_type,
      pending: false
    };

    where = JSON.parse(JSON.stringify(where));
    where["dt_transaction"] = {
      [Sequelize.Op.between]: [
        format(startOfMonth(new Date()), "yyyyMMdd"),
        format(endOfMonth(new Date()), "yyyyMMdd")
      ]
    };

    var NOT_PENDING = await Transaction.findAll({
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("vl_transaction")), "vl_transaction"]
      ],
      include,
      where,
      group
    }).map(item => {
      item.vl_transaction = item.vl_transaction
        ? parseFloat(item.vl_transaction)
        : 0;
      return item;
    });

    where["pending"] = true;
    var PENDING = await Transaction.findAll({
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("vl_transaction")), "vl_transaction"]
      ],
      include,
      where,
      group
    }).map(item => {
      item.vl_transaction = item.vl_transaction
        ? parseFloat(item.vl_transaction)
        : 0;
      return item;
    });

    where["pending"] = undefined;
    where = JSON.parse(JSON.stringify(where));
    where["dt_transaction"] = {
      [Sequelize.Op.between]: [
        format(startOfMonth(new Date()), "yyyyMMdd"),
        format(endOfMonth(new Date()), "yyyyMMdd")
      ]
    };

    let BALANCE = await Transaction.findAll({
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("vl_transaction")), "vl_transaction"]
      ],
      include,
      where,
      group
    }).map(item => {
      item.vl_transaction = item.vl_transaction
        ? parseFloat(item.vl_transaction)
        : 0;
      return item;
    });

    const filterArray = (arrayMap, arrayBalance) => {
      arrayBalance.map(balance => {
        const search = arrayMap.filter(
          filter =>
            filter.category_group.nm_category_group ==
            balance.category_group.nm_category_group
        );
        if (!search.length)
          arrayMap.push({
            vl_transaction: 0,
            category_group: {
              nm_category_group: balance.category_group.nm_category_group
            }
          });
      });
    };

    filterArray(PENDING, BALANCE);
    filterArray(NOT_PENDING, BALANCE);

    const CATEGORIES = BALANCE.map(
      balance => balance.category_group.nm_category_group
    ).sort((a, b) => b - a);

    const sortArray = ARRAY => {
      return ARRAY.sort(
        (a, b) =>
          a.category_group.nm_category_group -
          b.category_group.nm_category_group
      );
    };

    PENDING = sortArray(PENDING);
    NOT_PENDING = sortArray(NOT_PENDING);
    BALANCE = sortArray(BALANCE);

    return res.json({
      result: { PENDING, NOT_PENDING, BALANCE, CATEGORIES },
      success: true
    });
  }

  async getTransactionDetailGrid(req, res) {
    var resume = await Transaction.findAll({
      attributes: [
        "id",
        "category_group_id",
        "category_group_sub_id",
        "nm_transaction",
        "dt_transaction",
        "vl_transaction",
        "pending"
      ],
      include: [
        {
          model: CategoryGroup,
          as: "category_group",
          attributes: ["nm_category_group"]
        },
        {
          model: CategoryGroupSub,
          as: "category_group_sub",
          attributes: ["nm_category_group_sub"]
        }
      ],
      where: {
        user_id: req.userId,
        dt_transaction: {
          [Sequelize.Op.between]: [
            format(startOfMonth(new Date()), "yyyyMMdd"),
            format(endOfMonth(new Date()), "yyyyMMdd")
          ]
        }
      },
      order: [["dt_transaction", "ASC"]]
    });

    return res.json({ result: resume, success: true });
  }

  async updateTransactionPending(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        success: false,
        error: "Erro no tipo de dados."
      });
    }

    const transaction = await Transaction.findByPk(req.body.id, {
      where: {
        user_id: req.userId
      }
    });

    if (!transaction)
      return res.status(400).json({
        success: false,
        error: "Transação não encontrada."
      });

    await transaction.update(
      { pending: false },
      {
        where: {
          id: req.body.id,
          user_id: req.userId
        }
      }
    );

    return res.json({ result: true, success: true });
  }

  async deleteTransaction(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        success: false,
        error: "Erro no tipo de dados."
      });
    }

    const transaction = await Transaction.findByPk(req.body.id, {
      where: {
        user_id: req.userId
      }
    });

    if (!transaction)
      return res.status(400).json({
        success: false,
        error: "Transação não encontrada."
      });

    await transaction.destroy({
      where: {
        id: req.body.id,
        user_id: req.userId
      }
    });

    return res.json({ result: true, success: true });
  }
}

export default new TransactionDetailController();
