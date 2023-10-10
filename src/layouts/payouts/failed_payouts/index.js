import DataTablePage from 'components/DataTablePage';
import React from 'react';
import dataTableFailedPayouts from 'assets/mockData/dataFailedPayouts';
import { getFailedWithdraws } from 'services/withdraws';
import { failedWithdrawsColumnData } from 'data/failedWithdrawsColumnData';
import { Can } from 'context';
import { Navigate } from 'react-router-dom';

const FailedPayouts = () => {
  return (
    <>
      <Can I='read' a='payout'>
        <DataTablePage
          title='Failed Payouts'
          fetchData={getFailedWithdraws}
          queryKey='failed_payouts'
          columnData={failedWithdrawsColumnData}
          object={'failed_payouts'}
          noActions
        />
      </Can>
      <Can not I='read' a='payout'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
};

export default FailedPayouts;
