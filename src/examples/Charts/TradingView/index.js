import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { Grid, useTheme } from '@mui/material';
import dayjs from 'dayjs';

import { useMaterialUIController } from 'context';
import { getDepositData } from 'services/deposits';
import MDBox from 'components/MDBox';
import { DateTimePicker } from '@mui/x-date-pickers';
import { pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const TradingViewChart = ({}) => {
  const chartContainer = useRef(null);
  const [data, setData] = useState([]);
  const theme = useTheme();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const today = new Date();

  // Create a new date object for before 1 week 
  const weekBefore = new Date();
  weekBefore.setDate(today.getDate() - 7);

  const [from, setFrom] = useState(dayjs(weekBefore));
  const [to, setTo] = useState(dayjs(today));

  useEffect(() => {
    
    getDepositData(from, to, 'SUCCESSFUL', 'day')
      .then((result) => {
        if (result.data.length > 0) { 
          setData(result.data);
        }
      })
      .catch((err) => console.error(err));
  }, [from, to]);
  
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

  const handleFromChange = (date) => {
    if (to) {
      if (date > to) {
        setFrom(to);
        setTo(date);
      }
    } else {
      setFrom(date);
    }
  };
  const handleToChange = (date) => {
    if (from) {
      if (date < from) {
        setFrom(date);
        setTo(from);
      }
    } else {
      setTo(date);
    }
  };
  console.log('from', from);
  console.log('to', to);
  return (
    <MDBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2.5}>
            <MDBox>
              <DateTimePicker
                label='From'
                ampmInClock={false}
                ampm={false}
                showDaysOutsideCurrentMonth
                format='DD/MM/YYYY hh:mm'
                value={from}
                // value={''}
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
          <Grid item xs={12} sm={4} md={2.5}>
            <MDBox>
              <DateTimePicker
                label='To'
                ampmInClock={false}
                ampm={false}
                showDaysOutsideCurrentMonth
                format='DD/MM/YYYY hh:mm'
                value={to}
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
