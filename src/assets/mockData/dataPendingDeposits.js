import MDBox from 'components/MDBox';
import { IconButton, Icon, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import MDTypography from 'components/MDTypography';
const dataPendingDeposits = {
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
      date: '2021/10/01 12:00:00',
      player_id: 1,
      casino_id: 1
    },
    {
      username: 'user2',
      amount: '$100',
      casino: 'Casino 2',
      date: '2021/10/01 12:00:00',
      player_id: 2,
      casino_id: 2
    },
    {
      username: 'user3',
      amount: '$100',
      casino: 'Casino 3',
      date: '2021/10/01 12:00:00',
      player_id: 3,
      casino_id: 3
    },
    {
      username: 'user4',
      amount: '$100',
      casino: 'Casino 4',
      date: '2021/10/01 12:00:00',
      player_id: 4,
      casino_id: 4
    }
  ]
};

export default dataPendingDeposits;
