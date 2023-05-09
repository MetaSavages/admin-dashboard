import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Card from '@mui/material/Card';
import dataTableUsersData from 'assets/mockData/dataTableUsers';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
function RoleManagement() {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1} display='flex' justifyContent='space-between'>
            <MDTypography variant='h5' fontWeight='medium'>
              Datatable Search
            </MDTypography>
            <MDButton variant='contained' color='info' onClick={() => navigate('/role-management/new-role')}>
              Add Role
            </MDButton>
          </MDBox>
          <DataTable table={dataTableUsersData} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RoleManagement;
