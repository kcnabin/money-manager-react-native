import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, StatusBar as SBar, View } from "react-native";

import { Provider } from "react-redux";
import { store } from "./app/store";

import Main from "./main";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <View style={style.appContainer}>
        <Main />
      </View>
    </Provider>
  );
};

export default App;

const style = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: SBar.currentHeight,
  },
});
