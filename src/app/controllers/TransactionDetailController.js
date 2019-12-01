import Sequelize from "sequelize";
import * as Yup from "yup";
import Transaction from "../models/Transaction";
import TransactionType from "../models/TransactionType";
import CategoryGroup from "../models/CategoryGroup";
import CategoryGroupSub from "../models/CategoryGroupSub";
import { startOfMonth, format, endOfMonth } from "date-fns";

class TransactionDetailController {
  async getDetailCard(req, res) {
    var { currentDate } = req.body;

    const listResult = [
      {
        name: "TO_RECEIVE",
        pending: true,
        cd_transaction_type: "ENT",
        column: "vl_transaction",
        index: 1
      },
      {
        name: "RECEIVED",
        pending: false,
        cd_transaction_type: "ENT",
        column: "vl_transaction",
        index: 3
      },
      {
        name: "PAYABLE",
        pending: true,
        cd_transaction_type: "SAI",
        column: "vl_transaction",
        index: 2
      },
      {
        name: "PAID",
        pending: false,
        cd_transaction_type: "SAI",
        column: "vl_transaction",
        index: 4
      }
    ];

    var result = [];
    var promises = listResult.map(async item => {
      const [array] = await Transaction.findAll({
        attributes: [
          [Sequelize.fn("sum", Sequelize.col(item.column)), item.column]
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
          },

          pending: item.pending,
          cd_transaction_type: item.cd_transaction_type
        }
      });

      result.push({
        name: item.name,
        vl_transaction: parseFloat(array[item.column]) | 0,
        cd_transaction_type: "AMB",
        index: item.index
      });
    });

    await Promise.all(promises);
    return res.json({ result, success: true });
  }

  async getDetailCardChart(req, res) {
    var { currentDate } = req.body;
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
    var { currentDate } = req.body;
    var resume = await Transaction.findAll({
      attributes: [
        "id",
        "category_group_id",
        "category_group_sub_id",
        "nm_transaction",
        "dt_transaction",
        "vl_transaction",
        "ds_transaction",
        "pending",
        "cd_transaction_type"
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
          attributes: [
            "id",
            "category_group_id",
            "cd_category_group_sub",
            "nm_category_group_sub"
          ]
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
      order: [["vl_transaction", "DESC"]]
    });

    resume = resume
      .map(item => {
        if (item.cd_transaction_type == "SAI")
          item.vl_transaction = -1 * item.vl_transaction;

        item.nm_category_group = item.category_group.nm_category_group;
        return item;
      })
      .sort((a, b) => b.vl_transaction - a.vl_transaction);

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
