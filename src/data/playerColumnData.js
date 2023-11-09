import { Icon } from '@mui/material';
import { getCurrentUser } from 'services/auth';
import {formatNumber, formatDuration } from 'layouts/player-management/helpers';

export const playerColumnData = async () => {
  const user = await getCurrentUser();
  let arr = [
    // { Header: 'ID', accessor: 'id', width: 100 },
    { Header: 'Username', accessor: 'nickname', width: 100 },
    {
      Header: 'Time Spent',
      accessor: 'time_spent',
      width: 150,
      Cell: (cellProps) => <>{formatDuration(cellProps.value)}</>,
      SubCell: (cellProps) => <>{formatDuration(cellProps.value)}</>
    },
    {
      Header: 'Current Balance',
      accessor: 'current_balance',
      width: 150,
      Cell: (cellProps) => <>{formatNumber(cellProps.value)}</>,
      SubCell: (cellProps) => <>{formatNumber(cellProps.value)}</>
    },
    {
      Header: 'Starting Balance',
      accessor: 'starting_balance',
      width: 150,

      Cell: (cellProps) => <>{formatNumber(cellProps.value)}</>,
      SubCell: (cellProps) => <>{formatNumber(cellProps.value)}</>
    },
    {
      Header: 'Spent',
      accessor: 'money_spent',
      width: 100,
      Cell: (cellProps) => <>{formatNumber(cellProps.value)}</>,
      SubCell: (cellProps) => <>{formatNumber(cellProps.value)}</>
    },
    {
      Header: 'Cashout',
      accessor: 'money_cashed_out',
      width: 100,
      Cell: (cellProps) => <>{formatNumber(cellProps.value)}</>,
      SubCell: (cellProps) => <>{formatNumber(cellProps.value)}</>
    },
    {
      Header: 'wallet',
      accessor: 'wallet',
      width: 200,
      Cell: ({ row }) => (
        <>
          {row.original.isDemo
            ? process.env.REACT_APP_FRONTEND_URL + '?demoUser=' + row.original.wallet
            : row.original.wallet}
        </>
      )
    },
    { Header: 'location', accessor: 'location', width: 200 },
    { Header: 'kyc_status', accessor: 'kyc_status', width: 100 }
  ];
  if (!user.role?.casino) {
    arr = [
      {
        width: 5,
        Header: () => null,
        id: 'expander',
        Cell: ({ row }) => (
          <Icon {...row.getToggleRowExpandedProps()}>{row.isExpanded ? 'expand_less' : 'expand_more'}</Icon>
        ),
        SubCell: () => null
      },
      ...arr
    ];
  }

  return arr;
};
