import { ScrollView, StyleSheet } from "react-native";
import EachOption from "./EachOption";

const DisplayOptions = ({ options, optionType }) => {
  return (
    <ScrollView style={style.container}>
      {options.map((option) => (
        <EachOption option={option} optionType={optionType} key={option.id} />
      ))}
    </ScrollView>
  );
};

export default DisplayOptions;

const style = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
});
