import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import { mainStyle } from "../../mainStyle";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Pill from "../components/Pill";

const AddIncomeExpensesScreen = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("expenses");
  const [date, setDate] = useState(new Date());
  const [account, setAccount] = useState("Cash");
  const [category, setCategory] = useState("Salary");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: type.toUpperCase(),
    });
  }, []);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const handleTransactionSave = () => {
    const transactionObject = {
      date,
      account,
      category,
      amount,
      note,
    };
    console.log(transactionObject);
    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={style.container}>
      <View style={mainStyle.flexRow}>
        <Pressable style={{ flex: 1 }}>
          <Pill text="Income" />
        </Pressable>

        <Pressable style={{ flex: 1 }}>
          <Pill text="Expenses" />
        </Pressable>
      </View>

      <View style={mainStyle.flexRow}>
        <Text style={mainStyle.inputText}>Date</Text>
        <View style={mainStyle.input}>
          <View style={mainStyle.flexRow}>
            <Pressable onPress={showDatepicker}>
              <Text style={mainStyle.font16}>{date.toLocaleDateString()}</Text>
            </Pressable>
            <Pressable onPress={showTimepicker}>
              <Text style={mainStyle.font16}>{date.toLocaleTimeString()}</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={mainStyle.flexRow}>
        <Text style={mainStyle.inputText}>Account</Text>
        <TextInput
          style={mainStyle.input}
          value={account}
          onChangeText={(text) => setAccount(text)}
        />
      </View>

      <View style={mainStyle.flexRow}>
        <Text style={mainStyle.inputText}>Category</Text>
        <TextInput
          style={mainStyle.input}
          value={category}
          onChangeText={(text) => setCategory(text)}
        />
      </View>

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
