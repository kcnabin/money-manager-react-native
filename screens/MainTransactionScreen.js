import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { deleteAllExpenses, fetchAllExpenses } from "../util/database";
import { useDispatch } from "react-redux";
import { initExpensesFromDb } from "../features/expenses/expensesSlice";

import TransactionScreen from "./TransactionScreen";
import AddIncomeExpensesScreen from "./incomeExpenses/AddIncomeExpensesScreen";
import EditOptionsScreen from "./EditOptionsScreen";
import EditOptionsFormScreen from "./EditOptionsFormScreen";
import SearchScreen from "./SearchScreen";

const Stack = createStackNavigator();

const MainTransactionScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllExpenses = async () => {
      const expenses = await fetchAllExpenses();
      dispatch(initExpensesFromDb(expenses));
    };

    getAllExpenses();
  }, []);

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
