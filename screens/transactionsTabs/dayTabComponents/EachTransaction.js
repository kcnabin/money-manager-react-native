import { View, Text, StyleSheet } from "react-native";
import { mainStyle } from "../../../mainStyle";

const EachTransaction = ({ transaction }) => {
  return (
    <View style={style.transaction}>
      <View style={style.category}>
        <Text>{transaction?.category}...</Text>
        {/* <Text>{transaction?.category.substring(0, 10)}...</Text> */}
      </View>

      <View style={style.note}>
        <Text>{transaction?.note}</Text>
        <Text>{transaction?.account}</Text>
      </View>

      <View style={style.amount}>
        <Text
          style={[
            style.amountText,
            transaction.type === "income"
              ? mainStyle.incomeColor
              : mainStyle.expensesColor,
          ]}
        >
          {Number(transaction?.amount).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default EachTransaction;

const style = StyleSheet.create({
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
    marginVertical: 8,
  },
  category: {
    flex: 1,
  },
  note: {
    flex: 2,
  },
  amount: {
    flex: 1,
  },
  amountText: {
    textAlign: "right",
  },
});
