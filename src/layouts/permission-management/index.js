import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import { deletePermission, getPermissions } from 'services/permissions';
import permissionsColumnData from 'data/permissionsColumnData';

function PermissionManagement() {
  const navigate = useNavigate();

  async function handleDelete(id) {
    const response = await deletePermission(id);
    if (response.status === 200 || response.status === 201) {
      alert('Permission deleted successfully');
      return true
    } else {
      alert('Permission deleted failed');
      return false
    }
  }

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
      object={'user'}
      fetchData={getPermissions}
      onDelete={handleDelete}
      queryKey='permissions'
      columnData={permissionsColumnData}
    />
  );
}

export default PermissionManagement;
