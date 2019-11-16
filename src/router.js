import { Router } from "express";

import authMiddlewares from "../src/app/middlewares/auth";

import SessionController from "./app/controllers/SessionController";
import UserController from "./app/controllers/UserController";
import CategoryController from "./app/controllers/CategoryController";
import AdmController from "./app/controllers/AdmController";
import TransactionController from "./app/controllers/TransactionController";
import ResumeTransactionController from "./app/controllers/ResumeTransactionController";
import TransactionDetailController from "./app/controllers/TransactionDetailController";

const routes = new Router();

routes.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

//Sessao
routes.post("/session/checkSession", SessionController.checkSession);
routes.post("/session/auth", SessionController.authenticate);

//Usuario
routes.post("/user/create", UserController.create);

routes.use(authMiddlewares);

//categorias
routes.post("/category/listAllCategory", CategoryController.list);
routes.post(
  "/category/searchSubCategory",
  CategoryController.searchSubCategory
);

//transacao
routes.post(
  "/transaction/insertTransaction",
  TransactionController.insertTransaction
);

//ADM
routes.get("/adm/insertDmCategory", AdmController.insertDmCategory);
routes.get("/adm/insertDmCategorySub", AdmController.insertDmCategorySub);
routes.get(
  "/adm/insertDmTransactionType",
  AdmController.insertDmTransactionType
);

//ResumeTransactions
routes.post(
  "/resume/transaction/getResumeTransaction",
  ResumeTransactionController.getResumeTransaction
);

routes.post(
  "/resume/transaction/getResumeTransactionSubCategory",
  ResumeTransactionController.getResumeTransactionSubCategory
);

routes.post(
  "/resume/transaction/getResumeTransactionGrid",
  ResumeTransactionController.getResumeTransactionGrid
);

routes.post(
  "/resume/transaction/getResumeTransactionGridSubCategoria",
  ResumeTransactionController.getResumeTransactionGridSubCategoria
);

routes.post(
  "/resume/transaction/getDetailDashboard",
  ResumeTransactionController.getDetailDashboard
);

//TransactionDetail
routes.post(
  "/resume/transactionDetail/getDetailCard",
  TransactionDetailController.getDetailCard
);

routes.post(
  "/resume/transactionDetail/getDetailCardChart",
  TransactionDetailController.getDetailCardChart
);

routes.post(
  "/resume/transactionDetail/getTransactionDetailGrid",
  TransactionDetailController.getTransactionDetailGrid
);

export default routes;
