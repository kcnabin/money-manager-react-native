import { StyleSheet } from "react-native";
import { allColors } from "./Colors";

export const mainStyle = StyleSheet.create({
  fullArea: {
    flex: 1,
  },
  bigFont: {
    fontSize: 28,
    fontWeight: "bold",
  },
  header: {
    padding: 12,
    backgroundColor: allColors.topTabBackground,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "main-bold",
  },
  mainFont: {
    fontFamily: "main",
  },
  mainFontBold: {
    fontFamily: "main-bold",
  },
});
