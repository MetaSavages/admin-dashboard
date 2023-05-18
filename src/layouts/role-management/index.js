import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import { getRoles } from 'services/roles';
import rolesColumnData from 'data/rolesColumnData';
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
      canSearch
      canFilter
      fetchData={getRoles}
      queryKey='roles'
      columnData={rolesColumnData}
    />
  );
}

export default RoleManagement;
