import { View, Text, Pressable } from "react-native";
import { mainStyle } from "../../../mainStyle";

const DateAndTimePicker = ({ date, setShow, setMode }) => {
  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
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
  );
};

export default DateAndTimePicker;
