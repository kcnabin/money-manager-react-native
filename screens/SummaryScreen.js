import { View, Text } from "react-native";
import { mainStyle } from "../mainStyle";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IncomeTab from "./summaryTabs/IncomeTab";
import ExpensesTab from "./summaryTabs/ExpensesTab";

const TopTab = createMaterialTopTabNavigator();

const SummaryScreen = () => {
  return (
    <View style={mainStyle.fullArea}>
      <View style={mainStyle.header}>
        <Text style={mainStyle.headerText}>Summary Screen Header</Text>
      </View>
      <View style={mainStyle.fullArea}>
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
