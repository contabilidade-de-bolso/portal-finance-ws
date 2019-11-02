import TransactionType from "../models/TransactionType";

class TransactionType {
  async list(req, res) {
    const transactionType = await TransactionType.findAll();
    return res.json(transactionType);
  }
}

export default new TransactionType();
