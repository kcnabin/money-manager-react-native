import { TextInput, View, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { editAccount } from "../features/account/accountSlice";
import { editExpensesCategory } from "../features/expensesCategory/expensesCategorySlice";
import { editIncomeCategory } from "../features/incomeCategory/incomeCategorySlice";

const EditOptionsFormScreen = ({ route, navigation }) => {
  const { optionType, option } = route.params;
  const [text, setText] = useState(option.value);

  const dispatch = useDispatch();
  const handleOptionSave = () => {
    const newOption = {
      id: option.id,
      newValue: text,
    };

    if (optionType === "account") {
      dispatch(editAccount(newOption));
    } else if (optionType === "expenses") {
      dispatch(editExpensesCategory(newOption));
    } else if (optionType === "income") {
      dispatch(editIncomeCategory(newOption));
    }
    navigation.pop();
  };

  return (
    <View style={style.container}>
      <View style={[style.input]}>
        <TextInput
          placeholder="Edit Options Here"
          style={style.inputText}
          value={text}
          onChangeText={(value) => setText(value)}
        />
      </View>

      <View style={style.saveButton}>
        <Button title="Save" onPress={handleOptionSave} />
      </View>
    </View>
  );
};

export default EditOptionsFormScreen;

const style = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
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
    fontFamily: "main",
  },
  saveButton: {
    marginVertical: 20,
  },
});
