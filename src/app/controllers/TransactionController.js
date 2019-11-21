import * as Yup from "yup";

import Transaction from "../models/Transaction";

class TransactionController {
  async insertTransaction(req, res) {
    const schema = Yup.object().shape({
      category_group_id: Yup.number().required(),
      category_group_sub_id: Yup.number().required(),
      cd_transaction_type: Yup.string().required(),
      ds_transaction: Yup.string().nullable(),
      dt_transaction: Yup.number().required(),
      nm_transaction: Yup.string().required(),
      vl_transaction: Yup.number().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({
        success: false,
        errormessage: "Todos os campos são obrigatorios.",
        errocode: "FIELDS_REQUIRED"
      });

    let params = {
      user_id: req.userId,
      category_group_id: req.body.category_group_id,
      category_group_sub_id: req.body.category_group_sub_id,
      cd_transaction_type: req.body.cd_transaction_type,
      ds_transaction: req.body.ds_transaction,
      dt_transaction: req.body.dt_transaction,
      nm_transaction: req.body.nm_transaction,
      vl_transaction: req.body.vl_transaction
    };

    Transaction.create(params);
    return res.json({
      success: true,
      result: params
    });
  }

  async updateTransaction(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      category_group_id: Yup.number().required(),
      category_group_sub_id: Yup.number().required(),
      cd_transaction_type: Yup.string().required(),
      ds_transaction: Yup.string().nullable(),
      dt_transaction: Yup.number().required(),
      nm_transaction: Yup.string().required(),
      vl_transaction: Yup.number().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({
        success: false,
        errormessage: "Todos os campos são obrigatorios.",
        errocode: "FIELDS_REQUIRED"
      });

    const { id } = req.body;
    delete req.body.id;

    const transaction = await Transaction.findByPk(id, {
      where: {
        user_id: req.userId
      }
    });

    if (!transaction)
      return res.status(400).json({
        success: false,
        errormessage: "Operação não encontrada.",
        errocode: "TRANSACTION_NOT_FOUND"
      });

    await transaction.update(req.body, {
      where: {
        id,
        user_id: req.userId
      }
    });

    return res.json({
      success: true,
      result: {}
    });
  }
}

export default new TransactionController();
