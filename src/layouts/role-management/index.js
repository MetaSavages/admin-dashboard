import DataTablePage from 'layouts/data-table';
import dataTableUsersData from 'assets/mockData/dataTableUsers';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
function RoleManagement() {
  const navigate = useNavigate();
  return (
    <DataTablePage
      title='Role Management'
      createButton={
        <MDButton variant='contained' color='info' onClick={() => navigate('/role-management/new-role')}>
          Add Role
        </MDButton>
      }
      data={dataTableUsersData}
      canSearch
      canFilter
    />
  );
}

export default RoleManagement;
