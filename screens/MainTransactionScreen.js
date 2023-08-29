import { View, Text } from "react-native";
import { mainStyle } from "../mainStyle";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionScreen from "./TransactionScreen";
import AddIncomeExpensesScreen from "./incomeExpenses/AddIncomeExpensesScreen";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const MainTransactionScreen = () => {
  // const storeItems = useSelector((state) => state.expenses);
  // console.log("storeItems :", storeItems);

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
