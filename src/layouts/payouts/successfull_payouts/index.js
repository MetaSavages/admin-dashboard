import DashboardNavbar from 'components/DashboardNavbar';
import DataTablePage from 'components/DataTablePage';
import DataTable from 'components/DataTablePage/components/DataTable';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React from 'react';
import dataTableSuccessfullPayouts from 'assets/mockData/dataSuccessfullPayouts';
import { getSuccesfulWithdraws } from 'services/withdraws';
import { successfulPaymentsColumnData } from 'data/successfulPaymentsColumnData';
import { Can } from 'context';
import { Navigate } from 'react-router-dom';

const SuccessfullPayouts = () => {
  return (
    <>
      <Can I='read' a='payout'>
        <DataTablePage
          title='Successful Payouts'
          fetchData={getSuccesfulWithdraws}
          queryKey='successful_payouts'
          columnData={successfulPaymentsColumnData}
          object={'successful_payouts'}
          noActions
        />
      </Can>
      <Can not I='read' a='payout'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
};

export default SuccessfullPayouts;
