import DataTablePage from 'layouts/data-table';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import { getUsers } from 'services/users';
import { Skeleton } from '@mui/material';
function UserManagement() {
  const navigate = useNavigate();
  return (
    // <Skeleton height={2000} />
    <DataTablePage
      title='User Management'
      createButton={
        <MDButton variant='contained' color='info' onClick={() => navigate('/user-management/new-user')}>
          Add User
        </MDButton>
      }
      canSearch
      canFilter
      fetchData={getUsers}
      queryKey='users'
    />
  );
}

export default UserManagement;
