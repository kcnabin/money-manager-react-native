import { View, Text, StyleSheet } from "react-native";
import DisplayOptions from "./components/DisplayOptions";
import { useSelector } from "react-redux";

const OptionSelector = ({
  accountOrCategory,
  transactionType,
  selectOptions,
}) => {
  const incomeCategory = useSelector((state) => state.incomeCategory);
  const account = useSelector((state) => state.account);
  const expensesCategory = useSelector((state) => state.expensesCategory);

  return (
    <View style={style.container}>
      <View style={style.optionHeader}>
        <Text style={style.headerText}>
          {accountOrCategory ? "Account" : "Category"}
        </Text>
      </View>

      <View>
        {accountOrCategory ? (
          <DisplayOptions data={account} selectOptions={selectOptions} />
        ) : transactionType === "expenses" ? (
          <DisplayOptions
            data={expensesCategory}
            selectOptions={selectOptions}
          />
        ) : (
          <DisplayOptions data={incomeCategory} selectOptions={selectOptions} />
        )}
      </View>
    </View>
  );
};

export default OptionSelector;

const style = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  optionHeader: {
    backgroundColor: "black",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerText: {
    color: "white",
    fontFamily: "main-bold",
    fontSize: 18,
  },
});
