import queryString from 'query-string';
import Actions from 'layouts/payouts/components/Actions';

export const pendingWithdrawsColumnData = [
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
      Header: 'Actions',
      accessor: 'actions',
      sorted: false,
      Cell: ({ row }) => {
        const filters = {
          users: [row.original.player_id],
          casinos: [row.original.casino_id]
        };
        const queryStringParams = queryString.stringify(filters);
        console.log(row);
        return (
          <Actions row={row} queryStringParams={queryString}></Actions>
        );
      }
    }
  ];