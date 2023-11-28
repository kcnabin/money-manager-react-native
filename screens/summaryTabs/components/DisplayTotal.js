import { View, Text, StyleSheet } from "react-native";
import { allColors } from "../../../Colors";

const DisplayTotal = ({ total }) => {
  return (
    <View style={style.container}>
      <Text style={style.header}>Total Balance</Text>
      <Text style={style.value}>{total.toLocaleString()}</Text>
    </View>
  );
};

export default DisplayTotal;

const style = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBlockColor: allColors.lightGray,
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 16,
    marginBottom: 2,
  },
  value: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
