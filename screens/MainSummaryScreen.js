import { createStackNavigator } from "@react-navigation/stack";

import SummaryScreen from "./SummaryScreen";
import CategorySummary from "./summaryTabs/CategorySummary";

const Stack = createStackNavigator();

const MainSummaryScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IncomeExpensesSummary"
        component={SummaryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CategorySummary" component={CategorySummary} />
    </Stack.Navigator>
  );
};

export default MainSummaryScreen;
