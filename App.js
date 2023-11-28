import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { StyleSheet, StatusBar as SBar, View, Platform } from "react-native";

import { Provider } from "react-redux";
import { store } from "./app/store";

import Main from "./main";

const sBarHeight =
  Platform.OS === "ios" ? Constants.statusBarHeight : SBar.currentHeight;

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
    marginTop: sBarHeight,
  },
});
