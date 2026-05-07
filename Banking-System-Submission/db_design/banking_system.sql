USE banking_system;

-- 1. TABLE CREATION

CREATE TABLE customers (
    customer_id  INT AUTO_INCREMENT PRIMARY KEY,
    first_name   VARCHAR(50)  NOT NULL,
    last_name    VARCHAR(50),
    dob          DATE,
    phone        VARCHAR(15),
    address      VARCHAR(255),
    UNIQUE KEY unique_customer (first_name, last_name, phone)  -- UNIQUE constraint
);

CREATE TABLE branches (
    branch_id    INT AUTO_INCREMENT PRIMARY KEY,
    branch_name  VARCHAR(100),
    city         VARCHAR(50)
);

CREATE TABLE accounts (
    account_number INT AUTO_INCREMENT PRIMARY KEY,
    customer_id    INT NOT NULL,
    branch_id      INT NOT NULL,
    account_type   ENUM('Savings', 'Current'),
    balance        DECIMAL(12,2) DEFAULT 0.00,
    status         ENUM('Active', 'Closed') DEFAULT 'Active',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (branch_id)   REFERENCES branches(branch_id),
    CONSTRAINT chk_balance CHECK (balance >= 0)               -- CHECK constraint
);

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    account_number INT,
    txn_type       ENUM('Credit', 'Debit'),
    amount         DECIMAL(12,2),
    txn_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_number) REFERENCES accounts(account_number)
);

CREATE TABLE loans (
    loan_id       INT AUTO_INCREMENT PRIMARY KEY,
    customer_id   INT,
    loan_amount   DECIMAL(12,2),
    interest_rate DECIMAL(5,2),
    start_date    DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    role        VARCHAR(50),
    salary      DECIMAL(10,2),
    branch_id   INT,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

-- 2. DATA INPUT

INSERT INTO customers (first_name, last_name, dob, phone, address) VALUES
    ('Shubham',     'Rout',    '2006-02-16', '9525153269',  'Patiala'),
    ('Shubhkarman', 'Singh',   '2005-04-07', '95423132332', 'Patiala'),
    ('Prabhjot',    'Singh',   '2005-04-07', '9525153270',  'Thapar, Patiala'),
    ('Manik',       'Agrwaal', '2007-01-09', '95343234',    'Patiala');

INSERT INTO branches (branch_name, city) VALUES
    ('SBI Chhoti Baradari (Main Branch)', 'Patiala');

INSERT INTO accounts (customer_id, branch_id, account_type, balance) VALUES
    (1, 1, 'Savings',  5000.00),
    (1, 1, 'Savings',  3000.00),
    (1, 1, 'Savings',  2000.00),
    (1, 1, 'Savings',  5000.00),
    (1, 1, 'Savings', 10000.00),
    (3, 1, 'Savings', 10000.00);

INSERT INTO employees (name, role, salary, branch_id) VALUES
    ('Prabhjot', 'Manager', 50000.00, 1);

INSERT INTO loans (customer_id, loan_amount, interest_rate, start_date) VALUES
    (1, 50000.00, 7.50, CURDATE());


-- 3. TRIGGERS

DELIMITER //

-- Trigger 1: Auto-update balance after every transaction
CREATE TRIGGER after_transaction_insert
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN
    IF NEW.txn_type = 'Credit' THEN
        UPDATE accounts SET balance = balance + NEW.amount
        WHERE account_number = NEW.account_number;
    ELSE
        UPDATE accounts SET balance = balance - NEW.amount
        WHERE account_number = NEW.account_number;
    END IF;
END;
//

-- Trigger 2: Block overdraft before insert (BEFORE trigger)
CREATE TRIGGER prevent_overdraft
BEFORE INSERT ON transactions
FOR EACH ROW
BEGIN
    DECLARE current_balance DECIMAL(12,2);
    SELECT balance INTO current_balance
    FROM accounts
    WHERE account_number = NEW.account_number;
    IF NEW.txn_type = 'Debit' AND NEW.amount > current_balance THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient Balance';
    END IF;
END;
//

DELIMITER ;


-- 4. STORED PROCEDURES

DELIMITER //

-- Procedure 1: Safe fund transfer (ACID-compliant)
CREATE PROCEDURE transfer_funds_safe(
    IN from_acc INT,
    IN to_acc   INT,
    IN amount   DECIMAL(12,2)
)
BEGIN
    DECLARE sender_balance DECIMAL(12,2);
    START TRANSACTION;

    IF NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = from_acc) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Sender account does not exist';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = to_acc) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Receiver account does not exist';
    END IF;

    SELECT balance INTO sender_balance
    FROM accounts WHERE account_number = from_acc;

    IF sender_balance < amount THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Insufficient Balance';
    END IF;

    INSERT INTO transactions (account_number, txn_type, amount)
        VALUES (from_acc, 'Debit',  amount);
    INSERT INTO transactions (account_number, txn_type, amount)
        VALUES (to_acc,   'Credit', amount);

    COMMIT;
