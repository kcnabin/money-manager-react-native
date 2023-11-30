import { useSelector } from "react-redux";

import CalendarData from "./CalendarData";

const AllDays = ({ dayArray }) => {
  const selectedMonth = useSelector(state => state.selectedMonth)

  let masterArray = []

  const totalDays = new Date(
    `${selectedMonth.year}`,
    `${selectedMonth.month}`,
    0
  ).getDate();

  const actualMonthlyData = dayArray.slice(0, totalDays)

  const daysToInsertBefore =
    new Date(`${selectedMonth.year}-${selectedMonth.month}-1`).getDay();

  const daysToInsertAfter = 42 - daysToInsertBefore - totalDays

  for (let i = 0; i < daysToInsertBefore; i++) {
    masterArray.push({
      day: -1
    })
  }

  actualMonthlyData.forEach((transaction, index) => masterArray.push({
    transaction,
    day: index + 1
  }))

  for (let j = 0; j < daysToInsertAfter; j++) {
    masterArray.push({
      day: -1
    })
  }

  if (masterArray.length === 0) {
    return ''
  }

  return (
    <CalendarData masterArray={masterArray} />
  )
}

export default AllDays