import { Card } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
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
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : 'User'}'s Details
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Id:</TableCell>
                      <TableCell>{user.id ? user.id : 'Did not fetch ID'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>First Name:</TableCell>
                      <TableCell>{user.firstName ? user.firstName : 'Did not fetch first name'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Last Name:</TableCell>
                      <TableCell>{user.lastName ? user.lastName : 'Did not fetch last name'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Role:</TableCell>
                      <TableCell>{user.role && user.role.name ? user.role.name : 'Did not fetch role'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email:</TableCell>
                      <TableCell>{user.email ? user.email : 'Did not fetch email'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Created at:</TableCell>
                      <TableCell>{user.createdAt ? user.createdAt : 'Did not created time'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Updated At:</TableCell>
                      <TableCell>{user.updatedAt ? user.updatedAt : 'Did not fetch updated time'}</TableCell>
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
