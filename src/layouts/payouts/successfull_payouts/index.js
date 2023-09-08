import DashboardNavbar from 'components/DashboardNavbar';
import DataTablePage from 'components/DataTablePage';
import DataTable from 'components/DataTablePage/components/DataTable';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React from 'react';
import dataTableSuccessfullPayouts from 'assets/mockData/dataSuccessfullPayouts';
import { getSuccesfulWithdraws } from 'services/withdraws'
import { successfulPaymentsColumnData } from 'data/successfulPaymentsColumnData'

const SuccessfullPayouts = () => {
  return (
    <DataTablePage
      title='Successful Payouts'
      fetchData={getSuccesfulWithdraws}
      queryKey='successful_payouts'
      columnData={successfulPaymentsColumnData}
      object={'successful_payouts'}
      noActions
    />
  );
};

export default SuccessfullPayouts;
