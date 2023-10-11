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
  deleteAllExpenses,
} from "../util/database";

import TransactionScreen from "./mainTransactionScreen/TransactionScreen";
import EditOptionsScreen from "./mainTransactionScreen/EditOptionsScreen";
import EditOptionsFormScreen from "./mainTransactionScreen/EditOptionsFormScreen";
import SearchScreen from "./mainTransactionScreen/SearchScreen";
import AddIncomeExpensesScreen from "./mainTransactionScreen/AddIncomeExpensesScreen";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

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
    const initExpensesTable = async () => {
      await initializeExpensesTable();
    };

    try {
      initExpensesTable();
    } catch (error) {
      console.log(error);
    }

    const fetchInitialExpenses = async () => {
      const initialExpenses = await fetchAllExpenses();
      dispatch(initExpensesFromDb(initialExpenses));
    };

    try {
      fetchInitialExpenses();
    } catch (error) {
      console.log(error);
    }

    setDatabaseInitializing(false);
  }, []);

  useEffect(() => {
    const initIncomeTable = async () => {
      await initializeIncomeTable();
    };

    try {
      initIncomeTable();
    } catch (error) {
      console.log(error);
    }

    const fetchInitialIncome = async () => {
      const income = await fetchAllIncome();
      dispatch(initIncomeFromDb(income));
    };

    try {
      fetchInitialIncome();
    } catch (error) {
      console.log(error);
    }
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
          headerTitle: "Change Category",
        }}
      />

      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default MainTransactionScreen;
