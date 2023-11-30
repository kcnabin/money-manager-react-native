import { Pressable, View, Text, StyleSheet, Modal } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  decreaseOneMonth,
  increaseOneMonth,
} from "../../features/selectedMonth/selectedMonthSlice";

import { displaySelectedMonthAndYear } from "../../helper/dateHelper";
import { MaterialIcons } from "@expo/vector-icons";
import MonthSelectorModal from "./MonthSelectorModal";

const SelectedMonthAndYear = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMonthDecrement = () => {
    dispatch(decreaseOneMonth());
  };

  const handleMonthIncrement = () => {
    dispatch(increaseOneMonth());
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={style.container}>
      <Pressable style={style.pressableIcon} onPress={handleMonthDecrement}>
        <MaterialIcons name="chevron-left" size={24} color="black" />
      </Pressable>

      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={style.selectedMonth}>
          {displaySelectedMonthAndYear(selectedMonth)}
        </Text>
      </Pressable>

      <Pressable style={style.pressableIcon} onPress={handleMonthIncrement}>
        <MaterialIcons name="chevron-right" size={24} color="black" />
      </Pressable>

      <MonthSelectorModal modalVisible={modalVisible} closeModal={closeModal} />
    </View>
  );
};

export default SelectedMonthAndYear;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 0,
  },
  selectedMonth: {
    fontSize: 18,
  },
  pressableIcon: {
    padding: 6,
  },
});
