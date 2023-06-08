import React from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import MDTypography from 'components/MDTypography';
import queryString from 'query-string';
const dataTableEventsData = {
  columns: [
    {
      Header: 'Event type',
      accessor: 'event_type',
      Cell: ({ row }) => {
        const filters = {
          event_types: [row.original.id]
        };
        const queryStringParams = queryString.stringify(filters);
        return (
          <NavLink to={`/analytics/event-history?${queryStringParams}`}>
            <MDTypography fontSize='0.875rem'> {row.original.event_type}</MDTypography>
          </NavLink>
        );
      }
    },
    {
      Header: 'Times called',
      accessor: 'calls'
    },
    {
      Header: 'Users called',
      accessor: 'user_calls'
    },
    {
      Header: 'Average daily calls',
      accessor: 'avg_daily_calls'
    }
  ],
  rows: [
    {
      id: 1,
      event_type: 'Deposit',
      event_id: 'deposit',
      calls: '1,000',
      user_calls: '1,000',
      avg_daily_calls: '1,000'
    },
    {
      id: 2,
      event_type: 'Withdraw',
      event_id: 'withdraw',
      calls: '1,000',
      user_calls: '1,000',
      avg_daily_calls: '1,000'
    },
    {
      id: 3,
      event_type: 'Login',
      event_id: 'login',
      calls: '1,000',
      user_calls: '1,000',
      avg_daily_calls: '1,000'
    },
    {
      id: 4,
      event_type: 'Logout',
      event_id: 'logout',
      calls: '1,000',
      user_calls: '1,000',
      avg_daily_calls: '1,000'
    },
    {
      id: 5,
      event_type: 'Register',
      event_id: 'register',
      calls: '1,000',
      user_calls: '1,000',
      avg_daily_calls: '1,000'
    },
    {
      id: 6,
      event_type: 'Game Started',
      event_id: 'game_started',
      calls: '1,000',
      user_calls: '1,000',
      avg_daily_calls: '1,000'
    }
  ]
};

export default dataTableEventsData;
