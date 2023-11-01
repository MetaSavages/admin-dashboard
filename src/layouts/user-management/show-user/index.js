import { Card } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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
              <TableContainer>
                <Table>
                  <TableHead>
                        <MDTypography>
                        {user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : 'User'}'s Details
                        </MDTypography>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell><MDTypography>Id:</MDTypography></TableCell>
                      <TableCell><MDTypography>{user.id ? user.id : 'Did not fetch ID'}</MDTypography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><MDTypography>First Name:</MDTypography></TableCell>
                      <TableCell><MDTypography>{user.firstName ? user.firstName : 'Did not fetch first name'}</MDTypography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><MDTypography>Last Name:</MDTypography></TableCell>
                      <TableCell><MDTypography>{user.lastName ? user.lastName : 'Did not fetch last name'}</MDTypography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><MDTypography>Role:</MDTypography></TableCell>
                      <TableCell><MDTypography>{user.role && user.role.name ? user.role.name : 'Did not fetch role'}</MDTypography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><MDTypography>Email:</MDTypography></TableCell>
                      <TableCell><MDTypography>{user.email ? user.email : 'Did not fetch email'}</MDTypography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><MDTypography>Created at:</MDTypography></TableCell>
                      <TableCell><MDTypography>{user.createdAt ? user.createdAt : 'Did not created time'}</MDTypography></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><MDTypography>Updated At:</MDTypography></TableCell>
                      <TableCell><MDTypography>{user.updatedAt ? user.updatedAt : 'Did not fetch updated time'}</MDTypography></TableCell>
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
