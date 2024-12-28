import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (historicalData.prices) {
      historicalData.prices.forEach((item) => {
        const date = new Date(item[0]);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`; // Format to "DD/MM"
        dataCopy.push([formattedDate, item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType='LineChart'
      data={data}
      height="100%"
      legendToggle
    />
  );
};

export default LineChart;
