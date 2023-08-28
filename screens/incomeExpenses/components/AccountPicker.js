import { Pressable, View, Text } from "react-native";
import { mainStyle } from "../../../mainStyle";

const AccountPicker = ({ pickAccount, account }) => {
  return (
    <Pressable onPress={pickAccount}>
      <View style={mainStyle.flexRow}>
        <Text style={mainStyle.inputText}>Account</Text>
        <View style={mainStyle.input}>
          <View style={mainStyle.flexRow}>
            <Text style={mainStyle.font16}>{account}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default AccountPicker;
