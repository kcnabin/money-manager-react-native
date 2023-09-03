import { useEffect } from "react";
import { View, Text } from "react-native";

const EditOptionsScreen = ({ route, navigation }) => {
  const { option } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle:
        option === "account"
          ? "Account Setting"
          : option === "income"
          ? "Income Category"
          : "Expenses Category",
    });
  }, [option]);

  return (
    <View>
      <Text>{option}</Text>
    </View>
  );
};

export default EditOptionsScreen;
