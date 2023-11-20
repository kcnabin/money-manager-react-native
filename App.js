import { StyleSheet, SafeAreaView, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler";

import SummaryScreen from "./screens/SummaryScreen";
import MoreScreen from "./screens/MoreScreen";
import MainTransactionScreen from "./screens/MainTransactionScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { allColors } from "./Colors";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={style.appContainer}>
        <NavigationContainer>
          <Tab.Navigator
            activeColor={allColors.tabActive}
            inactiveColor={allColors.tabInactive}
            barStyle={{ backgroundColor: allColors.tabBackground }}
          >
            <Tab.Screen
              name="TransactionScreen"
              component={MainTransactionScreen}
              options={{
                title: "Transactions",
                tabBarIcon: ({ color }) => (
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
              name="MoreScreen"
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
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const style = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
  },
  appText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
