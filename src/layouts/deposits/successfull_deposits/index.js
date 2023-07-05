import DashboardNavbar from 'components/DashboardNavbar';
import DataTablePage from 'components/DataTablePage';
import DataTable from 'components/DataTablePage/components/DataTable';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React from 'react';
import dataTableSuccessfullPayouts from 'assets/mockData/dataSuccessfullPayouts';
const SuccessfullDeposits = () => {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dataTableSuccessfullPayouts.rows,
          meta: {
            totalItems: 100
          }
        });
      }, 100);
    });
  };

  return (
    <DataTablePage
      title='Successful Deposits'
      fetchData={fetchData}
      queryKey='successful_deposits'
      columnData={dataTableSuccessfullPayouts.columns}
      object={'successful_deposits'}
      noActions
    />
  );
};

export default SuccessfullDeposits;
