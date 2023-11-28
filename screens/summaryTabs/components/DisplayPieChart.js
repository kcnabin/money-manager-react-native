import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const DisplayPieChart = ({ data }) => {
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  return (
    <PieChart
      data={data}
      width={Dimensions.get("window").width * 2}
      height={250}
      chartConfig={chartConfig}
      accessor={"total"}
      backgroundColor={"transparent"}
      paddingLeft={"10"}
      center={[-15, 0]}
      hasLegend={false}
      // absolute
    />
  );
};

export default DisplayPieChart;
