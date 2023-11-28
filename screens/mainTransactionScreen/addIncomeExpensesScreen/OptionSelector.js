import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import DisplayOptions from "./DisplayOptions";

const OptionSelector = ({
  accountOrCategory,
  transactionType,
  selectOptions,
}) => {
  const navigation = useNavigation();

  const incomeCategory = useSelector((state) => state.incomeCategory);
  const account = useSelector((state) => state.account);
  const expensesCategory = useSelector((state) => state.expensesCategory);

  const handleNavigation = () => {
    if (accountOrCategory === "account") {
      if (account.length < 1) {
        navigation.navigate("EditOptionsForm", { optionType: "account" });
      } else {
        navigation.navigate("EditOptions", {
          option: "account",
        });
      }
    } else if (transactionType === "income") {
      if (incomeCategory.length < 1) {
        navigation.navigate("EditOptionsForm", { optionType: "income" });
      } else {
        navigation.navigate("EditOptions", {
          option: "income",
        });
      }
    } else {
      if (expensesCategory.length < 1) {
        navigation.navigate("EditOptionsForm", { optionType: "expenses" });
      } else {
        navigation.navigate("EditOptions", {
          option: "expenses",
        });
      }
    }
  };

  return (
    <View style={style.container}>
      <View style={style.optionHeader}>
        <Text style={style.headerText}>
          {accountOrCategory === "account"
            ? "Account"
            : transactionType === "income"
            ? "Income Categories"
            : "Expenses Categories"}
        </Text>

        <Pressable onPress={handleNavigation}>
          <MaterialIcons name="add" size={24} color="white" />
        </Pressable>
      </View>

      <View>
        {accountOrCategory === "account" ? (
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
});
