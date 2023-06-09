import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useNavigate } from 'react-router-dom';

import dataCasinos from 'assets/mockData/dataCasinos';

import { Can } from 'context';
function CasinoManagement() {
  const navigate = useNavigate();
  const onDelete = (id) => {
    console.log(id);
  };
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dataCasinos.rows,
          meta: {
            totalItems: 100
          }
        });
      }, 100);
    });
  };

  return (
    <>
      <Can I='read' a='user'>
        <DataTablePage
          title='Casino Management'
          createButton={
            <Can I='create' a='user'>
              <MDButton variant='contained' color='info' onClick={() => navigate('/casinos/new-casino')}>
                Add Casino
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={fetchData}
          queryKey='casinos'
          columnData={dataCasinos.columns}
          object={'casino'}
          onDelete={onDelete}
          noActions
        />
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' />
      </Can>
    </>
  );
}

export default CasinoManagement;
