import { Card } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { Can } from 'context';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getPlayer } from 'services/players';

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
              <MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Id: {user.u_id ? user.u_id : 'Did not fetch ID'}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Nickname: {user.u_nickname ? user.u_nickname : 'Did not fetch nickname'}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Wallet ID: {user.u_walletId ? user.u_walletId : 'Did not fetch wallet ID'}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Location: {user.u_lastLocation ? user.u_lastLocation : 'Did not fetch location'}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    KYC: {user.u_kycState ? user.u_kycState : 'Did not fetch KYC status'}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Current Balance: {user.current_balance ? user.current_balance : 'Did not fetch current balance'}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Money Cashed Out: {user.money_cashed_out ? user.money_cashed_out : 'Did not fetch money cashed out'}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Money Spent: {user.money_spent ? user.money_spent : 'Did not fetch money spent'}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Starting Balance: {user.starting_balance ? user.starting_balance : 'Did not fetch starting balance'}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Time Spent: {user.time_spent ? user.time_spent : 'Did not fetch time spent'}
                  </MDTypography>
                </MDBox>
              </MDBox>
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