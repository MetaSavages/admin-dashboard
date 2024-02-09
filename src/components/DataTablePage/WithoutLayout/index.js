import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'components/DataTablePage/components/DataTable';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Card from '@mui/material/Card';

function DataTablePageWithoutLayout({
  title,
  createButton = false,
  canFilter = false,
  filtersComponent = null,
  fetchData,
  queryKey,
  columnData,
  object,
  onDelete,
  noActions = false,
  subrowFetchData = null,
  filters = '',
  additionalData
}) {
  return (
    <MDBox pt={6} pb={3} pr={3}>
      <Card>
        <MDBox p={3} lineHeight={1} display='flex' justifyContent='space-between'>
          <MDTypography variant='h5' fontWeight='medium'>
            {title}
          </MDTypography>
          {createButton ? createButton : null}
        </MDBox>
        <DataTable
          canFilter={canFilter}
          filtersComponent={filtersComponent}
          fetchData={fetchData}
          queryKey={queryKey}
          columnData={columnData}
          object={object}
          onDelete={onDelete}
          noActions={noActions}
          subrowFetchData={subrowFetchData}
          filters={filters}
          additionalData={additionalData}
        />
      </Card>
    </MDBox>
  );
}

export default DataTablePageWithoutLayout;
