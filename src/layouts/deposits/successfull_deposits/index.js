import DashboardNavbar from 'components/DashboardNavbar';
import DataTablePage from 'components/DataTablePage';
import DataTable from 'components/DataTablePage/components/DataTable';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React from 'react';
import dataTableSuccessfullPayouts from 'assets/mockData/dataSuccessfullPayouts';
import { successfulPaymentsColumnData } from 'data/successfulPaymentsColumnData'
import { getSuccesfulDeposits } from 'services/deposits'
const SuccessfullDeposits = () => {
  return (
    <DataTablePage
      title='Successful Deposits'
      fetchData={getSuccesfulDeposits}
      queryKey='successful_deposits'
      columnData={successfulPaymentsColumnData}
      object={'successful_deposits'}
      noActions
    />
  );
};

export default SuccessfullDeposits;
