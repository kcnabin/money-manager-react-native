import { View, Text, StyleSheet } from "react-native"
import EachDay from "./EachDay"

const WeeklyView = ({ data }) => {
  return (
    <View style={style.container}>
      {
        data.map((day, i) => <EachDay day={day} key={i} />)
      }
    </View>
  )

}

export default WeeklyView

const style = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})