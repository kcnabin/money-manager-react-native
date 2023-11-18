import { View, StyleSheet, ScrollView } from "react-native";

import WeeklyView from "./WeeklyView";

const CalendarData = ({ masterArray }) => {
  const week1 = masterArray.slice(0, 7)
  const week2 = masterArray.slice(7, 14)
  const week3 = masterArray.slice(14, 21)
  const week4 = masterArray.slice(21, 28)
  const week5 = masterArray.slice(28, 35)
  const week6 = masterArray.slice(35)

  return (
    <ScrollView>
      <View style={style.eachWeek}>
        <WeeklyView data={week1} />
      </View>

      <View style={style.eachWeek}>
        <WeeklyView data={week2} />
      </View>

      <View style={style.eachWeek}>
        <WeeklyView data={week3} />
      </View>

      <View style={style.eachWeek}>
        <WeeklyView data={week4} />
      </View>

      <View style={style.eachWeek}>
        <WeeklyView data={week5} />
      </View>

      <View style={style.eachWeek}>
        <WeeklyView data={week6} />
      </View>

    </ScrollView>
  )
}

export default CalendarData

const style = StyleSheet.create({
  weekContainer: {
    flex: 1,
  },
  eachWeek: {
    // borderWidth: 1,
    // borderColor: allColors.lightGray
  }
})