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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: allColors.gray,
    paddingBottom: 4,
    marginLeft: 16,
    fontFamily: "main",
    fontSize: 16,
    flex: 1,
  },
  inputText: {
    fontFamily: "main",
    fontSize: 16,
    width: 70,
  },
  font16: {
    fontFamily: "main",
    fontSize: 16,
  },
  font20: {
    fontFamily: "main",
    fontSize: 20,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    columnGap: 8,
  },

  incomeColor: {
    color: allColors.incomeColor,
  },
  expensesColor: {
    color: allColors.expensesColor,
  },
});
