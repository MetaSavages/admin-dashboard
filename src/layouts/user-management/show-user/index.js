import { Card } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import SCT from 'examples/CustomTypography/SCT';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUser } from 'services/users';
import { Navigate, useParams } from 'react-router-dom';
import { Can } from 'context';
function ShowUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser(id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Can I='read' a='user'>
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
                        <MDTypography>
                        {user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : 'User'}'s Details
                        </MDTypography>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell><SCT>Id:</SCT></TableCell>
                      <TableCell><SCT>{user.id ? user.id : 'Did not fetch ID'}</SCT></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><SCT>First Name:</SCT></TableCell>
                      <TableCell><SCT>{user.firstName ? user.firstName : 'Did not fetch first name'}</SCT></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><SCT>Last Name:</SCT></TableCell>
                      <TableCell><SCT>{user.lastName ? user.lastName : 'Did not fetch last name'}</SCT></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><SCT>Role:</SCT></TableCell>
                      <TableCell><SCT>{user.role && user.role.name ? user.role.name : 'Did not fetch role'}</SCT></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><SCT>Email:</SCT></TableCell>
                      <TableCell><SCT>{user.email ? user.email : 'Did not fetch email'}</SCT></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><SCT>Created at:</SCT></TableCell>
                      <TableCell><SCT>{user.createdAt ? user.createdAt : 'Did not created time'}</SCT></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><SCT>Updated At:</SCT></TableCell>
                      <TableCell><SCT>{user.updatedAt ? user.updatedAt : 'Did not fetch updated time'}</SCT></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </MDBox>
        </DashboardLayout>
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default ShowUser;
