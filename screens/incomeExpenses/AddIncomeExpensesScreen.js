import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addIncome, updateIncome } from "../../features/income/incomeSlice";
import uuid from "react-native-uuid";

import {
  addExpenses,
  updateExpenses,
} from "../../features/expenses/expensesSlice";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  Alert,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import OptionSelector from "./OptionSelector";
import DateAndTimePicker from "./components/DateAndTimePicker";
import AccountPicker from "./components/AccountPicker";

import { mainStyle } from "../../mainStyle";
import { allColors } from "../../Colors";
import { insertNewExpenses, updateExpenseInDb } from "../../util/database";

const AddIncomeExpensesScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [accountOrCategory, setAccountOrCategory] = useState(null);
  const [transactionType, setTransactionType] = useState("expenses");

  const allAccount = useSelector((state) => state.account);
  const incomeCategory = useSelector((state) => state.incomeCategory);
  const expensesCategory = useSelector((state) => state.expensesCategory);

  useEffect(() => {
    if (route.params) {
      const { account, amount, category, date, note, type } =
        route.params.transaction;

      const savedAccount = allAccount.find(
        (eachAccount) => eachAccount.id === account
      );

      const savedCategory =
        incomeCategory.find(
          (eachIncomeCategory) => eachIncomeCategory.id === category
        ) ||
        expensesCategory.find(
          (eachExpensesCategory) => eachExpensesCategory.id === category
        );

      setTransactionType(type);
      setDate(new Date(date));
      setAccount(savedAccount);
      setCategory(savedCategory);
      setAmount(amount.toString());
      setNote(note);
    }
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({
      title: transactionType.toUpperCase(),
    });
  }, [transactionType]);

  const handleTransactionSave = async () => {
    if (!account) {
      return Alert.alert("Account must be selected!");
    }

    if (!category) {
      return Alert.alert("Category must be selected!");
    }

    if (!amount) {
      return Alert.alert("Kindly enter transaction amount!");
    }

    const transactionObject = {
      type: transactionType,
      account: account.id,
      category: category.id,
      date: date.toString(),
      amount,
      note,
      id: uuid.v4(),
    };

    if (transactionType === "income") {
      if (route.params) {
        dispatch(
          updateIncome({
            id: route.params.transaction.id,
            updatedObject: transactionObject,
          })
        );
      } else {
        dispatch(addIncome(transactionObject));
      }
    } else if (transactionType === "expenses") {
      if (route.params) {
        try {
          await updateExpenseInDb(transactionObject);
          dispatch(
            updateExpenses({
              id: route.params.transaction.id,
              updatedObject: transactionObject,
            })
          );
        } catch (error) {
          Alert.alert("Error updating");
          console.log("here is the error", error);
        }
      } else {
        await insertNewExpenses(transactionObject);
        dispatch(addExpenses(transactionObject));
      }
    }

    navigation.navigate("AllTransactions");
  };

  const resetForm = () => {
    setDate(new Date());
    setAccount("");
    setCategory("");
    setAccountOrCategory(null);
  };

  const setToIncome = () => {
    setTransactionType("income");
    resetForm();
  };

  const setToExpenses = () => {
    setTransactionType("expenses");
    resetForm();
  };

  const handleOptionSelection = (type) => {
    if (accountOrCategory) {
      setAccount(type);
    } else {
      setCategory(type);
    }
    setAccountOrCategory(null);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const getTransactionCategoryStyle = (type) => {
    let style;
    let defaultStyle = {
      borderWidth: 1,
      borderColor: "black",
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 12,
    };

    if (type == transactionType) {
      style = { ...defaultStyle, backgroundColor: allColors.pillBg };
    } else {
      style = defaultStyle;
    }
    return style;
  };

  const getTransactionTextStyle = (type) => {
    let style;
    const defaultStyle = {
      textAlign: "center",
      fontSize: 16,
      fontFamily: "main",
    };

    if (transactionType === type) {
      style = { ...defaultStyle, color: "white", fontFamily: "main-bold" };
    } else {
      style = defaultStyle;
    }

    return style;
  };

  return (
    <View style={[style.container]}>
      <View>
        <View style={mainStyle.flexRow}>
          <Pressable
            style={getTransactionCategoryStyle("income")}
            onPress={setToIncome}
          >
            <Text style={getTransactionTextStyle("income")}>Income</Text>
          </Pressable>

          <Pressable
            style={getTransactionCategoryStyle("expenses")}
            onPress={setToExpenses}
          >
            <Text style={getTransactionTextStyle("expenses")}>Expenses</Text>
          </Pressable>
        </View>

        <DateAndTimePicker date={date} setShow={setShow} setMode={setMode} />

        <AccountPicker
          pickAccount={() => setAccountOrCategory(true)}
          account={account}
        />

        <Pressable onPress={() => setAccountOrCategory(false)}>
          <View style={mainStyle.flexRow}>
            <Text style={mainStyle.inputText}>Category</Text>
            <View style={mainStyle.input}>
              <View style={mainStyle.flexRow}>
                <Text style={mainStyle.font16}>{category?.value}</Text>
              </View>
            </View>
          </View>
        </Pressable>

        <View style={mainStyle.flexRow}>
          <Text style={mainStyle.inputText}>Amount</Text>
          <TextInput
            style={mainStyle.input}
            value={amount}
            onChangeText={(value) => setAmount(value)}
            inputMode="numeric"
          />
        </View>

        <View style={mainStyle.flexRow}>
          <Text style={mainStyle.inputText}>Note</Text>
          <TextInput
            style={mainStyle.input}
            value={note}
            onChangeText={(text) => setNote(text)}
            inputMode="text"
          />
        </View>

        <View style={style.buttonsContainer}>
          <View style={style.buttonStyle}>
            <Button title="Save" onPress={handleTransactionSave} />
          </View>

          {route.params && (
            <View style={style.buttonStyle}>
              <Button title="Delete" color={allColors.expensesColor} />
            </View>
          )}
        </View>

        <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onDateChange}
            />
          )}
        </View>
      </View>

      {accountOrCategory !== null && (
        <OptionSelector
          accountOrCategory={accountOrCategory}
          transactionType={transactionType}
          selectOptions={handleOptionSelection}
        />
      )}
    </View>
  );
};

export default AddIncomeExpensesScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 16,
    gap: 12,
  },
  buttonStyle: {
    flex: 1,
  },
});
