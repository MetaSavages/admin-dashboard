import DataTablePage from 'components/DataTablePage';
import React from 'react';
import dataTableFailedPayouts from 'assets/mockData/dataFailedPayouts';
import { failedPaymentsColumnData } from 'data/failedPaymentsColumnData';
import { getFailedDeposits } from 'services/deposits'
const FailedDeposits = () => {
  return (
    <DataTablePage
      title='Failed Deposits'
      fetchData={getFailedDeposits}
      queryKey='failed_deposits'
      columnData={failedPaymentsColumnData}
      object={'failed_deposits'}
      noActions
    />
  );
};

export default FailedDeposits;
