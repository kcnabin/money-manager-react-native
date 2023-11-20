import { View, StyleSheet, Text, Pressable } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import { allColors } from "../../Colors"

const IconText = ({
  text = 'Hello', icon = "settings", size = 36, color = "#86909b" }) => {
  return (
    <Pressable
      android_ripple={{ color: allColors.lightGray }}
      style={style.mainContainer}
    >
      <View style={style.container}>
        <MaterialIcons name={icon} size={size} color={color} />
        <Text style={style.text}>
          {text}
        </Text>
      </View>
    </Pressable >
  )
}



export default IconText

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 16,
    borderColor: allColors.lightGray,
    borderWidth: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  text: {
    fontSize: 18,
    marginTop: 8
  }
})