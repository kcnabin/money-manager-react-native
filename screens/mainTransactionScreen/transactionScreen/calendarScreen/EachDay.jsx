import { View, Text, StyleSheet, Pressable, Modal, Alert } from "react-native"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { fetchSingleDayTransactionsFromDb } from "../../../../util/database"
import EachDayTransaction from '../dayScreen/EachDayTransaction'

import { allColors } from "../../../../Colors"
import MyButton from "../../../../components/MyButton"

const EachDay = ({ day }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [allTransactionsForADay, setAllTransactionsForADay] = useState([])

  const selectedMonth = useSelector(state => state.selectedMonth)
  const { day: date, transaction } = day

  let totalIncome = 0
  let totalExpenses = 0

  if (transaction) {
    totalIncome = transaction
      .filter(eachTransaction => eachTransaction.type === 'income')
      .reduce((sum, eachTx) => sum + eachTx.amount, 0);

    totalExpenses = transaction
      .filter(eachTransaction => eachTransaction.type === 'expenses')
      .reduce((sum, eachTx) => sum + eachTx.amount, 0);
  }

  const handleDayPress = (dayOfTheMonth) => {
    const dateObject = { ...selectedMonth, day: dayOfTheMonth }
    setSelectedDate(() => dateObject)
    setModalVisible(true)
  }

  useEffect(() => {
    const getSingleDayTransactions = async () => {
      try {
        const singleDayIncome = await fetchSingleDayTransactionsFromDb(selectedDate, 'income')
        const singleDayExpenses = await fetchSingleDayTransactionsFromDb(selectedDate, 'expenses')
        setAllTransactionsForADay([...singleDayIncome, ...singleDayExpenses])
      } catch (error) {
        Alert.alert(`Error fetching transactions... `)
        console.log(error)
      }
    }

    if (modalVisible && selectedDate) {
      getSingleDayTransactions()
    }
  }, [modalVisible, selectedDate])

  if (date !== -1) {

    return (
      <Pressable
        onPress={() => handleDayPress(date)}
        style={style.dayContainer}
        android_ripple={{ color: allColors.lightGray }}
      >
        <View >
          <View style={style.dateContainer}>
            <Text style={style.dateText}>
              {date}
            </Text>
          </View>

          <View style={style.amountContainer}>

            <View >
              <Text style={[style.incomeText, style.textCommon]}>
                {totalIncome === 0 ? '' : totalIncome}
              </Text>
            </View>

            <View>
              <Text style={[style.expensesText, style.textCommon]}>
                {totalExpenses === 0 ? '' : totalExpenses}
              </Text>
            </View>

            <View>
              <Text style={[style.differenceText, style.textCommon]}>
                {(totalExpenses === 0 || totalIncome === 0) ? '' : totalIncome - totalExpenses}
              </Text>
            </View>

          </View>

        </View>

        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={style.modalContainer}>
            <View style={style.selectedDay}>
              {
                allTransactionsForADay.length > 0 && (
                  <EachDayTransaction transactions={allTransactionsForADay} />
                )
              }

              {allTransactionsForADay.length === 0 && (
                <Text style={style.noTransactionInfo}>
                  {`No Transaction for ${selectedMonth.year}-${selectedMonth.month}-${date}`}
                </Text>
              )}

              <View style={style.closeButtomContainer}>
                <MyButton title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>


          </View>
        </Modal>

      </Pressable>
    )
  }

  return (
    <View style={style.dayContainer}>

    </View>
  )
}

export default EachDay

const style = StyleSheet.create({
  dayContainer: {
    flex: 1,
    borderRightColor: allColors.lightGray,
    borderBottomColor: allColors.lightGray,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 6,
    minHeight: 80
  },
  dateContainer: {
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
  },
  amountContainer: {
    gap: 5,
    flex: 1,
  },
  incomeText: {
    color: allColors.incomeColor
  },
  expensesText: {
    color: allColors.expensesColor
  },
  textCommon: {
    textAlign: 'right',
    fontSize: 12
  },
  modalContainer: {
    height: '60%',
    marginTop: 'auto',
    backgroundColor: 'white',
  },
  selectedDay: {
    flex: 1,
    borderTopColor: allColors.lightGray,
    borderTopWidth: 4,
    justifyContent: 'space-between'
  },
  closeButtomContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 16
  },
  noTransactionInfo: {
    padding: 12,
    fontSize: 18,
    textAlign: 'center'
  }
})
