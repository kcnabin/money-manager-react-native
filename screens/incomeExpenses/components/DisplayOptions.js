import { FlatList } from "react-native-gesture-handler";
import EachOption from "./EachOption";

const DisplayOptions = ({ data, selectOptions }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <EachOption value={item.value} selectOptions={selectOptions} />
      )}
      keyExtractor={(item) => item.id}
      numColumns={3}
      style={{ flex: 1, borderColor: "red", flex: 1 }}
    />
  );
};

export default DisplayOptions;
