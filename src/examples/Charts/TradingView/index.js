import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { Card, Grid, useTheme } from '@mui/material';

import { useMaterialUIController } from 'context';
import { getDepositData } from 'services/deposits';
import MDBox from 'components/MDBox';
import { DateTimePicker } from '@mui/x-date-pickers';
import { pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

const TradingViewChart = ({ from, handleFromChange, to, handleToChange, dataInfo, submitDepositData }) => {
  const chartContainer = useRef(null);
  const [data, setData] = useState(dataInfo);
  const theme = useTheme();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(() => {
    setData(dataInfo);
  }, [dataInfo]);

  const backgroundValue = darkMode ? theme.palette.background.card : theme.palette.white.main;
  const colorText = darkMode ? 'rgb(210 218 209 )' : '#344767';

  useEffect(() => {
    const chartOptions = {
      layout: {
        background: {
          type: 'solid',
          color: backgroundValue
        },
        textColor: colorText
      },
      grid: {
        vertLines: {
          color: darkMode ? 'rgb(210 218 209 / 56%)' : '#344767'
        },
        horzLines: {
          color: darkMode ? 'rgb(210 218 209 / 56%)' : '#344767'
        }
      },
      width: chartContainer?.current?.offsetWidth ? chartContainer.current.offsetWidth : '100%',
      height: chartContainer?.current?.offsetHeight ? chartContainer.current.offsetHeight : '100%',
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
      chart.resize(
        chartContainer?.current?.offsetWidth ? chartContainer?.current.offsetWidth : '100%',
        chartContainer?.current?.offsetHeight ? chartContainer.current.offsetHeight : '100%'
      );
      // chart.getVisibleRange();
    };
  }, [darkMode, data]);

  return (
    <Card
      sx={{
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px'
      }}
    >
      <MDBox p={3} lineHeight={1} display='flex' justifyContent='space-between'>
        <MDTypography variant='h5' fontWeight='medium'>
          Deposit chart
        </MDTypography>
      </MDBox>
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

            <Grid item xs={12} sm={5} md={3.5}>
              <MDButton variant='text' color='gradient' onClick={submitDepositData}>
                Apply
              </MDButton>
            </Grid>
          </Grid>
        </LocalizationProvider>
        <MDBox
          sx={{
            maxWidth: '100%',
            height: '500px',
            display: data.length > 0 ? 'block' : 'none',
            marginTop: '20px',
            position: 'relative',
            '&::before': {
              'z-index': '10',
              background: 'black',
              content: '""',
              width: '1px',
              height: '94%',
              position: 'absolute',
              left: 0
            }
          }}
          ref={chartContainer}
        ></MDBox>
      </MDBox>
    </Card>
  );
};

export default TradingViewChart;
