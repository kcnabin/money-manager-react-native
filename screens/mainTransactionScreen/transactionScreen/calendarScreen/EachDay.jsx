import { View, Text, StyleSheet, Pressable } from "react-native"
import { allColors } from "../../../../Colors"

const EachDay = ({ day }) => {
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

  if (date !== -1) {

    return (
      <Pressable style={style.dayContainer} android_ripple={{ color: allColors.lightGray }}>
        <View>
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
  }
})
