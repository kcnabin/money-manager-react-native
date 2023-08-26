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
    fontWeight: "bold",
    fontSize: 16,
  },
});
