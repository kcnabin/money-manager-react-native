import { View, Text } from "react-native";
import { mainStyle } from "../mainStyle";

const MoreScreen = () => {
  return (
    <View style={mainStyle.fullArea}>
      <Text style={[mainStyle.bigFont, mainStyle.headerText]}>MoreScreen</Text>
    </View>
  );
};

export default MoreScreen;