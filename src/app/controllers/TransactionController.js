import * as Yup from "yup";

import transaction from "../models/Transaction";

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

    transaction.create(params);
    return res.json({
      success: true,
      result: params
    });
  }
}

export default new TransactionController();
