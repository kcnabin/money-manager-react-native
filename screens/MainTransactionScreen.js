import { createStackNavigator } from "@react-navigation/stack";

import TransactionScreen from "./mainTransactionScreen/TransactionScreen";
import AddIncomeExpensesScreen from "./mainTransactionScreen/AddIncomeExpensesScreen";
import EditOptionsScreen from "./mainTransactionScreen/EditOptionsScreen";
import EditOptionsFormScreen from "./mainTransactionScreen/editOptionsScreen/EditOptionsFormScreen";
import SearchScreen from "./mainTransactionScreen/SearchScreen";

const Stack = createStackNavigator();

const MainTransactionScreen = () => {
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
