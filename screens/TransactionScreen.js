import { View, Text, StyleSheet } from "react-native";
import { mainStyle } from "../mainStyle";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

import CalendarTab from "./transactionsTabs/CalendarTab";
import DayTab from "./transactionsTabs/DayTab";
import MonthTab from "./transactionsTabs/MonthTab";
import YearTab from "./transactionsTabs/YearTab";
import { allColors } from "../Colors";

const TopTab = createMaterialTopTabNavigator();

const TransactionScreen = () => {
  return (
    <View style={mainStyle.fullArea}>
      <View style={style.header}>
        <Text style={style.headerText}>Transactions Header and others</Text>
      </View>

      <View style={[mainStyle.fullArea, style.calendar]}>
        <TopTab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            // tabBarStyle: { backgroundColor: "red" },
          }}
        >
          <TopTab.Screen
            name="CalenderTab"
            component={CalendarTab}
            options={{ title: "Calendar" }}
          />

          <TopTab.Screen
            name="DayTab"
            component={DayTab}
            options={{ title: "Day" }}
          />

          <TopTab.Screen
            name="MonthTab"
            component={MonthTab}
            options={{ title: "Month" }}
          />

          <TopTab.Screen
            name="YearTab"
            component={YearTab}
            options={{ title: "Year" }}
          />
        </TopTab.Navigator>
      </View>
    </View>
  );
};

export default TransactionScreen;

const style = StyleSheet.create({
  header: {
    padding: 12,
    backgroundColor: allColors.topTabBackground,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  calendar: {},
});
