import { View, Text, StyleSheet, Pressable } from "react-native";
import { allColors } from "../../Colors";

const DisplayMonths = ({ data, selectMonth, month }) => {
  const highlightCurrentMonth = (displayedMonth) => {
    if (displayedMonth === month) {
      return {
        color: allColors.expensesColor,
      };
    }
  };
  return (
    <View style={style.container}>
      {data.map((eachMonth) => (
        <Pressable
          onPress={() => selectMonth(eachMonth)}
          key={eachMonth.value}
          style={style.month}
          android_ripple={{ color: allColors.lightGray }}
        >
          <Text style={[style.text, highlightCurrentMonth(eachMonth.value)]}>
            {eachMonth.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default DisplayMonths;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  month: {
    flex: 1,
    // borderColor: "black",
    // borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
