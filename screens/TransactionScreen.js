import { View, StyleSheet, Button, Pressable } from "react-native";
import { mainStyle } from "../mainStyle";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CalendarTab from "./transactionsTabs/CalendarTab";
import DayTab from "./transactionsTabs/DayTab";
import MonthTab from "./transactionsTabs/MonthTab";
import YearTab from "./transactionsTabs/YearTab";

import { allColors } from "../Colors";
import SelectedMonthAndYear from "./components/SelectedMonthAndYear";
import { MaterialIcons } from "@expo/vector-icons";

const TopTab = createMaterialTopTabNavigator();

const TransactionScreen = ({ navigation }) => {
  return (
    <View style={mainStyle.fullArea}>
      <View style={style.headerContainer}>
        <SelectedMonthAndYear />

        <Pressable
          style={style.search}
          onPress={() => navigation.navigate("Search")}
        >
          <MaterialIcons name="search" size={24} color="black" />
        </Pressable>
      </View>

      <View style={[mainStyle.fullArea]}>
        <TopTab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            // tabBarStyle: { backgroundColor: "red" },
          }}
        >
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

          <TopTab.Screen
            name="CalenderTab"
            component={CalendarTab}
            options={{ title: "Calendar" }}
          />
        </TopTab.Navigator>
      </View>

      <View style={{ margin: 12 }}>
        <Button
          title="Add"
          color={allColors.tabActive}
          onPress={() => navigation.navigate("AddIncomeExpenses")}
        />
      </View>
    </View>
  );
};

export default TransactionScreen;

const style = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    backgroundColor: "white",
  },
  search: {
    marginRight: 12,
    padding: 4,
  },
});
