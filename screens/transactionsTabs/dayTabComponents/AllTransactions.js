import { ScrollView, StyleSheet } from "react-native";
import EachDayTransaction from "./EachDayTransaction";
import { allColors } from "../../../Colors";

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

  const dayArrayWithTransaction = dayArray
    .filter((eachDay) => eachDay.length > 0)
    .reverse();

  return (
    <ScrollView style={style.container}>
      {dayArrayWithTransaction.map((eachDayTransactions, i) => (
        <EachDayTransaction key={i} transactions={eachDayTransactions} />
      ))}
    </ScrollView>
  );
};

export default AllTransactions;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: allColors.lightGray,
  },
});
