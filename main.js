import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { initAccountFromDb } from "./features/account/accountSlice";
import { initExpensesCategoryFromDb } from "./features/expensesCategory/expensesCategorySlice";
import { initIncomeCategoryFromDb } from "./features/incomeCategory/incomeCategorySlice";

import SummaryScreen from "./screens/SummaryScreen";
import MoreScreen from "./screens/MoreScreen";
import MainTransactionScreen from "./screens/MainTransactionScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { allColors } from "./Colors";

import {
  fetchAllFromDb,
  initializeAccountTable,
  initializeExpensesCategoryTable,
  initializeExpensesTable,
  initializeIncomeCategoryTable,
  initializeIncomeTable,
} from "./util/database";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  const [databaseInitializing, setDatabaseInitializing] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeDatabase = async () => {
      await initializeAccountTable();
      await initializeExpensesCategoryTable();
      await initializeIncomeCategoryTable();
      await initializeExpensesTable();
      await initializeIncomeTable();
    };

    const fetchInitialData = async () => {
      const accounts = await fetchAllFromDb("account");
      dispatch(initAccountFromDb(accounts));

      const expensesCategory = await fetchAllFromDb("expensesCategory");
      dispatch(initExpensesCategoryFromDb(expensesCategory));

      const incomeCategory = await fetchAllFromDb("incomeCategory");
      dispatch(initIncomeCategoryFromDb(incomeCategory));
    };

    const initApp = async () => {
      try {
        await initializeDatabase();
        await fetchInitialData();
        setDatabaseInitializing(false);
      } catch (error) {
        console.log(error);
        Alert.alert("Error initializing database!");
      }
    };

    initApp();
  }, []);

  if (databaseInitializing) {
    // return <AppLoading />;
    return "";
  }

  return (
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
                size={28}
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
              <MaterialIcons name="settings" size={28} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
