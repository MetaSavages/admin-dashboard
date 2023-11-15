const dataTableSuccessfullPayouts = {
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
    }
  ],
  rows: [
    {
      username: 'user1',
      amount: '$100',
      casino: 'Casino 1',
      date: '2021/10/01 12:00:00'
    },
    {
      username: 'user2',
      amount: '$100',
      casino: 'Casino 2',
      date: '2021/10/01 12:00:00'
    },
    {
      username: 'user3',
      amount: '$100',
      casino: 'Casino 3',
      date: '2021/10/01 12:00:00'
    },
    {
      username: 'user4',
      amount: '$100',
      casino: 'Casino 4',
      date: '2021/10/01 12:00:00'
    }
  ]
};

export default dataTableSuccessfullPayouts;
