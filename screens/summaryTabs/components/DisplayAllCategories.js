import { ScrollView, Text, StyleSheet } from "react-native";
import EachCategory from "./EachCategory";

const DisplayAllCategories = ({ data, grandTotal }) => {
  if (grandTotal === 0) {
    return <Text style={style.info}>Not enough data</Text>;
  }

  return (
    <ScrollView>
      {data.map((category, i) => (
        <EachCategory category={category} grandTotal={grandTotal} key={i} />
      ))}
    </ScrollView>
  );
};

export default DisplayAllCategories;

const style = StyleSheet.create({
  info: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
  },
});
