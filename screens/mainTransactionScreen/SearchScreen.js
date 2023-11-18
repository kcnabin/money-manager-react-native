import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import MyButton from "../../components/MyButton";
import { searchInDb } from "../../util/database";
import EachSearchResult from "./searchScreen/EachSearchResult";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState(
    "Search for your transaction..."
  );

  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = () => {
    setIsSearching(true);
  };

  useEffect(() => {
    const searchTransaction = async () => {
      try {
        const incomeSearch = await searchInDb(search, "income");
        const expensesSearch = await searchInDb(search, "expenses");
        const result = [...incomeSearch, ...expensesSearch];
        setSearchResult(result);
        setSearchMessage(
          result.length
            ? `${result.length} records found ...`
            : "No transaction found !"
        );
      } catch (error) {
        Alert.alert("Error searching...");
        console.log(error);
      } finally {
        setIsSearching(false);
      }
    };

    if (isSearching && search) {
      searchTransaction();
    }
  }, [isSearching]);

  return (
    <ScrollView style={style.container}>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          placeholder="Search for your transactions"
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      <MyButton
        title={isSearching ? "Searching..." : "Search"}
        variant="primary"
        onPress={handleSearch}
      />

      <Text style={style.searchMessage}>{searchMessage}</Text>

      <ScrollView>
        {searchResult.length > 0 &&
          searchResult.map((eachTx) => (
            <EachSearchResult search={eachTx} key={eachTx.id} />
          ))}
      </ScrollView>
    </ScrollView>
  );
};

export default SearchScreen;

const style = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchMessage: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
  },
});
