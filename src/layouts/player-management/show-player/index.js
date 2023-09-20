import { Card } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayer } from 'services/players';

function ShowPlayer() {
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState({});
  useEffect(() => {
    getPlayer(id)
      .then((res) => {
        setUser(res);
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
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
                Id: {user.u_id}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                Nickname: {user.u_nickname}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                Wallet ID: {user.u_walletId}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                Location: {user.u_lastLocation}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                KYC: {user.u_kycState}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
              Current Balance: {user.current_balance}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
              Money Cashed Out: {user.money_cashed_out}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
              Money Spent: {user.money_spent}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
              Starting Balance: {user.starting_balance}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
              Time Spent: {user.time_spent}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default ShowPlayer;
