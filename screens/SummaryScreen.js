import { View, StyleSheet } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import IncomeTab from "./summaryTabs/IncomeTab";
import ExpensesTab from "./summaryTabs/ExpensesTab";

import SelectedMonthAndYear from "./components/SelectedMonthAndYear";

const TopTab = createMaterialTopTabNavigator();

const SummaryScreen = () => {
  return (
    <View style={style.container}>
      <SelectedMonthAndYear />

      <View style={style.navigationContainer}>
        <TopTab.Navigator>
          <TopTab.Screen
            name="IncomeTab"
            component={IncomeTab}
            options={{
              title: "Income",
            }}
          />
          <TopTab.Screen
            name="ExpensesTab"
            component={ExpensesTab}
            options={{
              title: "Expenses",
            }}
          />
        </TopTab.Navigator>
      </View>
    </View>
  );
};

export default SummaryScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationContainer: {
    flex: 1,
  },
});
