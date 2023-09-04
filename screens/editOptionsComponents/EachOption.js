import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { allColors } from "../../Colors";
import { useNavigation } from "@react-navigation/native";

const EachOption = ({ option, optionType }) => {
  const navigation = useNavigation();

  const showEditForm = () => {
    navigation.navigate("EditOptionsForm", { optionType, option });
  };

  return (
    <View style={style.option}>
      <View style={style.iconText}>
        <Pressable>
          <MaterialIcons
            name="delete-outline"
            size={28}
            color={allColors.tabActive}
          />
        </Pressable>
        <Text style={style.optionText}>{option.value}</Text>
      </View>

      <Pressable onPress={showEditForm}>
        <MaterialIcons name="edit" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default EachOption;

const style = StyleSheet.create({
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "main",
  },
});
