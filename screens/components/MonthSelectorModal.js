import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { useState } from "react";

import Constants from "expo-constants";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedMonth } from "../../features/selectedMonth/selectedMonthSlice";

import DisplayMonths from "./DisplayMonths";

import Icon from "../../components/Icon";
import MyButton from "../../components/MyButton";

const sBarHeight = Platform.OS === "ios" ? Constants.statusBarHeight : 0;

const MonthSelectorModal = ({ modalVisible, closeModal }) => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.selectedMonth);

  const [year, setYear] = useState(selectedMonth.year);
  const [month, setMonth] = useState(selectedMonth.month);

  const firstQuarterMonths = [
    { name: "Jan", value: 1 },
    { name: "Feb", value: 2 },
    { name: "Mar", value: 3 },
    { name: "Apr", value: 4 },
  ];

  const secondQuarterMonths = [
    { name: "May", value: 5 },
    { name: "Jun", value: 6 },
    { name: "Jul", value: 7 },
    { name: "Aug", value: 8 },
  ];

  const thirdQuarterMonths = [
    { name: "Sep", value: 9 },
    { name: "Oct", value: 10 },
    { name: "Nov", value: 11 },
    { name: "Dec", value: 12 },
  ];

  const increaseYear = () => {
    setYear((currentYear) => currentYear + 1);
  };

  const decreaseYear = () => {
    setYear((currentYear) => currentYear - 1);
  };

  const monthSelectorHandler = (monthObject) => {
    setMonth(monthObject.value);
  };

  const confirmMonthSelection = () => {
    dispatch(setSelectedMonth({ year, month }));
    closeModal();
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={false}
      onRequestClose={closeModal}
    >
      <View style={style.modal}>
        <Text style={style.title}>Select Month and Year</Text>

        <View style={style.container}>
          <View style={style.yearChanger}>
            <Pressable onPress={decreaseYear} style={style.arrowIcon}>
              <Icon name={"keyboard-arrow-left"} />
            </Pressable>

            <View style={style.yearText}>
              <Text style={style.year}>{year}</Text>
            </View>

            <Pressable onPress={increaseYear} style={style.arrowIcon}>
              <Icon name={"keyboard-arrow-right"} />
            </Pressable>
          </View>

          <View style={style.months}>
            <DisplayMonths
              data={firstQuarterMonths}
              selectMonth={monthSelectorHandler}
              month={month}
            />
            <DisplayMonths
              data={secondQuarterMonths}
              selectMonth={monthSelectorHandler}
              month={month}
            />
            <DisplayMonths
              data={thirdQuarterMonths}
              selectMonth={monthSelectorHandler}
              month={month}
            />
          </View>
        </View>

        <View style={style.buttonContainer}>
          <MyButton title="Confirm" onPress={confirmMonthSelection} />
        </View>
      </View>
    </Modal>
  );
};

export default MonthSelectorModal;

const style = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 12,
  },
  yearChanger: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  yearText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  year: {
    fontSize: 20,
  },
  arrowIcon: {
    padding: 4,
  },
  months: {
    marginTop: 0,
  },
  title: {
    textAlign: "center",
    paddingVertical: 12,
    marginBottom: 8,
    fontSize: 20,
    // fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },
  modal: {
    marginHorizontal: 12,
    marginTop: sBarHeight,
  },
});
