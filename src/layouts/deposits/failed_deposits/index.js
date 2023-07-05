import DataTablePage from 'components/DataTablePage';
import React from 'react';
import dataTableFailedPayouts from 'assets/mockData/dataFailedPayouts';
const FailedDeposits = () => {
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
      title='Failed Deposits'
      fetchData={fetchData}
      queryKey='failed_deposits'
      columnData={dataTableFailedPayouts.columns}
      object={'failed_deposits'}
      noActions
    />
  );
};

export default FailedDeposits;
