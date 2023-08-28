import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  Alert,
} from "react-native";
import { mainStyle } from "../../mainStyle";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Pill from "../components/Pill";
import { ScrollView } from "react-native-gesture-handler";
import OptionSelector from "./OptionSelector";
import DateAndTimePicker from "./components/DateAndTimePicker";
import AccountPicker from "./components/AccountPicker";

const AddIncomeExpensesScreen = () => {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [accountOrCategory, setAccountOrCategory] = useState(null);
  const [transactionType, setTransactionType] = useState("expenses");

  const data = {
    account,
    category,
    accountOrCategory,
    transactionType,
  };

  useEffect(() => {
    navigation.setOptions({
      title: transactionType.toUpperCase(),
    });
  }, [transactionType]);

  const handleTransactionSave = () => {
    const transactionObject = {
      date,
      account,
      category,
      amount,
      note,
    };
    console.log(transactionObject);
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

  return (
    <View style={style.container}>
      <ScrollView>
        <View style={mainStyle.flexRow}>
          <Pressable style={{ flex: 1 }} onPress={setToIncome}>
            <Pill text="Income" />
          </Pressable>

          <Pressable style={{ flex: 1 }} onPress={setToExpenses}>
            <Pill text="Expenses" />
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
                <Text style={mainStyle.font16}>{category}</Text>
              </View>
            </View>
          </View>
        </Pressable>

        {/* <View style={mainStyle.flexRow}>
          <Text style={mainStyle.inputText}>Category</Text>
          <TextInput
            style={mainStyle.input}
            value={category}
            onChangeText={(text) => setCategory(text)}
          />
        </View> */}

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

        <View>
          <Button title="Save" onPress={handleTransactionSave} />
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
      </ScrollView>

      <View>
        <Text>{JSON.stringify(data)}</Text>
      </View>

      {accountOrCategory !== null && (
        <View>
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
  },
});
