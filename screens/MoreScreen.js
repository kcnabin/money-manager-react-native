import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Pressable,
} from "react-native";

import IconText from "./components/IconText";
import { allColors } from "../Colors";

const MoreScreen = () => {
  const github = "https://github.com/kcnabin";
  const website = "https://kcnabin.github.io/";

  return (
    <ScrollView style={style.mainContainer}>
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

      <View style={style.creditContainer}>
        <Text style={style.creditText}>Designed and developed by: </Text>

        <Pressable onPress={() => Linking.openURL(website)}>
          <Text style={style.developer}>Nabin KC</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => Linking.openURL(github)}>
        <Text style={[style.creditText, style.developer]}>{github}</Text>
      </Pressable>
    </ScrollView>
  );
};

export default MoreScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 12,
  },
  flexRow: {
    flexDirection: "row",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingTop: 16,
    paddingBottom: 30,
    textAlign: "center",
  },
  creditContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  creditText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "300",
  },
  developer: {
    fontSize: 18,
    fontWeight: "bold",
    color: allColors.developer,
    textDecorationLine: "underline",
  },
});
