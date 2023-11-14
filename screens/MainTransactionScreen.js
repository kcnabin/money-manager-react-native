import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import { initAccountFromDb } from "../features/account/accountSlice";
import { initExpensesCategoryFromDb } from "../features/expensesCategory/expensesCategorySlice";
import { initIncomeCategoryFromDb } from "../features/incomeCategory/incomeCategorySlice";

import {
  fetchAllFromDb,
  initializeAccountTable,
  initializeExpensesCategoryTable,
  initializeExpensesTable,
  initializeIncomeCategoryTable,
  initializeIncomeTable,
} from "../util/database";

import TransactionScreen from "./mainTransactionScreen/TransactionScreen";
import EditOptionsScreen from "./mainTransactionScreen/EditOptionsScreen";
import EditOptionsFormScreen from "./mainTransactionScreen/editOptionsScreen/EditOptionsFormScreen";
import SearchScreen from "./mainTransactionScreen/SearchScreen";
import AddIncomeExpensesScreen from "./mainTransactionScreen/AddIncomeExpensesScreen";

const Stack = createStackNavigator();

const MainTransactionScreen = () => {
  const [databaseInitializing, setDatabaseInitializing] = useState(true);

  const [fontsLoaded] = useFonts({
    witcher: require("../assets/fonts/Witcher.ttf"),
    main: require("../assets/fonts/OpenSans.ttf"),
    "main-bold": require("../assets/fonts/OpenSansBold.ttf"),
  });

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

    try {
      initializeDatabase();
      fetchInitialData();
    } catch (error) {
      console.log(error);
    } finally {
      setDatabaseInitializing(false);
    }
  }, []);

  if (!fontsLoaded || databaseInitializing) {
    // return <AppLoading />;
    return "";
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
