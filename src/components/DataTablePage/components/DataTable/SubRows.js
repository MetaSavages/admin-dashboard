import { TableRow, Typography } from '@mui/material';
import DataTableBodyCell from './DataTableBodyCell';

function SubRows({ row, rowProps }) {
  //fetch rows from api
  const casinos = {
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
                  <Typography variant='body3' fontWeight='light'>
                    {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                      value: cell.column.accessor && cell.column.accessor(x, i),
                      row: { ...row, original: x }
                    })}
                  </Typography>
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
