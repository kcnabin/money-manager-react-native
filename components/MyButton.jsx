import { Text, StyleSheet, Pressable } from "react-native"
import { allColors } from "../Colors"

const MyButton = ({ title, variant = 'primary', onPress }) => {

  return (
    <Pressable
      style={[style.container, variant === 'secondary' ? style.secondary : style.primary]}
      onPress={onPress}
    >
      <Text style={style.text}>
        {title}
      </Text>
    </Pressable>
  )
}

export default MyButton

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center'
  },
  primary: {
    backgroundColor: allColors.incomeColor
  },
  secondary: {
    backgroundColor: allColors.expensesColor
  }
})