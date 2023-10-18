import { MaterialIcons } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"

import { allColors } from "../Colors"

const CircularAddIcon = ({ size = 30, color = 'white' }) => {
  return (
    <View style={style.addIcon}>
      <MaterialIcons name="add" size={size} color={color} />
    </View>
  )
}

const style = StyleSheet.create({
  addIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: allColors.incomeColor,

    alignItems: "center",
    justifyContent: "center",
  }
})

export default CircularAddIcon