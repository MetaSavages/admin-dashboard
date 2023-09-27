import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { Grid, useTheme } from '@mui/material';

import { useMaterialUIController } from 'context';
import { getDepositData } from 'services/deposits';
import MDBox from 'components/MDBox';
import { DateTimePicker } from '@mui/x-date-pickers';
import { pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const TradingViewChart = ({ from, handleFromChange, to, handleToChange, dataInfo }) => {
  const chartContainer = useRef(null);
  const [data, setData] = useState(dataInfo);
  const theme = useTheme();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(() => {
    setData(dataInfo);
  }, [dataInfo]);

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
      borderRadius: '17px'
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
    <MDBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={3.5}>
            <MDBox sx={{ width: '150px' }}>
              <DateTimePicker
                label='From'
                ampmInClock={false}
                closeOnSelect={true}
                ampm={false}
                showDaysOutsideCurrentMonth
                value={from}
                viewRenderers={{
                  hours: null,
                  minutes: null,
                  seconds: null
                }}
                onChange={handleFromChange}
                slotProps={{
                  layout: {
                    sx: {
                      [`.${pickersLayoutClasses.actionBar}`]: {
                        display: 'none'
                      }
                    }
                  }
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={5} md={3.5}>
            <MDBox sx={{ width: '150px' }}>
              <DateTimePicker
                label='To'
                ampmInClock={false}
                ampm={false}
                showDaysOutsideCurrentMonth
                value={to}
                viewRenderers={{
                  hours: null,
                  minutes: null,
                  seconds: null
                }}
                onChange={handleToChange}
                slotProps={{
                  layout: {
                    sx: {
                      [`.${pickersLayoutClasses.actionBar}`]: {
                        display: 'none'
                      }
                    }
                  }
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </LocalizationProvider>
      <MDBox
        ref={chartContainer}
        style={{
          maxWidth: '100%',
          height: data.length > 0 ? '500px' : ''
        }}
      ></MDBox>
    </MDBox>
  );
};

export default TradingViewChart;
