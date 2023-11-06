import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("mmdata.db");

// table initialization
export const initializeAccountTable = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
          CREATE TABLE IF NOT EXISTS account (
            id TEXT PRIMARY KEY,
            value TEXT NOT NULL
          )
        `,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const initializeExpensesCategoryTable = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expensesCategory (
          id TEXT PRIMARY KEY,
          value TEXT NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const initializeIncomeCategoryTable = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS incomeCategory (
          id TEXT PRIMARY KEY,
          value TEXT NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const initializeIncomeTable = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS income (
            id TEXT PRIMARY KEY,
            amount INTEGER,
            date TEXT,
            note TEXT,
            type TEXT,
            account TEXT,
            category TEXT,
            FOREIGN KEY (account) REFERENCES account (id) ON DELETE SET NULL,
            FOREIGN KEY (category) REFERENCES incomeCategory (id) ON DELETE SET NULL
        )
      `,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const initializeExpensesTable = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS expenses (
          id TEXT PRIMARY KEY,
          amount INTEGER,
          date TEXT,
          note TEXT,
          type TEXT,
          account TEXT,
          category TEXT,
          FOREIGN KEY (category) REFERENCES expensesCategory (id) ON DELETE SET NULL,
          FOREIGN KEY (account) REFERENCES account (id) ON DELETE SET NULL
        )
      `,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

// fetching data
export const fetchAllFromDb = (table) => {
  let sql = ``;

  if (table === "account") {
    sql = `SELECT * FROM account`;
  } else if (table === "expensesCategory") {
    sql = `SELECT * FROM expensesCategory`;
  } else if (table === "incomeCategory") {
    sql = `SELECT * FROM incomeCategory`;
  } else if (table === "income") {
    sql = `SELECT * FROM income`;
  } else if (table === "expenses") {
    sql = `SELECT * FROM expenses`;
  }

  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        sql,
        [],
        (_, result) => {
          const data = result.rows._array;
          resolve(data);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const getAllMonthlyTransactionsFromDb = (table, dateObject) => {
  let sql = ``;

  if (table === "income" || table === "expenses") {
    const { year, month } = dateObject;

    if (!year || !month) {
      return;
    }

    let condition = `${year}-${month}-%`;
    if (month < 10) {
      condition = `${year}-0${month}-%`;
    }

    sql = `SELECT * from ${table} WHERE date LIKE '${condition}'`;
  }

  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        sql,
        [],
        (_, result) => {
          const data = result.rows._array;
          resolve(data);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const getMonthlyTotalFromDb = (table, dateObject) => {
  let sql = ``;

  if (table === "income" || table === "expenses") {
    const { year, month } = dateObject;

    if (!year || !month) {
      return;
    }

    let condition = `${year}-${month}-%`;
    if (month < 10) {
      condition = `${year}-0${month}-%`;
    }

    sql = `SELECT SUM(amount) from ${table} WHERE date LIKE '${condition}'`;
  }

  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        sql,
        [],
        (_, result) => {
          const data = result.rows._array[0]["SUM(amount)"];
          if (!data) {
            resolve(0);
          } else {
            resolve(data);
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

// category (account / income Category / expenses category) operations
export const insertNewCategoryInDb = (categoryType, categoryObject) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const { id, value } = categoryObject;

      let sql = ``;

      if (
        categoryType === "account" ||
        categoryType === "incomeCategory" ||
        categoryType === "expensesCategory"
      ) {
        sql = `INSERT INTO ${categoryType} VALUES (?, ?)`;
      }

      tx.executeSql(
        sql,
        [id, value],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const updateCategoryInDb = (categoryObject, table) => {
  const { id, value } = categoryObject;

  const promise = new Promise((resolve, reject) => {
    const sql = `UPDATE ${table} SET value = ? WHERE id = ?`;

    database.transaction((tx) => {
      tx.executeSql(
        sql,
        [value, id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const deleteCategoryFromDb = (table, id) => {
  const promise = new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    database.transaction((tx) => {
      tx.executeSql(
        sql,
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertNewTransactionInDb = (transaction, table = "expenses") => {
  const { id, amount, date, note, type, account, category } = transaction;

  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const sql = `
        INSERT INTO ${table} 
        (id, amount, date, note, type, account, category)
        VALUES (?, ?, datetime(?), ?, ?, ?, ?)
      `;

      tx.executeSql(
        sql,
        [id, amount, date, note, type, account, category],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const updateTransactionInDb = (transaction, table = "expenses") => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const sql = `UPDATE ${table} 
        SET amount=?, date=?, note=?, type=?, account=?, category=?
        WHERE id=?
      `;

      tx.executeSql(
        sql,
        [
          transaction.amount,
          transaction.date,
          transaction.note,
          transaction.type,
          transaction.account,
          transaction.category,
          transaction.id,
        ],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const deleteTransactionFromDb = (id, table = "expenses") => {
  const promise = new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${table} WHERE id = ?`;

    database.transaction((tx) => {
      tx.executeSql(
        sql,
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const deleteAllExpenses = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE expenses`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

// getting category total for selected month
export const getCategoryTotalFromDb = (table, dateObject, categoryId) => {
  const promise = new Promise((resolve, reject) => {
    const { month, year } = dateObject;
    let condition1 = `${year}-${month}-%`;
    if (month < 10) {
      condition1 = `${year}-0${month}-%`;
    }

    const sql = `SELECT SUM(amount) FROM ${table} WHERE date LIKE '${condition1}' AND category = '${categoryId}'`;

    database.transaction((tx) => {
      tx.executeSql(
        sql,
        [],
        (_, result) => {
          const data = result.rows._array[0]["SUM(amount)"] || 0;
          resolve(data);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};
