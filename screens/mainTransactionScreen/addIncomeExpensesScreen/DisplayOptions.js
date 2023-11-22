import { FlatList, Text, View, StyleSheet } from "react-native";
import EachOption from "./EachOption";

const DisplayOptions = ({ data, selectOptions }) => {
  if (data.length < 1) {
    return (
      <View>
        <Text style={styles.info}>Press '+' icon to add category.</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <EachOption item={item} selectOptions={selectOptions} />
        )}
        keyExtractor={(item) => item.id || Math.random()}
        numColumns={3}
      />
    </>
  );
};

export default DisplayOptions;

const styles = StyleSheet.create({
  info: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 8,
  },
});
