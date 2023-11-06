import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const DisplayPieChart = ({ data }) => {
  const chartConfig = {
    color: (opacity = 0.7) => `rgba(255,127,80, ${opacity})`,
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
