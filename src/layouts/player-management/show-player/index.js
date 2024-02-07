import { Card, useTheme, useMediaQuery } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import SCT from 'examples/CustomTypography/SCT';
import { Can } from 'context';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useEffect, useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { getGameMetricsByPlayer, getPlayer } from 'services/players';
import { formatNumber, formatDuration } from 'layouts/player-management/helpers';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { GameType } from 'constants/games';
import { MetricsType } from 'constants/metricsType';
import MDButton from 'components/MDButton';
import EventHistory from 'layouts/event_history';

function ShowPlayer() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [buttonState, setButtonState] = useState('details');

  useEffect(() => {
    let params = {};
    if (searchParams.get('isDemo')) {
      params.isDemo = true;
    } else if (searchParams.get('isPromoCodeUser')) {
      params.isPromoCodeUser = true;
    }

    getPlayer(id, params)
      .then((res) => {
        if (res) {
          setUser(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getUserGamesMetrics();
  }, []);

  const [gamesWins, setGameWins] = useState({
    slots: null,
    roulette: null,
    blackjack: null,
    baccarat: null,
    crash: null,
    jetpack: null
  });

  const [gamesLose, setGameLose] = useState({
    slots: null,
    roulette: null,
    blackjack: null,
    baccarat: null,
    crash: null,
    jetpack: null
  });

  function getUserGamesMetrics() {
    let todayTate = new Date();
    todayTate.setHours(0, 0, 0, 0);
    todayTate = todayTate.toJSON();

    let dateTomorrow = new Date();
    dateTomorrow.setHours(24, 0, 0, 0);
    dateTomorrow = dateTomorrow.toJSON();

    getGameMetricsByPlayer(id, todayTate, dateTomorrow, null, MetricsType.GameWin).then((res) => {
      if (res.length > 0) {
        const newState = {
          slots: null,
          roulette: null,
          blackjack: null,
          baccarat: null,
          crash: null,
          jetpack: null
        };
        res.forEach((item) => {
          const key = item.game_type.toLowerCase();
          if (newState.hasOwnProperty(key)) {
            newState[key] = item.amount;
          }
        });
        setGameWins(newState);
      }
    });

    getGameMetricsByPlayer(id, todayTate, dateTomorrow, null, MetricsType.GameLose).then((res) => {
      if (res.length > 0) {
        const newState = {
          slots: null,
          roulette: null,
          blackjack: null,
          baccarat: null,
          crash: null,
          jetpack: null
        };
        res.forEach((item) => {
          const key = item.game_type.toLowerCase();
          if (newState.hasOwnProperty(key)) {
            newState[key] = item.amount;
          }
        });
        setGameLose(newState);
      }
    });
  }

  function typeUser() {
    if (!user) {
      return '';
    }

    if (user.u_isDemo) {
      return (
        <TableRow>
          <TableCell>
            <SCT>Demo User:</SCT>
          </TableCell>
          <TableCell>
            <SCT>True</SCT>
          </TableCell>
        </TableRow>
      );
    } else if (user.u_isPromoCodeUser) {
      <TableRow>
        <TableCell>
          <SCT>Promo Code User:</SCT>
        </TableCell>
        <TableCell>
          <SCT>True</SCT>
        </TableCell>
      </TableRow>;
    } else {
      <TableRow>
        <TableCell>
          <SCT>Real User:</SCT>
        </TableCell>
        <TableCell>
          <SCT>True</SCT>
        </TableCell>
      </TableRow>;
    }
  }

  function detailInformation() {
    return (
      <Card
        sx={{
          borderRadius: '12px',
          boxShadow: (theme) => theme.shadows[4],
          width: {
            xs: '90%',
            lg: '70%',
            xl: '50%'
          },
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TableContainer>
          <MDTypography sx={{ margin: '15px' }}>
            {user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : 'User'}'s Details
          </MDTypography>
          <Table>
            <TableBody>
              {typeUser()}
              <TableRow>
                <TableCell>
                  <SCT>Nickname:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{user.u_nickname ? user.u_nickname : 'Did not fetch nickname'}</SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Id:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{user.u_id ? user.u_id : 'Did not fetch ID'}</SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Wallet ID:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{user.u_walletId ? user.u_walletId : 'Did not fetch walletID'}</SCT>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <SCT>First Name:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {user.u_firstName !== undefined
                      ? user.u_firstName !== null
                        ? user.u_firstName
                        : 'User does not have first name!'
                      : 'Did not fetch first name'}
                  </SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Last Name:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {user.u_lastName !== undefined
                      ? user.u_lastName !== null
                        ? user.u_lastName
                        : 'User does not have last name!'
                      : 'Did not fetch last name'}
                  </SCT>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <SCT>Email:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {user.u_email !== undefined
                      ? user.u_email !== null
                        ? user.u_email
                        : 'User does not have an email!'
                      : 'Did not fetch email'}
                  </SCT>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <SCT>Location:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{user.u_lastLocation ? user.u_lastLocation : 'Did not fetch location'}</SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>KYC:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{user.u_kycState ? user.u_kycState : 'Did not fetch KYC status'}</SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Current Balance:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {user.current_balance ? formatNumber(user.current_balance) : 'Did not fetch current balance'}
                  </SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Money Cashed Out:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {user.money_cashed_out ? formatNumber(user.money_cashed_out) : 'Did not fetch money cashed out'}
                  </SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Money Spent:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{user.money_spent ? formatNumber(user.money_spent) : 'Did not fetch money spent'}</SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Starting Balance:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {user.starting_balance ? formatNumber(user.starting_balance) : 'Did not fetch starting balance'}
                  </SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Time Spent:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{user.time_spent ? formatDuration(user.time_spent) : 'Did not fetch time spent'}</SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Baccarat Win:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {gamesWins.baccarat !== null ? formatNumber(gamesWins.baccarat) : 'Did not fetch baccarat win'}
                  </SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Baccarat Lose:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {gamesLose.baccarat !== null ? formatNumber(gamesLose.baccarat) : 'Did not fetch baccarat lose'}
                  </SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Blackjack Win:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {gamesWins.blackjack !== null ? formatNumber(gamesWins.blackjack) : 'Did not fetch blackjack win'}
                  </SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Blackjack Lose:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {gamesLose.blackjack !== null ? formatNumber(gamesLose.blackjack) : 'Did not fetch blackjack lose'}
                  </SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Roulette Win:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {gamesWins.roulette !== null ? formatNumber(gamesWins.roulette) : 'Did not fetch roulette win'}
                  </SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Roulette Lose:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>
                    {gamesLose.roulette !== null ? formatNumber(gamesLose.roulette) : 'Did not fetch roulette lose'}
                  </SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Crash Win:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{gamesWins.crash !== null ? formatNumber(gamesWins.crash) : 'Did not fetch crash win'}</SCT>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <SCT>Crash Lose:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{gamesLose.crash !== null ? formatNumber(gamesLose.crash) : 'Did not fetch crash lose'}</SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Slots Win:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{gamesWins.slots !== null ? formatNumber(gamesWins.slots) : 'Did not fetch slots win'}</SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Slots Lose:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{gamesLose.slots !== null ? formatNumber(gamesLose.slots) : 'Did not fetch slots lose'}</SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Jetpack Win:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{gamesWins.jetpack !== null ? formatNumber(gamesWins.jetpack) : 'Did not fetch slots win'}</SCT>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SCT>Jetpack Lose:</SCT>
                </TableCell>
                <TableCell>
                  <SCT>{gamesLose.jetpack !== null ? formatNumber(gamesLose.jetpack) : 'Did not fetch slots lose'}</SCT>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    );
  }

  return (
    <>
      <Can I='read' a='player'>
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox display='flex' flexDirection='column' width='100%' marginTop='3%'>
            <MDBox>
              <MDButton
                color='info'
                variant={buttonState == 'details' ? 'contained' : 'outlined'}
                onClick={() => setButtonState('details')}
              >
                Player details
              </MDButton>

              <MDButton
                color='info'
                variant={buttonState == 'events' ? 'contained' : 'outlined'}
                sx={{ marginLeft: '20px' }}
                onClick={() => setButtonState('events')}
              >
                {' '}
                Player events
              </MDButton>
            </MDBox>
            <MDBox display='flex' justifyContent='center' width='100%' marginTop='3%'>
              {buttonState == 'details' ? (
                <MDBox display='flex' justifyContent='center' width='100%'>
                  {detailInformation()}
                </MDBox>
              ) : (
                <MDBox display='flex' justifyContent={isMediumScreen ? 'start' : 'center'} width='100%'>
                  <EventHistory withoutLayout={true} onlyForSpecificUser={true} />
                </MDBox>
              )}
            </MDBox>
          </MDBox>
        </DashboardLayout>
      </Can>
      <Can not I='read' a='player'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default ShowPlayer;
