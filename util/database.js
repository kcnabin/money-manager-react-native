import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("mmdata.db");

export const init = () => {
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

export const insertNewExpenses = (expenses) => {
  const { id, amount, date, note, type, account, category } = expenses;
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO expenses 
        (id, amount, date, note, type, account, category)
        VALUES (?,?,?,?,?,?,?)
      `,
        [id, amount, date, note, type, account, category],
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

export const fetchAllExpenses = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM expenses`,
        [],
        (_, result) => {
          console.log("result :", result);
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

export const updateExpenseInDb = (expenseObject) => {
  const { id, amount, date, note, type, account, category } = expenseObject;

  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `UPDATE expenses SET amount = ?, date = ?, note = ?, type = ?, account = ?, category = ?`,
        [amount, date, note, type, account, category],
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

// export const deleteAllExpenses = () => {
//   const promise = new Promise((resolve, reject) => {
//     database.transaction((tx) => {
//       tx.executeSql(
//         `DROP TABLE expenses`,
//         [],
//         (_, result) => {
//           resolve(result);
//         },
//         (_, error) => {
//           reject(error);
//         }
//       );
//     });
//   });

//   return promise;
// };
