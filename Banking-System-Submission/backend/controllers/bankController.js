import pool from "../config/db.js";

const transferFunds = async (req, res) => {
  try {
    const { from_acc, to_acc, amount } = req.body;

    const [result] = await pool.query("CALL transfer_funds_safe(?, ?, ?)", [
      from_acc,
      to_acc,
      amount,
    ]);

    res.status(200).json({
      message: "Transfer successful",
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { first_name, last_name, dob, phone, address } = req.body;
    const [result] = await pool.query(
      `INSERT INTO customers (first_name, last_name, dob, phone, address) VALUES (?, ?, ?, ?, ?)`,
      [first_name, last_name, dob, phone, address]
    );

    res.status(200).json({
      message: "Customer created",
      customer_id: result.insertId,
    });
  } catch (error) {
    // error for duplicate customer
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        message: "Customer Already Exists",
      });
    }
    res.status(400).json({
      message: error.message,
    });
  }
};

const openAccount = async (req, res) => {
  try {
    const { customer_id, branch_id, account_type, balance } = req.body;
    const [result] = await pool.query(
      `INSERT INTO accounts (customer_id, branch_id, account_type, balance) VALUES (?, ?, ?, ?)`,
      [customer_id, branch_id, account_type, balance]
    );

    res.status(200).json({
      message: "Account created",
      account_number: result.insertId,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getCustomerAccount = async (req, res) => {
  try {
    const { customer_id } = req.params;

    const [rows] = await pool.query(
      `SELECT * FROM accounts WHERE customer_id = ?`,
      [customer_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { account_number } = req.params;
    const [rows] = await pool.query(
      `SELECT * FROM transactions WHERE account_number = ?`,
      [account_number]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export {
  transferFunds,
  createCustomer,
  openAccount,
  getCustomerAccount,
  getTransactions,
};
