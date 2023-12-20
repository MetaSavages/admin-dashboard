import { Card } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import SCT from 'examples/CustomTypography/SCT';
import { Can } from 'context';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getGameMetricsByPlayer, getPlayer } from 'services/players';
import { formatNumber, formatDuration } from 'layouts/player-management/helpers';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { GameType } from 'constants/games';
import { MetricsType } from 'constants/metricsType';

function ShowPlayer() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    getPlayer(id)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getUserGamesMetrics();
  }, []);

  const [slotsWin, setSlotsWin] = useState(null);
  const [rouletteWin, setRouletteWin] = useState(null);
  const [blackjackWin, setBlackjackWin] = useState(null);
  const [baccaratWin, setBaccaratWin] = useState(null);
  const [crashWin, setCrashWin] = useState(null);

  const [slotsLose, setSlotsLose] = useState(null);
  const [rouletteLose, setRouletteLose] = useState(null);
  const [blackjackLose, setBlackjackLose] = useState(null);
  const [baccaratLose, setBaccaratLose] = useState(null);
  const [crashLose, setCrashLose] = useState(null);

  function getUserGamesMetrics() {
    let todayTate = new Date();
    todayTate.setHours(0, 0, 0, 0);
    todayTate = todayTate.toJSON();

    let dateTomorrow = new Date();
    dateTomorrow.setHours(24, 0, 0, 0);
    dateTomorrow = dateTomorrow.toJSON();
    getGameMetricsByPlayer(id, todayTate, dateTomorrow, GameType.Slots, MetricsType.GameWin).then((res) => {
      setSlotsWin(res.amount);
    });
    getGameMetricsByPlayer(id, todayTate, dateTomorrow, GameType.Roulette, MetricsType.GameWin).then((res) => {
      setRouletteWin(res.amount);
    });
    getGameMetricsByPlayer(id, todayTate, dateTomorrow, GameType.Blackjack, MetricsType.GameWin).then((res) => {
      setBlackjackWin(res.amount);
    });
    getGameMetricsByPlayer(id, todayTate, dateTomorrow, GameType.Baccarat, MetricsType.GameWin).then((res) => {
      setBaccaratWin(res.amount);
    });
    getGameMetricsByPlayer(id, todayTate, dateTomorrow, GameType.Crash, MetricsType.GameWin).then((res) => {
      setCrashWin(res.amount);
    });

    getGameMetricsByPlayer(id, todayTate, dateTomorrow, GameType.Slots, MetricsType.GameLose).then((res) => {
      setSlotsLose(res.amount);
    });
    getGameMetricsByPlayer(id, todayTate, dateTomorrow, GameType.Roulette, MetricsType.GameLose).then((res) => {
      setRouletteLose(res.amount);
    });
    getGameMetricsByPlayer(id, todayTate, dateTomorrow, GameType.Blackjack, MetricsType.GameLose).then((res) => {
      setBlackjackLose(res.amount);
    });
    getGameMetricsByPlayer(id, todayTate, dateTomorrow, GameType.Baccarat, MetricsType.GameLose).then((res) => {
      setBaccaratLose(res.amount);
    });
    getGameMetricsByPlayer(id, todayTate, dateTomorrow, GameType.Crash, MetricsType.GameLose).then((res) => {
      setCrashLose(res.amount);
    });
  }
  console.log('userrr', user);

  return (
    <>
      <Can I='read' a='player'>
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox display='flex' justifyContent='center' width='100%' marginTop='3%'>
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
                <Table>
                  <TableHead>
                    <TableCell>
                      <MDTypography>{user.u_nickname ? user.u_nickname : 'User'}'s Details</MDTypography>
                    </TableCell>
                  </TableHead>
                  <TableBody>
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
                          {user.money_cashed_out
                            ? formatNumber(user.money_cashed_out)
                            : 'Did not fetch money cashed out'}
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
                          {user.starting_balance
                            ? formatNumber(user.starting_balance)
                            : 'Did not fetch starting balance'}
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
                        <SCT>{baccaratWin !== null ? formatNumber(baccaratWin) : 'Did not fetch baccarat win'}</SCT>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SCT>Baccarat Lose:</SCT>
                      </TableCell>
                      <TableCell>
                        <SCT>{baccaratLose !== null ? formatNumber(baccaratLose) : 'Did not fetch baccarat lose'}</SCT>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SCT>Blackjack Win:</SCT>
                      </TableCell>
                      <TableCell>
                        <SCT>{blackjackWin !== null ? formatNumber(blackjackWin) : 'Did not fetch blackjack win'}</SCT>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SCT>Blackjack Lose:</SCT>
                      </TableCell>
                      <TableCell>
                        <SCT>
                          {blackjackLose !== null ? formatNumber(blackjackLose) : 'Did not fetch blackjack lose'}
                        </SCT>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SCT>Roulette Win:</SCT>
                      </TableCell>
                      <TableCell>
                        <SCT>{rouletteWin !== null ? formatNumber(rouletteWin) : 'Did not fetch roulette win'}</SCT>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SCT>Roulette Lose:</SCT>
                      </TableCell>
                      <TableCell>
                        <SCT>{rouletteLose !== null ? formatNumber(rouletteLose) : 'Did not fetch roulette lose'}</SCT>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SCT>Crash Win:</SCT>
                      </TableCell>
                      <TableCell>
                        <SCT>{crashWin !== null ? formatNumber(crashWin) : 'Did not fetch crash win'}</SCT>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <SCT>Crash Lose:</SCT>
                      </TableCell>
                      <TableCell>
                        <SCT>{crashLose !== null ? formatNumber(crashLose) : 'Did not fetch crash lose'}</SCT>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SCT>Slots Win:</SCT>
                      </TableCell>
                      <TableCell>
                        <SCT>{slotsWin !== null ? formatNumber(slotsWin) : 'Did not fetch slots win'}</SCT>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SCT>Slots Lose:</SCT>
                      </TableCell>
                      <TableCell>
                        <SCT>{slotsLose !== null ? formatNumber(slotsLose) : 'Did not fetch slots lose'}</SCT>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
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
