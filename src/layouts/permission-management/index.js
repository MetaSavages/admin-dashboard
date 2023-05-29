import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import { getPermissions } from 'services/permissions';
import permissionsColumnData from 'data/permissionsColumnData';
function PermissionManagement() {
  const navigate = useNavigate();
  return (
    <DataTablePage
      title='Permission Management'
      createButton={
        <MDButton variant='contained' color='info' onClick={() => navigate('/permission-management/new-permission')}>
          Add Permission
        </MDButton>
      }
      canSearch
      canFilter
      fetchData={getPermissions}
      queryKey='permissions'
      columnData={permissionsColumnData}
    />
  );
}

export default PermissionManagement;
