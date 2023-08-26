import { View, Text } from "react-native";
import { mainStyle } from "../mainStyle";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionScreen from "./TransactionScreen";
import AddIncomeExpensesScreen from "./incomeExpenses/AddIncomeExpensesScreen";

const Stack = createStackNavigator();

const MainTransactionScreen = () => {
  return (
    <View style={mainStyle.fullArea}>
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
          options={{}}
        />
      </Stack.Navigator>
    </View>
  );
};

export default MainTransactionScreen;
