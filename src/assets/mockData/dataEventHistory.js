import React from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import MDTypography from 'components/MDTypography';

const dataTableEventHistory = {
  columns: [
    {
      Header: 'Username',
      accessor: 'username'
    },
    {
      Header: 'Event type',
      accessor: 'event_type'
    },

    {
      Header: 'Timestamp',
      accessor: 'timestamp'
    }
  ],
  rows: [
    {
      event_type: 'Deposit',
      username: 'user1',
      timestamp: '2021/10/01 12:00:00'
    },
    {
      event_type: 'Withdraw',
      username: 'user2',
      timestamp: '2021/10/01 12:00:00'
    },
    {
      event_type: 'Login',
      username: 'user3',
      timestamp: '2021/10/01 12:00:00'
    },
    {
      event_type: 'Logout',
      username: 'user4',
      timestamp: '2021/10/01 12:00:00'
    },
    {
      event_type: 'Deposit',
      username: 'user1',
      timestamp: '2021/10/01 12:00:00'
    }
  ]
};

export default dataTableEventHistory;
