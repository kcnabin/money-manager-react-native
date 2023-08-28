import { View, Text } from "react-native";
import DisplayOptions from "./components/DisplayOptions";

const OptionSelector = ({
  accountOrCategory,
  transactionType,
  selectOptions,
}) => {
  const accountTypes = [
    {
      id: 0,
      value: "Cash",
    },
    {
      id: 1,
      value: "Mobile Banking",
    },
    {
      id: 2,
      value: "Card",
    },
  ];

  const incomeTypes = [
    {
      id: 0,
      value: "Salary",
    },
    {
      id: 1,
      value: "Allowances",
    },
    {
      id: 2,
      value: "Others",
    },
  ];

  const expensesTypes = [
    {
      id: 0,
      value: "Food",
    },
    {
      id: 1,
      value: "Fuel",
    },
    {
      id: 2,
      value: "Rent",
    },
  ];

  return (
    <View>
      <Text>
        {accountOrCategory ? (
          <DisplayOptions data={accountTypes} selectOptions={selectOptions} />
        ) : transactionType === "expenses" ? (
          <DisplayOptions data={expensesTypes} selectOptions={selectOptions} />
        ) : (
          <DisplayOptions data={incomeTypes} selectOptions={selectOptions} />
        )}
      </Text>
    </View>
  );
};

export default OptionSelector;
