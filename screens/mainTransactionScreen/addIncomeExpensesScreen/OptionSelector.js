import { View, Text, StyleSheet, Pressable } from "react-native";
import DisplayOptions from "./DisplayOptions";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OptionSelector = ({
  accountOrCategory,
  transactionType,
  selectOptions,
}) => {
  const incomeCategory = useSelector((state) => state.incomeCategory);
  const account = useSelector((state) => state.account);
  const expensesCategory = useSelector((state) => state.expensesCategory);

  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <View style={style.optionHeader}>
        <Text style={style.headerText}>
          {accountOrCategory === "account" ? "Account" : "Category"}
        </Text>

        <Pressable
          onPress={() =>
            navigation.navigate("EditOptions", {
              option:
                accountOrCategory === "account"
                  ? "account"
                  : transactionType === "income"
                  ? "income"
                  : "expenses",
            })
          }
        >
          <MaterialIcons name="edit" size={24} color="white" />
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
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "white",
    fontFamily: "main-bold",
    fontSize: 18,
  },
});
