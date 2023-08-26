import { View, Text, StyleSheet } from "react-native";

const Pill = ({ text }) => {
  return (
    <View style={style.container}>
      <Text style={style.text}>{text}</Text>
    </View>
  );
};

export default Pill;

const style = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  text: {
    fontSize: 16,
    fontFamily: "main",
    textAlign: "center",
  },
});
