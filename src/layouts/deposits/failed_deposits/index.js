import DataTablePage from 'components/DataTablePage';
import React from 'react';
import dataTableFailedPayouts from 'assets/mockData/dataFailedPayouts';
import { failedPaymentsColumnData } from 'data/failedPaymentsColumnData';
import { getFailedDeposits } from 'services/deposits';
import { Can } from 'context';
import { Navigate } from 'react-router-dom';
const FailedDeposits = () => {
  return (
    <>
      <Can I='read' a='deposit'>
        <DataTablePage
          title='Failed Deposits'
          fetchData={getFailedDeposits}
          queryKey='failed_deposits'
          columnData={failedPaymentsColumnData}
          object={'failed_deposits'}
          noActions
        />
      </Can>
      <Can not I='read' a='deposit'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
};

export default FailedDeposits;
