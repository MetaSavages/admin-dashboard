import { Card } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
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
              <MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Id: {user.id}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Email: {user.email}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Created at: {user.createdAt}
                  </MDTypography>
                </MDBox>
                <MDBox display='flex' justifyContent='space-between' alignItems='center'>
                  <MDTypography variant='h6' fontWeight='medium' textTransform='capitalize'>
                    Updated At: {user.updatedAt}
                  </MDTypography>
                </MDBox>
              </MDBox>
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
