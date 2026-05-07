import express from "express";
import {
  transferFunds,
  createCustomer,
  openAccount,
  getCustomerAccount,
  getTransactions,
} from "../controllers/bankController.js";

const bankRouter = express.Router();

bankRouter.post("/transfer", transferFunds);
bankRouter.post("/create-customer", createCustomer);
bankRouter.post("/open-account", openAccount);
bankRouter.get("/get-customer-account/:customer_id", getCustomerAccount);
bankRouter.get("/transactions/:account_number", getTransactions);

export { bankRouter };
