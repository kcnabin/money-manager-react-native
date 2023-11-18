import { useSelector } from "react-redux";

import CalendarData from "./CalendarData";

const AllDays = ({ dayArray }) => {
  const selectedMonth = useSelector(state => state.selectedMonth)

  const daysToInsertBefore =
    new Date(`${selectedMonth.year}-${selectedMonth.month}-1`).getDay();

  const daysToInsertAfter = 42 - daysToInsertBefore - dayArray.length

  let masterArray = []

  for (let i = 0; i < daysToInsertBefore; i++) {
    masterArray.push({
      day: -1
    })
  }

  dayArray.forEach((transaction, index) => masterArray.push({
    transaction,
    day: index + 1
  }))

  for (let j = 0; j < daysToInsertAfter; j++) {
    masterArray.push({
      day: -1
    })
  }

  return (
    <CalendarData masterArray={masterArray} />
  )
}

export default AllDays