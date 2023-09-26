/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 PRO React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'examples/Footer';
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import TimelineItem from 'examples/Timeline/TimelineItem';
import TimelineList from 'examples/Timeline/TimelineList';

import dataTablePlayersData from 'assets/mockData/dataTablePlayers';
// Data
import reportsBarChartData from 'layouts/player_activity/data/reportsBarChartData';
import reportsLineChartData from 'layouts/player_activity/data/reportsLineChartData';

// Images
import booking1 from 'assets/images/products/product-1-min.jpg';
import booking2 from 'assets/images/products/product-2-min.jpg';
import booking3 from 'assets/images/products/product-3-min.jpg';
import casino from 'assets/images/casino.png';
import InfoCard from './components/InfoCard';
import CasinoCard from './components/CasinoCard';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';
import DataTable from 'components/DataTablePage/components/DataTable';
import VerticalBarChart from 'examples/Charts/BarCharts/VerticalBarChart';
import MultiLayerPieChart from 'examples/Charts/MultiLayerPieChart';
import DoubleInfoCard from './components/DoubleInfoCard';
import { getTodayNumbers, getGameStats } from 'services/analytics';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [gameWin, setGameWin] = useState('');
  const [gameLose, setGameLose] = useState('');
  const [gameBet, setGameBet] = useState('');
  const [registrationStart, setRegistrationStart] = useState('');
  const [baccarat, setBaccarat] = useState('');
  const [blackjack, setBlackjack] = useState('');
  const [gameWins, setGameWins] = useState([]);
  const [gameLoses, setGameLoses] = useState([]);
  const [correctMonths, setCorrectMonths] = useState([]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const gradientData = {
    labels: correctMonths,
    datasets: [
      {
        label: 'Wins',
        data: gameWins,
        color: 'info'
      },
      {
        label: 'Loses',
        data: gameLoses
      }
    ]
  };

  useEffect(() => {
    getGameStats(8).then((res) => {
      let wins = res.map((m) => {
        (m[0] === 12) ? setCorrectMonths((prev) => [...prev, months[0]]) : setCorrectMonths((prev) => [...prev, months[m[0]]]);
        return m[1];
      });
      setGameWins(wins);
    });

    getGameStats(9).then((res) => {
      let loses = res.map((m) => {
        return m[1];
      });
      setGameLoses(loses);
    });
  }, []);

  const pieData = {
    labels: ['Red', 'Blue', 'Empty', 'Empty'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19],
        backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 0)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(0, 0, 0, 0)'],
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: [12, 19],
        backgroundColor: ['rgba(54, 162, 235, 0)', 'rgba(255, 99, 132, 0)'],
        borderColor: ['rgba(54, 162, 235, 0)', 'rgba(255, 99, 132, 0)'],
        borderWidth: 1,
        weight: 0.4
      },
      {
        label: '# of Votes',
        data: [5, 19],
        backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 0)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 0)'],
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: [12, 19],
        backgroundColor: ['rgba(54, 162, 235, 0)', 'rgba(255, 99, 132, 0)'],
        borderColor: ['rgba(54, 162, 235, 0)', 'rgba(255, 99, 132, 0)'],
        borderWidth: 1,
        weight: 5
      }
    ]
  };

  useEffect(() => {
    getTodayNumbers('game_win').then((res) => setGameWin(res));
    getTodayNumbers('game_lose').then((res) => setGameLose(res));
    getTodayNumbers('game_bet').then((res) => setGameBet(res));
    getTodayNumbers('registration_start').then((res) => setRegistrationStart(res));
    getTodayNumbers('baccarat_session_start').then((res) => setBaccarat(res));
    getTodayNumbers('blackjack_session_start').then((res) => setBlackjack(res));
  }, []);

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title='Refresh' placement='bottom'>
        <MDTypography variant='body1' color='primary' lineHeight={1} sx={{ cursor: 'pointer', mx: 3 }}>
          <Icon color='inherit'>refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title='Edit' placement='bottom'>
        <MDTypography variant='body1' color='info' lineHeight={1} sx={{ cursor: 'pointer', mx: 3 }}>
          <Icon color='inherit'>edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <MDTypography variant='h3' fontWeight='medium'>
            Today's numbers
          </MDTypography>
        </MDBox>
        <MDBox display='flex' justifyContent='space-between' alignItems='center'>
          <Grid container spacing={2} direction='row' justify='center' alignItems='stretch'>
            <Grid item xs={2}>
              <InfoCard color='info' icon='trending_up' title='Total game wins' description={gameWin} />
            </Grid>
            <Grid item xs={2}>
              <InfoCard color='info' icon='trending_up' title='Total game loses' description={gameLose} />
            </Grid>
            <Grid item xs={2}>
              <InfoCard color='info' icon='trending_up' title='Total game bets' description={gameBet} />
            </Grid>
            <Grid item xs={2}>
              <InfoCard
                color='info'
                icon='trending_up'
                title='Total registration starts'
                description={registrationStart}
              />
            </Grid>
            <Grid item xs={2}>
              <InfoCard color='info' icon='trending_up' title='Total baccarat sessions' description={baccarat} />
            </Grid>
            <Grid item xs={2}>
              <InfoCard color='info' icon='trending_up' title='Total blackjack sessions' description={blackjack} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={6}>
          <Grid container spacing={3} direction='row' justify='center' alignItems='stretch'>
            <Grid item xs={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {gameWins.length > 0 ? (
                    <GradientLineChart
                      title='Sales'
                      description='Last campaign performance'
                      chart={gradientData}
                      tension={0.5}
                    />
                  ) : (
                    <Skeleton height={400} />
                  )}
                </Grid>
                <Grid item xs={4}>
                  <MultiLayerPieChart title='Earnings' description='24 Hours performance' chart={pieData} />
                </Grid>
                <Grid item xs={8}>
                  {gameWins.length > 0 ? (
                    <VerticalBarChart title='Conversions' description='24 Hours performance' chart={gradientData} />
                  ) : (
                    <Skeleton height={400}/>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {/* <DataTable
                    table={dataTablePlayersData}
                    sx={{ height: '50%' }}
                    entriesPerPage={{ defaultValue: 5 }}
                    isSorted={false}
                  /> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} mt={3}>
                  <CasinoCard
                    title='Casino'
                    description='Last campaign performance'
                    image={casino}
                    action={{
                      type: 'internal',
                      route: '/somewhere',
                      color: 'info',
                      label: 'Go Somewhere'
                    }}
                  />
                </Grid>
                <Grid item xs={11} mt={3}>
                  <DoubleInfoCard title1='$560K' cap1='Total sales' title2='$300K' cap2='Total profit' />
                </Grid>
                <Grid item xs={12} mt={3}>
                  <TimelineList title='Activity Overview'>
                    <TimelineItem
                      color='success'
                      icon='notifications'
                      title='$2400 Design changes'
                      dateTime='22 DEC 7:20 PM'
                      description='People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.'
                      badges={['design']}
                    />
                    <TimelineItem
                      color='error'
                      icon='inventory_2'
                      title='New order #1832412'
                      dateTime='21 DEC 11 PM'
                      description='People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.'
                      badges={['order', '#1832412']}
                    />
                    <TimelineItem
                      icon='shopping_cart'
                      title='Server payments for April'
                      dateTime='21 DEC 9:34 PM'
                      description='People care about how you see the world, how you think, what motivates you, what you’re struggling with or afraid of.'
                      badges={['server', 'payments']}
                      lastItem
                    />
                  </TimelineList>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
