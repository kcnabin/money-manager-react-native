import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getShortMonthName } from "../../../helper/dateHelper";

const screenWidth = Dimensions.get("window").width;

const DisplayLineChart = ({ data }) => {
  const monthlyTotalArray = data.map((eachMonth) => eachMonth.total);
  const monthLabel = data.map((eachMonth) => getShortMonthName(eachMonth.date));

  const lineData = {
    labels: monthLabel,
    datasets: [
      {
        data: monthlyTotalArray,
        color: (opacity = 0.7) => `rgba(255, 255, 255, ${opacity})`,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 0.7) => `rgba(0, 0, 0, ${opacity})`,
  };

  if (data.length === 0) {
    return <Text>Loading data...</Text>;
  }

  return (
    <LineChart
      data={lineData}
      width={screenWidth}
      height={220}
      chartConfig={chartConfig}
      renderDotContent={({ x, y, indexData }) => {
        if (indexData !== 0) {
          return (
            <View
              style={{
                position: "absolute",
                top: y - 20,
                left: x - 4,
              }}
              key={indexData + x + y}
            >
              <Text style={{ fontSize: 14 }}>{indexData}</Text>
            </View>
          );
        }
      }}
    />
  );
};

export default DisplayLineChart;
