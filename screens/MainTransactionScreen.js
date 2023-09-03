import { createStackNavigator } from "@react-navigation/stack";

import TransactionScreen from "./TransactionScreen";
import AddIncomeExpensesScreen from "./incomeExpenses/AddIncomeExpensesScreen";
import EditOptionsScreen from "./EditOptionsScreen";

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
    </Stack.Navigator>
  );
};

export default MainTransactionScreen;
