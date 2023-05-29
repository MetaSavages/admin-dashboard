import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'components/DataTablePage/components/DataTable';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Card from '@mui/material/Card';

function DataTablePage({
  title,
  createButton = false,
  canFilter = false,
  canSearch = false,
  fetchData,
  queryKey,
  columnData,
  object,
  onDelete
}) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1} display='flex' justifyContent='space-between'>
            <MDTypography variant='h5' fontWeight='medium'>
              {title}
            </MDTypography>
            {createButton ? createButton : null}
          </MDBox>
          <DataTable
            canSearch={canSearch}
            canFilter={canFilter}
            fetchData={fetchData}
            queryKey={queryKey}
            columnData={columnData}
            object={object}
            onDelete={onDelete}
          />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTablePage;
