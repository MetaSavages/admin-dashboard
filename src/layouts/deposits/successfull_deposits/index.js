import DashboardNavbar from 'components/DashboardNavbar';
import DataTablePage from 'components/DataTablePage';
import DataTable from 'components/DataTablePage/components/DataTable';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React from 'react';
import dataTableSuccessfullPayouts from 'assets/mockData/dataSuccessfullPayouts';
import { successfulPaymentsColumnData } from 'data/successfulPaymentsColumnData';
import { getSuccesfulDeposits } from 'services/deposits';
import { Can } from 'context';
import { Navigate } from 'react-router-dom';
const SuccessfullDeposits = () => {
  return (
    <>
      <Can I='read' a='deposit'>
        <DataTablePage
          title='Successful Deposits'
          fetchData={getSuccesfulDeposits}
          queryKey='successful_deposits'
          columnData={successfulPaymentsColumnData}
          object={'successful_deposits'}
          noActions
        />
      </Can>
      <Can not I='read' a='deposit'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
};

export default SuccessfullDeposits;
