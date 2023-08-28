import { View, Text, Pressable } from "react-native";

const EachOption = ({ value, selectOptions }) => {
  const handleOptionSelection = () => {
    selectOptions(value);
  };
  return (
    <Pressable
      style={{ padding: 12, borderWidth: 1, borderColor: "black", flex: 1 }}
      onPress={handleOptionSelection}
    >
      <Text>{value}</Text>
    </Pressable>
  );
};

export default EachOption;
