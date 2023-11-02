import { Card } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import SCT from 'examples/CustomTypography/SCT';
import { Can } from 'context';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getPlayer } from 'services/players';
import { formatNumber, formatDuration } from 'layouts/player-management/helpers';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
          <MDBox display='flex' justifyContent='center' width='100%' marginTop='3%'>
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
              <TableContainer>
                <Table>
                  <TableHead>
                    <MDTypography>{user.u_nickname ? user.u_nickname : 'User'}'s Details</MDTypography>
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
