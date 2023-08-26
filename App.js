import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import TransactionScreen from "./screens/TransactionScreen";
import SummaryScreen from "./screens/SummaryScreen";
import MoreScreen from "./screens/MoreScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { allColors } from "./Colors";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <View style={style.appContainer}>
      <NavigationContainer>
        <Tab.Navigator
          activeColor={allColors.tabActive}
          inactiveColor={allColors.tabInactive}
          barStyle={{ backgroundColor: allColors.tabBackground }}
        >
          <Tab.Screen
            name="TransactionScreen"
            component={TransactionScreen}
            options={{
              title: "Transactions",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="grid-view" size={28} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="SummaryScreen"
            component={SummaryScreen}
            options={{
              title: "Summary",
              tabBarIcon: ({ color }) => (
                <MaterialIcons
                  name="account-balance-wallet"
                  size={24}
                  color={color}
                />
              ),
            }}
          />

          <Tab.Screen
            name="MoreScren"
            component={MoreScreen}
            options={{
              title: "More",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="settings" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 40,
  },
  appText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
