import { View, StyleSheet, Pressable } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CalendarTab from "./transactionScreen/CalendarScreen";
import DayTab from "./transactionScreen/DayScreen";
import MonthTab from "./transactionScreen/MonthScreen";

import SelectedMonthAndYear from "../components/SelectedMonthAndYear";

import { mainStyle } from "../../mainStyle";
import { MaterialIcons } from "@expo/vector-icons";
import CircularAddIcon from "../../components/CircularAddIcon";

const TopTab = createMaterialTopTabNavigator();

const TransactionScreen = ({ navigation }) => {
  const handleNewTransaction = () => {
    navigation.navigate("AddIncomeExpenses");
  };

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
            name="CalenderTab"
            component={CalendarTab}
            options={{ title: "Calendar" }}
          />
        </TopTab.Navigator>
      </View>

      <Pressable style={style.addIconContainer} onPress={handleNewTransaction}>
        <CircularAddIcon />
      </Pressable>
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
  addIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
