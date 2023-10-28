import { FlatList } from "react-native";
import EachOption from "./EachOption";

const DisplayOptions = ({ data, selectOptions }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <EachOption item={item} selectOptions={selectOptions} />
      )}
      keyExtractor={(item) => item.id || Math.random()}
      numColumns={3}
    />
  );
};

export default DisplayOptions;
