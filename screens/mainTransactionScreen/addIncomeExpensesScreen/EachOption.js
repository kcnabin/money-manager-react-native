import { Text, Pressable, StyleSheet } from "react-native";

const EachOption = ({ item, selectOptions }) => {
  const handleOptionSelection = () => {
    selectOptions(item);
  };
  return (
    <Pressable
      style={style.option}
      onPress={handleOptionSelection}
      android_ripple={{ color: "#c5c5c5" }}
    >
      <Text style={style.optionText}>{item.value}</Text>
    </Pressable>
  );
};

export default EachOption;

const style = StyleSheet.create({
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#cccccc",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
});
