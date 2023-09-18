import DataTablePage from 'components/DataTablePage';
import React from 'react';
import dataTableFailedPayouts from 'assets/mockData/dataFailedPayouts';
import { getFailedWithdraws } from 'services/withdraws'
import { failedWithdrawsColumnData } from 'data/failedWithdrawsColumnData'

const FailedPayouts = () => {
  return (
    <DataTablePage
      title='Failed Payouts'
      fetchData={getFailedWithdraws}
      queryKey='failed_payouts'
      columnData={failedWithdrawsColumnData}
      object={'failed_payouts'}
      noActions
    />
  );
};

export default FailedPayouts;
