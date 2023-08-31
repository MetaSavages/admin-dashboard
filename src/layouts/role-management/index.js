import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import { deleteRole, getRoles } from 'services/roles';
import rolesColumnData from 'data/rolesColumnData';

function RoleManagement() {
  const navigate = useNavigate();

  async function handleDelete(id) {
    const response = await deleteRole(id);
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
      title='Role Management'
      createButton={
        <MDButton variant='contained' color='info' onClick={() => navigate('/role-management/new-role')}>
          Add Role
        </MDButton>
      }
      canSearch
      canFilter
      object={'rule'}
      onDelete={handleDelete}
      fetchData={getRoles}
      queryKey='roles'
      columnData={rolesColumnData}
    />
  );
}

export default RoleManagement;
