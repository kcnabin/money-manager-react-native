import { Pressable, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseOneMonth,
  increaseOneMonth,
} from "../../features/selectedMonth/selectedMonthSlice";

import { displaySelectedMonthAndYear } from "../../helper/dateHelper";
import { MaterialIcons } from "@expo/vector-icons";

const SelectedMonthAndYear = () => {
  const selectedMonth = useSelector((state) => state.selectedMonth);
  const dispatch = useDispatch();

  const handleMonthDecrement = () => {
    dispatch(decreaseOneMonth());
  };

  const handleMonthIncrement = () => {
    dispatch(increaseOneMonth());
  };

  return (
    <View style={style.container}>
      <Pressable style={style.pressableIcon} onPress={handleMonthDecrement}>
        <MaterialIcons name="chevron-left" size={24} color="black" />
      </Pressable>

      <Pressable>
        <Text style={style.selectedMonth}>
          {displaySelectedMonthAndYear(selectedMonth)}
        </Text>
      </Pressable>

      <Pressable style={style.pressableIcon} onPress={handleMonthIncrement}>
        <MaterialIcons name="chevron-right" size={24} color="black" />
      </Pressable>
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
