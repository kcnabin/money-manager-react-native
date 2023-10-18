import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("mmdata.db");

export const initializeExpensesTable = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      // account and category will be later added as foreign key
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS expenses (
          id TEXT PRIMARY KEY NOT NULL,
          amount INTEGER,
          date TEXT,
          note TEXT,
          type TEXT,
          account TEXT,
          category TEXT
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

export const initializeIncomeTable = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS income (
            id TEXT PRIMARY KEY NOT NULL,
            amount INTEGER,
            date TEXT,
            note TEXT,
            type TEXT,
            account TEXT,
            category TEXT
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

export const insertNewTransactionInDb = (transaction, table = "expenses") => {
  const { id, amount, date, note, type, account, category } = transaction;

  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const sql = `
        INSERT INTO ${table} 
        (id, amount, date, note, type, account, category)
        VALUES (?, ?, ?, ?, ?, ?, ?)
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

export const fetchAllExpenses = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM expenses`,
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

export const fetchAllIncome = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
          SELECT * FROM income
        `,
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

export const initializeAccountTable = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
          CREATE TABLE IF NOT EXISTS account (
            id TEXT PRIMARY KEY NOT NULL,
            value TEXT
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

export const insertNewAccountInDb = (accountObject) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      const { id, value } = accountObject;

      tx.executeSql(
        `
          INSERT INTO account VALUES (?, ?)
        `,
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

export const fetchAccountsFromDb = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM account`,
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

export const updateCategoryInDb = (categoryObject) => {
  const { id, value, table } = categoryObject;

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
