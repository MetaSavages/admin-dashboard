const dataTableFailedPayouts = {
  columns: [
    {
      Header: 'Username',
      accessor: 'username'
    },
    {
      Header: 'Amount',
      accessor: 'amount'
    },
    {
      Header: 'Casino',
      accessor: 'casino'
    },
    {
      Header: 'Date',
      accessor: 'date'
    },
    {
      Header: 'Reason',
      accessor: 'reason'
    }
  ],
  rows: [
    {
      username: 'user1',
      amount: '$100',
      casino: 'Casino 1',
      date: '2021/10/01 12:00:00',
      reason: 'Reason 1'
    },
    {
      username: 'user2',
      amount: '$100',
      casino: 'Casino 2',
      date: '2021/10/01 12:00:00',
      reason: 'Reason 2'
    },
    {
      username: 'user3',
      amount: '$100',
      casino: 'Casino 3',
      date: '2021/10/01 12:00:00',
      reason: 'Reason 3'
    },
    {
      username: 'user4',
      amount: '$100',
      casino: 'Casino 4',
      date: '2021/10/01 12:00:00',
      reason: 'Reason 4'
    }
  ]
};

export default dataTableFailedPayouts;