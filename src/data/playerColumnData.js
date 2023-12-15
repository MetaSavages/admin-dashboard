import { Icon } from '@mui/material';
import { Link } from 'react-router-dom';

import MDBox from 'components/MDBox';

import { getCurrentUser } from 'services/auth';
import { formatNumber, formatDuration } from 'layouts/player-management/helpers';

export const playerColumnData = async (navigate) => {
  const user = await getCurrentUser();
  let arr = [
    // { Header: 'ID', accessor: 'id', width: 100 },
    {
      Header: 'Username',
      accessor: 'nickname',
      width: 100,
      Cell: (cellProps) => {
        return (
          <MDBox
            component='td'
            textAlign={cellProps.cell.column.align ? cellProps.cell.column.align : 'left'}
            py={1.5}
            pl={cellProps.cell.row.isExpanded ? 1.5 : 3}
            sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }) => ({
              fontSize: size.sm,
              fontWeight: cellProps.cell.row.isExpanded ? 600 : 400
            })}
          >
            <Link
              to={
                cellProps.cell.row.isExpanded &&
                cellProps.cell.row.original.isDemo &&
                (cellProps.cell.column?.id === 'nickname' || cellProps.cell.column?.id === 'username')
                  ? `/player-management/show/${cellProps.cell.row?.original?.id}`
                  : ''
              }
              sx={{
                verticalAlign: 'middle',
                textDecoration: 'none',
                cursor:
                  cellProps.cell.row.isExpanded &&
                  cellProps.cell.row.original.isDemo &&
                  (cellProps.cell.column?.id === 'nickname' || cellProps.cell.column?.id === 'username')
                    ? 'pointer'
                    : 'default'
              }}
            >
              <MDBox
                display='inline-block'
                width='max-content'
                color='text'
                sx={{
                  verticalAlign: 'middle',

                  textDecoration:
                    cellProps.cell.row.isExpanded &&
                    cellProps.cell.row.original.isDemo &&
                    (cellProps.cell.column?.id === 'nickname' || cellProps.cell.column?.id === 'username')
                      ? 'underline '
                      : 'none',
                  cursor:
                    cellProps.cell.row.isExpanded &&
                    cellProps.cell.row.original.isDemo &&
                    (cellProps.cell.column?.id === 'nickname' || cellProps.cell.column?.id === 'username')
                      ? 'pointer'
                      : 'default'
                }}
              >
                {cellProps.cell.row.original.nickname}
              </MDBox>
            </Link>
          </MDBox>
        );
      },
      SubCell: (cellProps) => {
        return <>{cellProps.value}</>;
      }
    },
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
    { Header: 'kyc_status', accessor: 'kyc_status', width: 100 },
    {
      Header: 'Creation Date',
      accessor: 'createdDate',
      F
    }
  ];
  if (!user.role?.casino) {
    arr = [
      {
        width: 5,
        Header: () => null,
        id: 'expander',
        Cell: ({ row }) => {
          return <Icon {...row.getToggleRowExpandedProps()}>{row.isExpanded ? 'expand_less' : 'expand_more'}</Icon>;
        },
        SubCell: () => null
      },
      ...arr
    ];
  }

  return arr;
};
