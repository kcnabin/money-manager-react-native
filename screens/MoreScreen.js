import { View, Text, StyleSheet, ScrollView } from "react-native";
import IconText from "./components/IconText";

const MoreScreen = () => {
  return (
    <ScrollView>
      <Text style={style.title}>Settings</Text>
      <ScrollView style={style.container}>
        <View>
          <View style={style.flexRow}>
            <IconText icon="settings" text="Configuration" />

            <IconText icon="vpn-key" text="Passcode" />
          </View>

          <View style={style.flexRow}>
            <IconText icon="style" text="Theme" />

            <IconText icon="help-outline" text="Help" />
          </View>

          <View style={style.flexRow}>
            <IconText icon="backup" text="Backup" />

            <IconText icon="thumb-up-off-alt" text="Recommend" />
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default MoreScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flexRow: {
    flexDirection: "row",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingTop: 16,
    paddingBottom: 40,
    textAlign: "center",
  },
});
