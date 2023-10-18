import { useEffect } from "react";
import { useSelector } from "react-redux";
import DisplayOptions from "./editOptionsScreen/DisplayOptions";

const EditOptionsScreen = ({ route, navigation }) => {
  const { option } = route.params;
  const account = useSelector((state) => state.account);
  const incomeCategory = useSelector((state) => state.incomeCategory);
  const expensesCategory = useSelector((state) => state.expensesCategory);

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

  if (option === "account") {
    return <DisplayOptions options={account} optionType={option} />;
  }

  if (option === "income") {
    return <DisplayOptions options={incomeCategory} optionType={option} />;
  }

  return <DisplayOptions options={expensesCategory} optionType={option} />;
};

export default EditOptionsScreen;
