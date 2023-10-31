import { TableRow, Table, TableBody, TableHead } from '@mui/material';
import DataTableBodyCell from './PlayerDataTableBodyCell';
import MDBox from 'components/MDBox';
import DataTableHeadCell from './PlayerDataTableHeadCell';
import { useTable } from 'react-table';

function SubRows({ row, rowProps, visibleColumns }) {
  const casinos = {
    columns: [
      {
        Header: 'Casino',
        accessor: 'casino'
      },
      {
        Header: 'Time Spent',
        accessor: 'time_spent'
      },
      {
        Header: 'Balance',
        accessor: 'balance'
      },
      {
        Header: 'Spent',
        accessor: 'spent'
      },
      {
        Header: 'Starting Balance',
        accessor: 'starting_balance'
      },
      {
        Header: 'Cashout',
        accessor: 'cashout'
      }
    ],
    rows: [
      {
        username: 'Casino 1',
        time_spent: '1h 30m',
        current_balance: '$100',
        spent: '$50',
        starting_balance: '$50',
        cashout: '$100'
      },
      {
        username: 'Casino 2',
        time_spent: '1h 30m',
        current_balance: '$100',
        spent: '$50',
        starting_balance: '$50',
        cashout: '$100'
      },
      {
        username: 'Casino 3',
        time_spent: '1h 30m',
        current_balance: '$100',
        spent: '$50',
        starting_balance: '$50',
        cashout: '$100'
      },
      {
        username: 'Casino 4',
        time_spent: '1h 30m',
        current_balance: '$100',
        spent: '$50',
        starting_balance: '$50',
        cashout: '$100'
      }
    ]
  };
  return (
    <>
      {casinos.rows.map((x, i) => {
        return (
          <TableRow {...rowProps} key={`${rowProps.key}-expanded-${i}`}>
            {row.cells.map((cell) => {
              return (
                <DataTableBodyCell {...cell.getCellProps()}>
                  {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                    value: cell.column.accessor && cell.column.accessor(x, i),
                    row: { ...row, original: x }
                  })}
                </DataTableBodyCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
}

export default SubRows;
