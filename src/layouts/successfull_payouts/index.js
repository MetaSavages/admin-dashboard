import DashboardNavbar from 'components/DashboardNavbar';
import DataTablePage from 'components/DataTablePage';
import DataTable from 'components/DataTablePage/components/DataTable';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React from 'react';
import dataTableSuccessfullPayouts from 'assets/mockData/dataSuccessfullPayouts';
const SuccessfullPayouts = () => {
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
      title='Successful Payouts'
      fetchData={fetchData}
      queryKey='successful_payouts'
      columnData={dataTableSuccessfullPayouts.columns}
      object={'successful_payouts'}
      noActions
    />
  );
};

export default SuccessfullPayouts;
