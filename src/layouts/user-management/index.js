import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUsers } from 'services/users';
import userColumnData from 'data/usersColumnData';
import { Skeleton } from '@mui/material';
import { Can } from 'context';


function UserManagement() {
  const navigate = useNavigate();
  const onDelete = (id) => {
    console.log(id);
  };
  return (
    <>
      <Can I='read' a='user'>
        <DataTablePage
          title='User Management'
          createButton={
            <Can I='create' a='user'>
              <MDButton variant='contained' color='info' onClick={() => navigate('/user-management/new-user')}>
                Add User
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getUsers}
          queryKey='users'
          columnData={userColumnData}
          object={'user'}
          onDelete={onDelete}
        />
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' />
      </Can>
    </>
  );
}

export default UserManagement;
