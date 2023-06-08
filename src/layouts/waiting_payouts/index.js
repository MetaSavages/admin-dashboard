import { Card, Dialog, Grid } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
const WaitingPayouts = () => {
  const payouts = [
    {
      id: 1,
      date: '2021-10-10',
      amount: 100,
      casino: 'casino1',
      player: 'player1',
      player_id: 1
    },
    {
      id: 2,
      date: '2021-10-10',
      amount: 100,
      casino: 'casino1',
      player: 'player1',
      player_id: 1
    }
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        {payouts.map((payout) => {
          const filters = {
            users: [payout.player_id]
          };
          const queryStringParams = queryString.stringify(filters);
          console.log('queryStringParams', filters);
          return (
            <Grid key={payout.id} item xs={12} md={3}>
              <Card raised={true}>
                <MDBox p={2} lineHeight={1} display='flex' justifyContent='space-between'>
                  <MDTypography variant='body2' fontWeight='medium'>
                    User: {payout.player}
                  </MDTypography>
                  <MDTypography variant='body2' fontWeight='medium'>
                    Amount: ${payout.amount}
                  </MDTypography>
                </MDBox>
                <MDBox pl={2} pr={2} pb={1} lineHeight={1} display='flex' justifyContent='space-between'>
                  <MDTypography variant='body2' fontWeight='medium'>
                    Date: {payout.date}
                  </MDTypography>
                  <MDTypography variant='body2' fontWeight='medium'>
                    Casino: {payout.casino}
                  </MDTypography>
                </MDBox>
                <MDBox pl={2} lineHeight={1}>
                  <NavLink to={`/analytics/event-history?${queryStringParams}`}>
                    <MDTypography variant='body2' fontWeight='light'>
                      View player history
                    </MDTypography>
                  </NavLink>
                </MDBox>
                <MDBox p={2} lineHeight={1} display='flex' justifyContent='space-between'>
                  <MDButton variant='contained' color='success'>
                    Approve
                  </MDButton>
                  <MDButton variant='contained' color='error'>
                    Reject
                  </MDButton>
                  {/* <Dialog open={false}>
                    <MDBox p={2} lineHeight={1} display='flex' justifyContent='space-between'>
                      <MDTypography variant='body2' fontWeight='medium'>
                        Please provide a reason for rejecting the payout
                      </MDTypography>
                    </MDBox>
                  </Dialog> */}
                </MDBox>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </DashboardLayout>
  );
};

export default WaitingPayouts;
