import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useNavigate } from 'react-router-dom';

import dataCasinos from 'assets/mockData/dataCasinos';
import { getCasinos } from 'services/casinos';
import { casinosColumnData } from 'data/casinosColumnData';
import { Can } from 'context';
import { getSlots } from 'services/slots';
import { slotsColumnData } from 'data/slotsColumnData';
function SlotsManagement() {
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
      <Can I='read' a='casino'>
        <DataTablePage
          title='Slots Management'
          canSearch
          canFilter
          fetchData={getSlots}
          queryKey='casinos'
          columnData={slotsColumnData}
          object={'casino'}
          noActions
          //filtersComponent={<Filters filters={filters} setFilters={setFilters} />} <Filters
        />
      </Can>
      <Can not I='read' a='casino'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default SlotsManagement;
