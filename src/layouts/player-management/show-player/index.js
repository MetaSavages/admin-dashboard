import { Card } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { Can } from 'context';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getPlayer } from 'services/players';
import { formatNumber, formatDuration } from 'layouts/player-management/helpers';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ShowPlayer() {
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState({});
  useEffect(() => {
    getPlayer(id)
      .then((res) => {
        setUser(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Can I='read' a='player'>
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox display='flex' justifyContent='center' width='100%'>
            <Card
              sx={{
                borderRadius: '12px',
                boxShadow: (theme) => theme.shadows[4],
                width: '50%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{user.u_nickname ? user.u_nickname : 'User'}'s Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Nickname:</TableCell>
                      <TableCell>{user.u_nickname ? user.u_nickname : 'Did not fetch nickname'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Id:</TableCell>
                      <TableCell>{user.u_id ? user.u_id : 'Did not fetch ID'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Wallet ID:</TableCell>
                      <TableCell>{user.u_walletId ? user.u_walletId : 'Did not fetch walletID'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Location:</TableCell>
                      <TableCell>{user.u_lastLocation ? user.u_lastLocation : 'Did not fetch location'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>KYC:</TableCell>
                      <TableCell>{user.u_kycState ? user.u_kycState : 'Did not fetch KYC status'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Current Balance:</TableCell>
                      <TableCell>
                        {user.current_balance ? formatNumber(user.current_balance) : 'Did not fetch current balance'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Money Cashed Out:</TableCell>
                      <TableCell>
                        {user.money_cashed_out ? formatNumber(user.money_cashed_out) : 'Did not fetch money cashed out'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Money Spent:</TableCell>
                      <TableCell>{user.money_spent ? formatNumber(user.money_spent) : 'Did not fetch money spent'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Starting Balance:</TableCell>
                      <TableCell>
                        {user.starting_balance ? formatNumber(user.starting_balance) : 'Did not fetch starting balance'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Time Spent:</TableCell>
                      <TableCell>{user.time_spent ? formatDuration(user.time_spent) : 'Did not fetch time spent'}</TableCell>
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
