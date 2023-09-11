export const getTotalFromTransactions = (transactions) => {
  return transactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );
};
