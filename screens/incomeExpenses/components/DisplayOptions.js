import { FlatList } from "react-native-gesture-handler";
import EachOption from "./EachOption";

const DisplayOptions = ({ data, selectOptions }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <EachOption item={item} selectOptions={selectOptions} />
      )}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};

export default DisplayOptions;
