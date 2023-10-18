import { createStackNavigator } from "@react-navigation/stack";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { initExpensesFromDb } from "../features/expenses/expensesSlice";
import { initIncomeFromDb } from "../features/income/incomeSlice";

import {
  initializeExpensesTable,
  fetchAllExpenses,
  initializeIncomeTable,
  fetchAllIncome,
  initializeAccountTable,
  fetchAccountsFromDb,
} from "../util/database";

import TransactionScreen from "./mainTransactionScreen/TransactionScreen";
import EditOptionsScreen from "./mainTransactionScreen/EditOptionsScreen";
import EditOptionsFormScreen from "./mainTransactionScreen/editOptionsScreen/EditOptionsFormScreen";
import SearchScreen from "./mainTransactionScreen/SearchScreen";
import AddIncomeExpensesScreen from "./mainTransactionScreen/AddIncomeExpensesScreen";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { initAccountFromDb } from "../features/account/accountSlice";

const Stack = createStackNavigator();

const MainTransactionScreen = () => {
  const [fontsLoaded] = useFonts({
    witcher: require("../assets/fonts/Witcher.ttf"),
    main: require("../assets/fonts/OpenSans.ttf"),
    "main-bold": require("../assets/fonts/OpenSansBold.ttf"),
  });

  const dispatch = useDispatch();
  const [databaseInitializing, setDatabaseInitializing] = useState(true);

  useEffect(() => {
    const initializeDatabase = async () => {
      await initializeExpensesTable();
      await initializeIncomeTable();
      await initializeAccountTable();
    };

    try {
      initializeDatabase();
    } catch (error) {
      console.log(error);
    } finally {
    }

    const fetchInitialData = async () => {
      const expenses = await fetchAllExpenses();
      dispatch(initExpensesFromDb(expenses));

      const account = await fetchAccountsFromDb();
      dispatch(initAccountFromDb(account));
    };

    try {
      fetchInitialData();
    } catch (error) {
      console.log(error);
    }

    setDatabaseInitializing(false);
  }, []);

  if (!fontsLoaded || databaseInitializing) {
    return <AppLoading />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllTransactions"
        component={TransactionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddIncomeExpenses"
        component={AddIncomeExpensesScreen}
      />

      <Stack.Screen
        name="EditOptions"
        component={EditOptionsScreen}
        options={{
          headerTitle: "Setting",
        }}
      />

      <Stack.Screen
        name="EditOptionsForm"
        component={EditOptionsFormScreen}
        options={{
          headerTitle: "Update Category",
        }}
      />

      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default MainTransactionScreen;
