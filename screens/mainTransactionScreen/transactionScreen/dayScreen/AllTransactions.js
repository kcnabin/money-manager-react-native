import { ScrollView, StyleSheet, View, Text } from "react-native";
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
    dayArray[date]?.push(transaction);
  });

  const dayArrayWithTransaction = dayArray
    .filter((eachDay) => eachDay.length > 0)
    .reverse();

  if (transactions.length === 0) {
    return (
      <View style={style.container}>
        <View style={[style.container, style.center]}>
          <View>
            <Text style={style.text}>No transactions found! </Text>
            <Text style={style.text}>Why don't you add some records? </Text>
          </View>
        </View>
      </View>
    );
  }

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
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
