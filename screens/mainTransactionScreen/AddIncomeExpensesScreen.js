import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import uuid from "react-native-uuid";

import {
  insertNewTransactionInDb,
  updateTransactionInDb,
  deleteTransactionFromDb,
} from "../../util/database";

import {
  addIncome,
  deleteIncome,
  updateIncome,
} from "../../features/income/incomeSlice";

import {
  addExpenses,
  deleteExpenses,
  updateExpenses,
} from "../../features/expenses/expensesSlice";

import { transactionConducted } from "../../features/transactionsCounter/transactionsCounterSlice";

import DateTimePicker from "@react-native-community/datetimepicker";
import OptionSelector from "./addIncomeExpensesScreen/OptionSelector";
import DateAndTimePicker from "./addIncomeExpensesScreen/DateAndTimePicker";
import AccountPicker from "./addIncomeExpensesScreen/AccountPicker";

import MyButton from "../../components/MyButton";
import { mainStyle } from "../../mainStyle";
import { allColors } from "../../Colors";
import { areMonthsEqual } from "../../helper/dateHelper";

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

  const [accountOrCategory, setAccountOrCategory] = useState("account");
  const [transactionType, setTransactionType] = useState("expenses");

  const allAccount = useSelector((state) => state.account);
  const incomeCategory = useSelector((state) => state.incomeCategory);
  const expensesCategory = useSelector((state) => state.expensesCategory);

  const selectedMonth = useSelector((state) => state.selectedMonth);
  const transactionMonth = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };

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

    if (!note) {
      return Alert.alert("Kindly enter note about transaction!");
    }

    const transactionObject = {
      type: transactionType,
      account: account.id,
      category: category.id,
      date: date.toISOString(),
      amount: Number(amount),
      note,
      id: route?.params?.transaction?.id || uuid.v4(),
    };

    if (route.params) {
      updateTransaction(transactionObject);
    } else {
      addNewTransaction(transactionObject);
    }

    dispatch(transactionConducted());

    navigation.navigate("AllTransactions");
  };

  const addNewTransaction = async (transactionObject) => {
    try {
      if (transactionType === "income") {
        await insertNewTransactionInDb(transactionObject, "income");
        if (areMonthsEqual(selectedMonth, transactionMonth)) {
          dispatch(addIncome(transactionObject));
        }
      } else if (transactionType === "expenses") {
        await insertNewTransactionInDb(transactionObject, "expenses");
        if (areMonthsEqual(selectedMonth, transactionMonth)) {
          dispatch(addExpenses(transactionObject));
        }
      }
    } catch (error) {
      Alert.alert("Error adding new transaction...");
      console.log(error);
    }
  };

  const updateTransaction = async (transactionObject) => {
    try {
      if (transactionType === "income") {
        await updateTransactionInDb(transactionObject, "income");
        if (!areMonthsEqual(selectedMonth, transactionMonth)) {
          dispatch(deleteIncome({ id: transactionObject.id }));
          dispatch(transactionConducted());
        }
      } else if (transactionType === "expenses") {
        await updateTransactionInDb(transactionObject, "expenses");
        if (!areMonthsEqual(selectedMonth, transactionMonth)) {
          dispatch(deleteExpenses({ id: transactionObject.id }));
          dispatch(transactionConducted());
        }
      }
    } catch (error) {
      Alert.alert("Error updating transaction...");
      console.log(error);
    }
  };

  const handleDelete = (id, note) => {
    Alert.alert("Want to Delete?", note, [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            if (transactionType === "expenses") {
              await deleteTransactionFromDb(id, "expenses");
              dispatch(deleteExpenses({ id }));
              dispatch(transactionConducted());
            } else {
              await deleteTransactionFromDb(id, "income");
              dispatch(deleteIncome({ id }));
              dispatch(transactionConducted());
            }

            navigation.goBack();
          } catch (error) {
            Alert.alert("Error Deleting!");
          }
        },
      },
    ]);
  };

  const resetForm = () => {
    setDate(new Date());
    setAccount("");
    setCategory("");
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
    if (accountOrCategory === "account") {
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
      paddingVertical: 12,
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
    };

    if (transactionType === type) {
      style = { ...defaultStyle, color: "white" };
    } else {
      style = defaultStyle;
    }

    return style;
  };

  return (
    <View style={[style.container]}>
      <View style={style.transactionSelector}>
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

        <AccountPicker
          pickAccount={() => setAccountOrCategory("account")}
          account={account}
        />

        <Pressable onPress={() => setAccountOrCategory("category")}>
          <View style={mainStyle.flexRow}>
            <Text style={mainStyle.inputText}>Category</Text>
            <View style={mainStyle.input}>
              {/* <View style={mainStyle.flexRow}> */}
              <Text style={mainStyle.font16}>{category?.value}</Text>
              {/* </View> */}
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
          <MyButton
            title={route.params ? "Update" : "Save"}
            onPress={handleTransactionSave}
          />

          {route.params && (
            // <View style={style.buttonStyle}>
            <MyButton
              title="Delete"
              variant="secondary"
              onPress={() => handleDelete(route.params.transaction.id, note)}
            />
            // </View>
          )}
        </View>
      </View>

      {accountOrCategory && (
        <View style={style.optionSelector}>
          <OptionSelector
            accountOrCategory={accountOrCategory}
            transactionType={transactionType}
            selectOptions={handleOptionSelection}
          />
        </View>
      )}
    </View>
  );
};

export default AddIncomeExpensesScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    borderTopColor: allColors.lightGray,
    borderTopWidth: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12,
  },
  buttonStyle: {
    flex: 1,
  },
});
