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
import rouletteImg from 'assets/images/casino.png';
import blackjackImg from 'assets/images/blackjack.jpg';
import crashImg from 'assets/images/crash.jpg';
import baccaratImg from 'assets/images/baccarat.jpeg';
import slotsImg from 'assets/images/slots.jpg';
import InfoCard from './components/InfoCard';
import CasinoCard from './components/CasinoCard';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';
import DataTable from 'components/DataTablePage/components/DataTable';
import VerticalBarChart from 'examples/Charts/BarCharts/VerticalBarChart';
import MultiLayerPieChart from 'examples/Charts/MultiLayerPieChart';
import DoubleInfoCard from './components/DoubleInfoCard';
import {
  getTodayNumbers,
  getGameStats,
  getNewRegistrations,
  getGameSessions,
  trackSuccessfulLogins,
  getTodayAmount
} from 'services/analytics';
import { useEffect, useRef, useState } from 'react';
import { Card, Skeleton } from '@mui/material';
import HorizontalBarChart from 'examples/Charts/BarCharts/HorizontalBarChart';
import { useMaterialUIController } from 'context';
import Slider from 'react-slick';
import styled from '@emotion/styled';
import { GameType } from 'constants/games';

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [gameWin, setGameWin] = useState('');
  const [gameLose, setGameLose] = useState('');
  const [gameBet, setGameBet] = useState('');
  const [registrationStart, setRegistrationStart] = useState('');
  const [allBets, setGameWins] = useState([]);
  const [gameLoses, setGameLoses] = useState([]);
  const [correctMonths, setCorrectMonths] = useState([]);
  const [newRegistrations, setNewRegistrations] = useState([]);
  const [gameSessions, setGameSessions] = useState([]);
  const [successfulLogins, setSuccessfulLogins] = useState([]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [baccarat, setBaccarat] = useState({
    sessionStart: '',
    allBets: 0,
    gameWinsAmount: 0,
    gameLoseAmount: 0
  });
  const [blackjack, setBlackjack] = useState({
    sessionStart: '',
    allBets: 0,
    gameWinsAmount: 0,
    gameLoseAmount: 0
  });
  const [slots, setSlots] = useState({
    allBets: 0,
    gameWinsAmount: 0,
    gameLoseAmount: 0
  });
  const [roulette, setRoulette] = useState({
    allBets: 0,
    gameWinsAmount: 0,
    gameLoseAmount: 0
  });
  const [crash, setCrash] = useState({
    allBets: 0,
    gameWinsAmount: 0,
    gameLoseAmount: 0
  });

  const gameData = {
    labels: correctMonths,
    datasets: [
      {
        label: 'Wins',
        data: allBets,
        color: 'info'
      },
      {
        label: 'Loses',
        data: gameLoses
      }
    ]
  };
  const sliderRef = useRef(null);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  useEffect(() => {
    if (sliderRef?.current) {
      sliderRef.current.slickPlay();
    }
  }, [sliderRef.current]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000
  };

  const CustomSlider = styled(Slider)(() => {
    return {
      '& .slick-arrow': {
        background: `${darkMode ? 'transparent' : '#f5eded'}`,
        '&::before': {
          color: `${darkMode ? '#f0f2f5' : '#261563'}`
        }
      }
    };
  });

  const registrationsData = {
    labels: correctMonths,
    datasets: [
      {
        label: 'Registrations',
        data: newRegistrations,
        color: 'info'
      }
    ]
  };

  const sessionsData = {
    labels: ['Roulette', 'Blackjack', 'Baccarat'],
    datasets: [
      {
        label: 'Sessions',
        data: gameSessions,
        color: 'info'
      }
    ]
  };

  useEffect(() => {
    getGameStats('game_win').then((res) => {
      let wins = res.map((m) => {
        m[0] === 12
          ? setCorrectMonths((prev) => [...prev, months[0]])
          : setCorrectMonths((prev) => [...prev, months[m[0]]]);
        return m[1];
      });
      setGameWins(wins);
    });

    getGameStats('game_lose').then((res) => {
      let loses = res.map((m) => {
        return m[1];
      });
      setGameLoses(loses);
    });
  }, []);

  useEffect(() => {
    getNewRegistrations().then((res) => {
      let registrations = res.map((m) => {
        return m.count;
      });
      setNewRegistrations(registrations);
    });
  }, []);

  useEffect(() => {
    getGameSessions().then((res) => setGameSessions(res));
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
    getBaccaratDetails();
    getBlackjackDetails();
    getSlotsDetails();
    getRouletteDetails();
    getCrashDetails();
    trackSuccessfulLogins().then((res) => setSuccessfulLogins(res));
  }, []);

  function getBlackjackDetails() {
    const gameType = GameType.Blackjack;
    Promise.all([
      getTodayNumbers('game_bet', gameType),
      getTodayAmount('game_win', gameType),
      getTodayAmount('game_lose', gameType),
      getTodayNumbers('blackjack_session_start')
    ])
      .then((results) => {
        const [gameWinResult, gameWinsAmount, gameLosesAmount, sessionStart] = results;
        setBlackjack({
          sessionStart: sessionStart,
          allBets: gameWinResult,
          gameWinsAmount: gameWinsAmount,
          gameLoseAmount: gameLosesAmount
        });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  function getBaccaratDetails() {
    const gameType = GameType.Baccarat;
    Promise.all([
      getTodayNumbers('game_bet', gameType),
      getTodayAmount('game_win', gameType),
      getTodayAmount('game_lose', gameType),
      getTodayNumbers('baccarat_session_start')
    ])
      .then((results) => {
        const [gameWinResult, gameWinsAmount, gameLosesAmount, sessionStart] = results;
        setBaccarat({
          sessionStart: sessionStart,
          allBets: gameWinResult,
          gameWinsAmount: gameWinsAmount,
          gameLoseAmount: gameLosesAmount
        });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  function getSlotsDetails() {
    const gameType = GameType.Slots;
    Promise.all([
      getTodayNumbers('game_bet', gameType),
      getTodayAmount('game_win', gameType),
      getTodayAmount('game_lose', gameType)
    ])
      .then((results) => {
        const [gameWinResult, gameWinsAmount, gameLosesAmount] = results;
        setSlots({
          allBets: gameWinResult,
          gameWinsAmount: gameWinsAmount,
          gameLoseAmount: gameLosesAmount
        });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  function getRouletteDetails() {
    const gameType = GameType.Roulette;
    Promise.all([
      getTodayNumbers('game_bet', gameType),
      getTodayAmount('game_win', gameType),
      getTodayAmount('game_lose', gameType)
    ])
      .then((results) => {
        const [gameWinResult, gameWinsAmount, gameLosesAmount] = results;
        setRoulette({
          allBets: gameWinResult,
          gameWinsAmount: gameWinsAmount,
          gameLoseAmount: gameLosesAmount
        });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  function getCrashDetails() {
    const gameType = GameType.Crash;
    Promise.all([
      getTodayNumbers('game_bet', gameType),
      getTodayAmount('game_win', gameType),
      getTodayAmount('game_lose', gameType)
    ])
      .then((results) => {
        const [gameWinResult, gameWinsAmount, gameLosesAmount] = results;
        setCrash({
          allBets: gameWinResult,
          gameWinsAmount: gameWinsAmount,
          gameLoseAmount: gameLosesAmount
        });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

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
              <InfoCard color='info' icon='trending_up' title='Total game wins' description={`${gameWin}`} />
            </Grid>
            <Grid item xs={2}>
              <InfoCard color='info' icon='trending_up' title='Total game loses' description={`${gameLose}`} />
            </Grid>
            <Grid item xs={2}>
              <InfoCard color='info' icon='trending_up' title='Total game bets' description={`${gameBet}`} />
            </Grid>
            <Grid item xs={2}>
              <InfoCard
                color='info'
                icon='trending_up'
                title='Total registrations'
                description={`${registrationStart}`}
              />
            </Grid>
            <Grid item xs={2}>
              <InfoCard
                color='info'
                icon='trending_up'
                title='Total baccarat sessions'
                description={baccarat.sessionStart}
              />
            </Grid>
            <Grid item xs={2}>
              <InfoCard
                color='info'
                icon='trending_up'
                title='Total blackjack sessions'
                description={blackjack.sessionStart}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={5}>
          <Grid container spacing={3} direction='row' justify='center' alignItems='stretch'>
            <Grid item xs={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {allBets.length > 0 ? (
                    <GradientLineChart
                      title='Game Wins vs. Losses ($)'
                      description='Monthly performance'
                      chart={gameData}
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
                  <HorizontalBarChart title='Game sessions' description='24 Hours performance' chart={sessionsData} />
                </Grid>
                <Grid item xs={12}>
                  {newRegistrations.length > 0 ? (
                    <VerticalBarChart
                      title='Registrations'
                      description='Monthly performance'
                      chart={registrationsData}
                    />
                  ) : (
                    <Skeleton height={400} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} mt={3} className='aaaaaaaaaaaaaaaaaa'>
                  <Card sx={{ padding: '30px', marginBottom: '20px' }}>
                    <CustomSlider {...settings}>
                      <div>
                        <CasinoCard
                          title='Blackjack'
                          description='Last campaign performance'
                          image={blackjackImg}
                          action={{
                            type: 'internal',
                            route: '/somewhere',
                            color: 'info',
                            label: 'Go Somewhere'
                          }}
                          allBets={blackjack.allBets}
                          gameWinsAmount={blackjack.gameWinsAmount}
                          gameLoseAmount={blackjack.gameLoseAmount}
                        />
                      </div>
                      <div>
                        <CasinoCard
                          title='Baccarat'
                          description='Last campaign performance'
                          image={baccaratImg}
                          action={{
                            type: 'internal',
                            route: '/somewhere',
                            color: 'info',
                            label: 'Go Somewhere'
                          }}
                          allBets={baccarat.allBets}
                          gameWinsAmount={baccarat.gameWinsAmount}
                          gameLoseAmount={baccarat.gameLoseAmount}
                        />
                      </div>

                      <div>
                        <CasinoCard
                          title='Roulette'
                          description='Last campaign performance'
                          image={rouletteImg}
                          action={{
                            type: 'internal',
                            route: '/somewhere',
                            color: 'info',
                            label: 'Go Somewhere'
                          }}
                          allBets={roulette.allBets}
                          gameWinsAmount={roulette.gameWinsAmount}
                          gameLoseAmount={roulette.gameLoseAmount}
                        />
                      </div>
                      <div>
                        <CasinoCard
                          title='Slots'
                          description='Last campaign performance'
                          image={slotsImg}
                          action={{
                            type: 'internal',
                            route: '/somewhere',
                            color: 'info',
                            label: 'Go Somewhere'
                          }}
                          allBets={slots.allBets}
                          gameWinsAmount={slots.gameWinsAmount}
                          gameLoseAmount={slots.gameLoseAmount}
                        />
                      </div>
                      <div>
                        <CasinoCard
                          title='Crash'
                          description='Last campaign performance'
                          image={crashImg}
                          action={{
                            type: 'internal',
                            route: '/somewhere',
                            color: 'info',
                            label: 'Go Somewhere'
                          }}
                          allBets={crash.allBets}
                          gameWinsAmount={crash.gameWinsAmount}
                          gameLoseAmount={crash.gameLoseAmount}
                        />
                      </div>
                    </CustomSlider>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <DoubleInfoCard title1='$560K' cap1='Total sales' title2='$300K' cap2='Total profit' />
                </Grid>
                <Grid item xs={12}>
                  <TimelineList title='Login Tracker'>
                    {successfulLogins.map((login, i, { length }) => {
                      let title = `Successful Login [ ${login.username} ]`;
                      let date = `${login.date}`;
                      if (i === length - 1) {
                        return <TimelineItem icon='login' color='success' title={title} dateTime={date} lastItem />;
                      }
                      return <TimelineItem icon='login' color='success' title={title} dateTime={date} />;
                    })}
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
