import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { deleteCategoryFromDb } from "../../../util/database";
import { deleteAccount } from "../../../features/account/accountSlice";
import { deleteExpensesCategory } from "../../../features/expensesCategory/expensesCategorySlice";
import { deleteIncomeCategory } from "../../../features/incomeCategory/incomeCategorySlice";

import { MaterialIcons } from "@expo/vector-icons";
import { allColors } from "../../../Colors";

const EachOption = ({ option, optionType }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOptionDelete = () => {
    const deleteCategory = async () => {
      id = option.id;
      const table =
        optionType === "account"
          ? "account"
          : optionType === "income"
          ? "incomeCategory"
          : "expensesCategory";

      await deleteCategoryFromDb(table, id);

      if (optionType === "account") {
        dispatch(deleteAccount({ id }));
      } else if (optionType === "income") {
        dispatch(deleteIncomeCategory({ id }));
      } else if (optionType === "expenses") {
        dispatch(deleteExpensesCategory({ id }));
      }
    };

    Alert.alert(
      `Are you sure that you want to delete '${option.value}' ? `,
      "",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Delete",
          onPress: deleteCategory,
        },
      ]
    );
  };

  return (
    <View style={style.option}>
      <View style={style.iconText}>
        <Pressable onPress={handleOptionDelete}>
          <MaterialIcons
            name="delete-outline"
            size={28}
            color={allColors.tabActive}
          />
        </Pressable>
        <Text style={style.optionText}>{option.value}</Text>
      </View>

      <Pressable
        onPress={() =>
          navigation.navigate("EditOptionsForm", { optionType, option })
        }
      >
        <MaterialIcons name="edit" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default EachOption;

const style = StyleSheet.create({
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "main",
  },
});
