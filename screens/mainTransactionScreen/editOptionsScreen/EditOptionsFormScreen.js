import { TextInput, View, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-native-uuid";

import {
  insertNewCategoryInDb,
  updateCategoryInDb,
} from "../../../util/database";

import {
  addAccount,
  updateAccount,
} from "../../../features/account/accountSlice";

import {
  addExpensesCategory,
  updateExpensesCategory,
} from "../../../features/expensesCategory/expensesCategorySlice";

import {
  addIncomeCategory,
  updateIncomeCategory,
} from "../../../features/incomeCategory/incomeCategorySlice";

import MyButton from "../../../components/MyButton";
import { allColors } from "../../../Colors";

const EditOptionsFormScreen = ({ route, navigation }) => {
  const { optionType } = route.params;

  const [text, setText] = useState("");
  const [edit, setEdit] = useState(!!route.params.option);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${edit ? "Update" : "Add new"} ${optionType} category`,
    });
  }, []);

  useEffect(() => {
    if (edit) {
      setText(route.params.option.value);
    }
  }, []);

  const handleOptionSave = async () => {
    if (!text) {
      Alert.alert("Category can't be empty!");
      return;
    }

    const categoryObject = {
      value: text,
      id: uuid.v4(),
    };

    const addNewAccount = async () => {
      await insertNewCategoryInDb("account", categoryObject);
      dispatch(addAccount(categoryObject));
    };

    const addNewExpensesCategory = async () => {
      await insertNewCategoryInDb("expensesCategory", categoryObject);
      dispatch(addExpensesCategory(categoryObject));
    };

    const addNewIncomeCategory = async () => {
      await insertNewCategoryInDb("incomeCategory", categoryObject);
      dispatch(addIncomeCategory(categoryObject));
    };

    try {
      if (optionType === "account") {
        addNewAccount();
      } else if (optionType === "income") {
        addNewIncomeCategory();
      } else if (optionType === "expenses") {
        addNewExpensesCategory();
      }
    } catch (error) {
      Alert.alert("Error adding new Account...");
    }

    navigation.pop();
  };

  const handleOptionUpdate = () => {
    if (!text) {
      Alert.alert("Category can't be empty!");
      return;
    }

    const categoryObject = {
      value: text,
      id: route.params.option.id,
    };

    const table =
      optionType === "account"
        ? "account"
        : optionType === "income"
        ? "incomeCategory"
        : "expensesCategory";

    const updateCategory = async () => {
      await updateCategoryInDb(categoryObject, table);

      if (optionType === "account") {
        dispatch(updateAccount(categoryObject));
      } else if (optionType === "income") {
        dispatch(updateIncomeCategory(categoryObject));
      } else if (optionType === "expenses") {
        dispatch(updateExpensesCategory(categoryObject));
      }
    };

    try {
      updateCategory();
    } catch (error) {
      Alert.alert("Error updating account!");
    }

    navigation.pop();
  };

  const placeholder = `Add new ${optionType} like "${
    optionType === "account"
      ? "Cash or Mobile Banking"
      : optionType === "expenses"
      ? "Rent"
      : "Salary"
  }"`;

  return (
    <View style={style.container}>
      <View style={[style.input]}>
        <TextInput
          placeholder={edit ? "Edit Options Here" : placeholder}
          style={style.inputText}
          value={text}
          onChangeText={(value) => setText(value)}
        />
      </View>

      <View style={style.saveButton}>
        <MyButton
          title={edit ? "Update" : "Save"}
          onPress={edit ? handleOptionUpdate : handleOptionSave}
        />
      </View>
    </View>
  );
};

export default EditOptionsFormScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderTopColor: allColors.lightGray,
    borderTopWidth: 1,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inputText: {
    fontSize: 16,
    paddingVertical: 8,
  },
  saveButton: {
    flexDirection: "row",
    marginVertical: 20,
  },
});
