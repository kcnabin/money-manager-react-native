import EachDayTransaction from "./EachDayTransaction";

const AllTransactions = ({ transactions }) => {
  const dayArray = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date).getDate();
    dayArray[date].push(transaction);
  });

  const dayArrayWithTransaction = dayArray.filter(
    (eachDay) => eachDay.length > 0
  );

  return (
    <>
      {dayArrayWithTransaction.map((eachDayTransactions, i) => (
        <EachDayTransaction key={i} transactions={eachDayTransactions} />
      ))}
    </>
  );
};

export default AllTransactions;
