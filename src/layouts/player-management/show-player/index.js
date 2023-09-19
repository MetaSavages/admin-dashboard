import { Card } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useEffect, useState } from 'react';
import { getUser } from 'services/users';
import { useParams } from 'react-router-dom';
import { getPlayerAggregated } from 'services/players';

function ShowPlayer() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    getPlayerAggregated(id)
      .then((res) => {
        setUser(res.data);
        console.log("User");
        console.log(user);
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
                Id: {user.id}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                Nickname: {user.nickname}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                Wallet ID: {user.walletId}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between' alignItems='center'>
              <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                KYC: {user.kycState}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default ShowPlayer;
