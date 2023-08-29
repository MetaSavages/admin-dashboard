import { Icon } from '@mui/material';

export const playerColumnData = [
  {
    width: 5,
    Header: () => null,
    id: 'expander',
    Cell: ({ row }) => (
      <Icon {...row.getToggleRowExpandedProps()}>{row.isExpanded ? 'expand_less' : 'expand_more'}</Icon>
    ),
    SubCell: () => null
  },
  { Header: 'Username', accessor: 'nickname', width: 100 },
  {
    Header: 'Time Spent',
    accessor: 'time_spent',
    width: 150,
    SubCell: (cellProps) => <>{Math.floor(cellProps.value)}</>
  },
  {
    Header: 'Current Balance',
    accessor: 'current_balance',
    width: 150,
    Cell: (cellProps) => <>{Math.floor(cellProps.value)}</>,
    SubCell: (cellProps) => <>{Math.floor(cellProps.value)}</>
  },
  {
    Header: 'Starting Balance',
    accessor: 'starting_balance',
    width: 150,

    Cell: (cellProps) => <>{Math.floor(cellProps.value)}</>,
    SubCell: (cellProps) => <>{Math.floor(cellProps.value)}</>
  },
  {
    Header: 'Spent',
    accessor: 'money_spent',
    width: 100,
    Cell: (cellProps) => <>{Math.floor(cellProps.value)}</>,
    SubCell: (cellProps) => <>{Math.floor(cellProps.value)}</>
  },
  {
    Header: 'Cashout',
    accessor: 'money_cashed_out',
    width: 100,
    Cell: (cellProps) => <>{Math.floor(cellProps.value)}</>,
    SubCell: (cellProps) => <>{Math.floor(cellProps.value)}</>
  },
  { Header: 'wallet', accessor: 'wallet', width: 200 },
  { Header: 'location', accessor: 'location', width: 200 },
  { Header: 'kyc_status', accessor: 'kyc_status', width: 100 }
];