import DataTablePage from 'components/DataTablePage';
import React from 'react';
import dataTableFailedPayouts from 'assets/mockData/dataFailedPayouts';
const FailedPayouts = () => {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dataTableFailedPayouts.rows,
          meta: {
            totalItems: 100
          }
        });
      }, 100);
    });
  };

  return (
    <DataTablePage
      title='Failed Payouts'
      fetchData={fetchData}
      queryKey='failed_payouts'
      columnData={dataTableFailedPayouts.columns}
      object={'failed_payouts'}
      noActions
    />
  );
};

export default FailedPayouts;
