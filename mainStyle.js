import { StyleSheet } from "react-native";
import { allColors } from "./Colors";

export const mainStyle = StyleSheet.create({
  fullArea: {
    flex: 1,
  },
  bigFont: {
    fontSize: 28,
  },
  header: {
    padding: 12,
    backgroundColor: allColors.topTabBackground,
  },
  headerText: {
    fontSize: 16,
  },
  mainFont: {},
  mainFontBold: {},
  input: {
    borderBottomWidth: 1,
    borderBottomColor: allColors.gray,
    paddingBottom: 4,
    marginLeft: 16,
    fontSize: 16,
    flex: 1,
    flexDirection: "row",
  },
  inputText: {
    fontSize: 16,
    width: 70,
    marginVertical: 8,
  },
  font16: {
    fontSize: 16,
  },
  font20: {
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
