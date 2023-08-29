import { View, Text } from "react-native";
import DisplayOptions from "./components/DisplayOptions";
import { useSelector } from "react-redux";

const OptionSelector = ({
  accountOrCategory,
  transactionType,
  selectOptions,
}) => {
  const incomeCategory = useSelector((state) => state.incomeCategory);

  const account = useSelector((state) => state.account);

  const expensesCategory = useSelector((state) => state.expensesCategory);

  return (
    <View>
      <Text>
        {accountOrCategory ? (
          <DisplayOptions data={account} selectOptions={selectOptions} />
        ) : transactionType === "expenses" ? (
          <DisplayOptions
            data={expensesCategory}
            selectOptions={selectOptions}
          />
        ) : (
          <DisplayOptions data={incomeCategory} selectOptions={selectOptions} />
        )}
      </Text>
    </View>
  );
};

export default OptionSelector;
