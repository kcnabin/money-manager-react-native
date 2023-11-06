import { View, Text, StyleSheet } from "react-native";
import { allColors } from "../../../Colors";

const EachCategory = ({ category, grandTotal }) => {
  if (category.total === 0) {
    return "";
  }

  return (
    <View style={style.container}>
      <View style={style.percentContainer}>
        <View
          style={{
            ...style.percentColorContainer,
            backgroundColor: category.color,
          }}
        >
          <Text style={style.percentText}>
            {((category.total / grandTotal) * 100).toFixed(2)} %
          </Text>
        </View>
      </View>

      <View style={style.nameContainer}>
        <Text style={style.nameText}>{category.name}</Text>
      </View>

      <View style={style.valueContainer}>
        <Text style={style.valueText}>{category.total.toLocaleString()}</Text>
      </View>
    </View>
  );
};

export default EachCategory;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: allColors.lightGray,
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  percentContainer: {
    flex: 2,
  },
  percentColorContainer: {
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 8,
  },
  nameContainer: {
    flex: 4,
    marginHorizontal: 16,
  },
  valueContainer: {
    flex: 2,
  },
  percentText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },
  nameText: {
    fontSize: 16,
  },
  valueText: {
    fontSize: 16,
    textAlign: "right",
  },
});
