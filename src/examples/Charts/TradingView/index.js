import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { useTheme } from '@mui/material';

import { useMaterialUIController } from 'context';
import { getDepositData } from 'services/deposits';

const TradingViewChart = ({ days }) => {
  const chartContainer = useRef(null);
  const [data, setData] = useState([]);
  const theme = useTheme();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(() => {
    
    setData([
      { time: '2019-04-11', value: 80.01 },
      { time: '2019-04-12', value: 96.63 },
      { time: '2019-04-13', value: 76.64 },
      { time: '2019-04-14', value: 81.89 },
      { time: '2019-04-15', value: 74.43 },
      { time: '2019-04-16', value: 80.01 },
      { time: '2019-04-17', value: 96.63 }, 
      { time: '2019-04-18', value: 76.64 },
      { time: '2019-04-19', value: 81.89 },
      { time: '2019-04-20', value: 74.43 }
    ]);
    getDepositData('2023-09-01', '2023-09-09', 'SUCCESSFUL', 'day')
      .then((result) => {
        if(result.length > 0 ){

          setData(result)
        }
        // if (result?.prices?.length > 0) {
        //   let allData = [];
        //   result.prices.forEach((el) => {
        //     allData.push({ time: el[0] / 1000, value: el[1] });
        //   });
        //   setData(allData);
        // }
      })
      .catch((err) => console.error(err));
  }, [days]);
  const backgroundValue = darkMode ? theme.palette.background.card : theme.palette.white.main;
  const colorText = darkMode ? '#ffffff' : '#344767';

  useEffect(() => {
    const chartOptions = {
      layout: {
        background: {
          type: 'solid',
          color: backgroundValue
        },
        textColor: colorText
      },
      width: chartContainer.current.offsetWidth,
      height: chartContainer.current.offsetHeight,
      borderRadius:'17px'

    };
    chartContainer.current.innerText = '';
    const chart = createChart(chartContainer.current, chartOptions);
    const baselineSeries = chart.addBaselineSeries({
      priceFormat: { type: 'price', precision: 4, minMove: 0.0001 },
      // baseValue: { type: 'value', price: data[0]?.value },
      topLineColor: 'rgba( 38, 166, 154, 1)',
      topFillColor1: 'rgba( 38, 166, 154, 0.28)',
      topFillColor2: 'rgba( 38, 166, 154, 0.05)',
      bottomLineColor: 'rgba( 239, 83, 80, 1)',
      bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba( 239, 83, 80, 0.28)'
    });

    baselineSeries.setData(data);
    chart.timeScale().fitContent();
    window.onresize = function () {
      chart.resize(chartContainer.current.offsetWidth, chartContainer.current.offsetHeight);
      // chart.getVisibleRange();
    };
  }, [darkMode, data]);

  return (
    <div
      ref={chartContainer}
      style={{
        maxWidth: '100%',
        height: data.length > 0 ?'500px': ''
      }}
    />
  );
};

export default TradingViewChart;
