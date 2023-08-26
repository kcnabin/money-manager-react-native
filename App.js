import { View, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import "react-native-gesture-handler";

import SummaryScreen from "./screens/SummaryScreen";
import MoreScreen from "./screens/MoreScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { allColors } from "./Colors";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import MainTransactionScreen from "./screens/MainTransactionScreen";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    witcher: require("./assets/fonts/Witcher.ttf"),
    main: require("./assets/fonts/OpenSans.ttf"),
    "main-bold": require("./assets/fonts/OpenSansBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={style.appContainer}>
      <NavigationContainer>
        <Tab.Navigator
          activeColor={allColors.tabActive}
          inactiveColor={allColors.tabInactive}
          barStyle={{ backgroundColor: allColors.tabBackground }}
        >
          <Tab.Screen
            name="TransactionScreen"
            // component={TransactionScreen}
            component={MainTransactionScreen}
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
    </SafeAreaView>
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
