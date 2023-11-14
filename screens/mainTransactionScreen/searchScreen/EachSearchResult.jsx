import { Text, StyleSheet, Pressable, View } from "react-native"
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { allColors } from "../../../Colors";

import { mainStyle } from "../../../mainStyle";

const EachSearchResult = ({ search }) => {
  const incomeCategory = useSelector((state) => state.incomeCategory);
  const expensesCategory = useSelector((state) => state.expensesCategory);

  const transactionCategory =
    incomeCategory.find((category) => category.id === search.category) ||
    expensesCategory.find((category) => category.id === search.category);

  const transactionAccount = useSelector((state) =>
    state.account.find((eachAccount) => eachAccount.id === search.account)
  );

  const navigation = useNavigation();

  return (
    <Pressable style={style.container} android_ripple={{ color: allColors.lightGray }}
      onPress={() => navigation.navigate("AddIncomeExpenses", { transaction: search })}>
      <View style={style.dateAndTypeContainer}>
        <Text>
          {(new Date(search.date)).toDateString()}
        </Text>

        <Text>
          {(search.type).toUpperCase()}
        </Text>
      </View>

      <View
        style={style.transaction}

      >
        <View style={style.category}>
          <Text>{transactionCategory?.value}</Text>
        </View>

        <View style={style.note}>
          <Text style={style.noteText}>{search?.note}</Text>
          <Text>{transactionAccount?.value}</Text>
        </View>

        <View style={style.amount}>
          <Text
            style={[
              style.amountText,
              search.type === "income"
                ? mainStyle.incomeColor
                : mainStyle.expensesColor,
            ]}
          >
            {Number(search?.amount).toLocaleString()}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    paddingTop: 6
  },
  transaction: {
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: 'black',
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
    fontSize: 16
  },
  dateAndTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  }

});

export default EachSearchResult