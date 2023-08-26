import { View, Text } from "react-native";
import { mainStyle } from "../mainStyle";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CalendarTab from "./transactionsTabs/CalendarTab";
import DayTab from "./transactionsTabs/DayTab";
import MonthTab from "./transactionsTabs/MonthTab";
import YearTab from "./transactionsTabs/YearTab";

const TopTab = createMaterialTopTabNavigator();

const TransactionScreen = () => {
  return (
    <View style={mainStyle.fullArea}>
      <View style={mainStyle.header}>
        <Text style={mainStyle.headerText}>Transactions Header and others</Text>
      </View>

      <View style={[mainStyle.fullArea]}>
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
