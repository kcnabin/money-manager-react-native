import { View, Text } from "react-native";
import { mainStyle } from "../../../mainStyle";
import { useSelector } from "react-redux";

const YearTab = () => {
  const income = useSelector((state) => state.income);
  const expenses = useSelector((state) => state.expenses);

  return (
    <View style={mainStyle.fullArea}>
      <Text style={mainStyle.bigFont}>YearTab</Text>
    </View>
  );
};

export default YearTab;
