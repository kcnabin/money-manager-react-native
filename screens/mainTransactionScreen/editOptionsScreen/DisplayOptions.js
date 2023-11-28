import { ScrollView, StyleSheet, Button, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EachOption from "./EachOption";
import CircularAddIcon from "../../../components/CircularAddIcon";
import { allColors } from "../../../Colors";

const DisplayOptions = ({ options, optionType }) => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <ScrollView style={style.options}>
        {options.map((option) => (
          <EachOption option={option} optionType={optionType} key={option.id} />
        ))}
      </ScrollView>

      <Pressable
        style={style.addIcon}
        onPress={() => navigation.navigate("EditOptionsForm", { optionType })}
      >
        <CircularAddIcon />
      </Pressable>
    </View>
  );
};

export default DisplayOptions;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopColor: allColors.lightGray,
    borderTopWidth: 1,
  },
  options: {
    paddingVertical: 12,
  },
  addIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
