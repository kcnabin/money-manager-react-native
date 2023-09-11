import { View, Text } from "react-native";
import { mainStyle } from "../../mainStyle";
import { useSelector } from "react-redux";

const YearTab = () => {
  const income = useSelector((state) => state.income);
  console.log("income :", income);
  const expenses = useSelector((state) => state.expenses);
  console.log("expenses :", expenses);

  return (
    <View style={mainStyle.fullArea}>
      <Text style={mainStyle.bigFont}>YearTab</Text>
    </View>
  );
};

export default YearTab;