END;
//

-- Procedure 2: Open a new account
CREATE PROCEDURE open_account(
    IN cust_id         INT,
    IN br_id           INT,
    IN acc_type        VARCHAR(20),
    IN initial_balance DECIMAL(12,2)
)
BEGIN
    INSERT INTO accounts (customer_id, branch_id, account_type, balance)
    VALUES (cust_id, br_id, acc_type, initial_balance);
END;
//

DELIMITER ;


-- 5. FUNCTION


DELIMITER //

CREATE FUNCTION get_total_balance(cust_id INT)
RETURNS DECIMAL(12,2)
DETERMINISTIC
BEGIN
    DECLARE total DECIMAL(12,2);
    SELECT SUM(balance) INTO total
    FROM accounts WHERE customer_id = cust_id;
    RETURN total;
END;
//

DELIMITER ;


-- 6. VIEW

CREATE VIEW high_value_customers AS
    SELECT c.first_name, c.last_name, a.balance
    FROM customers c
    JOIN accounts a ON c.customer_id = a.customer_id
    WHERE a.balance > 5000;


-- 7. DEMO QUERIES

-- Constraint demo: UNIQUE violation
-- INSERT INTO customers (first_name, last_name, dob, phone, address)
-- VALUES ('Shubham', 'Rout', '2006-02-16', '9525153269', 'Patiala');
-- → ERROR 1062: Duplicate entry 'Shubham-Rout-9525153269'

-- Constraint demo: CHECK violation
-- UPDATE accounts SET balance = -500 WHERE account_number = 1;
-- → ERROR 3819: Check constraint 'chk_balance' is violated.

-- Trigger + overdraft demo
INSERT INTO transactions (account_number, txn_type, amount) VALUES (1, 'Debit', 1000);
-- → balance auto-decrements via trigger

-- INSERT INTO transactions (account_number, txn_type, amount) VALUES (1, 'Debit', 99999);
-- → ERROR 1644: Insufficient Balance (prevent_overdraft trigger fires)

-- ACID: transfer ₹500 from account 1 → account 2
CALL transfer_funds_safe(1, 2, 500);

-- ACID: ROLLBACK demo (transaction is discarded, no balance change)
START TRANSACTION;
    INSERT INTO transactions (account_number, txn_type, amount) VALUES (1, 'Debit', 1000);
ROLLBACK;

-- Stored function
SELECT get_total_balance(1) AS total_balance_customer_1;

-- Open new account via procedure
CALL open_account(1, 1, 'Savings', 2000);

-- JOINs
SELECT c.first_name, c.last_name, a.account_number, a.balance
FROM customers c
JOIN accounts a ON c.customer_id = a.customer_id;

SELECT c.first_name, a.balance
FROM customers c
JOIN accounts a ON c.customer_id = a.customer_id
ORDER BY a.balance DESC;

-- Aggregates
SELECT SUM(balance)  AS total_bank_balance FROM accounts;
SELECT COUNT(*)      AS total_customers    FROM customers;
SELECT COUNT(*)      AS total_transactions FROM transactions;

SELECT account_number, COUNT(*) AS total_transactions
FROM transactions GROUP BY account_number;

SELECT customer_id, SUM(loan_amount) AS total_loan
FROM loans GROUP BY customer_id;

-- Subquery: customers with balance > 3000
SELECT * FROM customers
WHERE customer_id IN (
    SELECT customer_id FROM accounts WHERE balance > 3000
);

-- View
SELECT * FROM high_value_customers;

-- Final state
SELECT * FROM customers;
SELECT * FROM accounts;
SELECT * FROM branches;
SELECT * FROM transactions;
SELECT * FROM loans;
SELECT * FROM employees;
