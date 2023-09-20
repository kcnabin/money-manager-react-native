import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { mainStyle } from "../../../mainStyle";
import { allColors } from "../../../Colors";

const EachTransaction = ({ transaction }) => {
  const incomeCategory = useSelector((state) => state.incomeCategory);
  const expensesCategory = useSelector((state) => state.expensesCategory);

  const transactionCategory =
    incomeCategory.find((category) => category.id === transaction.category) ||
    expensesCategory.find((category) => category.id === transaction.category);

  const transactionAccount = useSelector((state) =>
    state.account.find((eachAccount) => eachAccount.id === transaction.account)
  );

  const navigation = useNavigation();

  return (
    <Pressable
      style={style.transaction}
      android_ripple={{ color: allColors.lightGray }}
      onPress={() => navigation.navigate("AddIncomeExpenses", { transaction })}
    >
      <View style={style.category}>
        <Text>{transactionCategory.value}</Text>
        {/* <Text>{transaction?.category.substring(0, 10)}...</Text> */}
      </View>

      <View style={style.note}>
        <Text style={style.noteText}>{transaction?.note}</Text>
        <Text>{transactionAccount.value}</Text>
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
    </Pressable>
  );
};

export default EachTransaction;

const style = StyleSheet.create({
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 8,
  },
  category: {
    flex: 1,
  },
  note: {
    flex: 2,
  },
  noteText: {
    fontSize: 16,
  },
  amount: {
    flex: 1,
  },
  amountText: {
    textAlign: "right",
  },
});
