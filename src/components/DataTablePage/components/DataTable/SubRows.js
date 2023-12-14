import { TableRow, Typography } from '@mui/material';
import DataTableBodyCell from './DataTableBodyCell';
import { useEffect, useState } from 'react';
function SubRows({ row, rowProps, subrowFetchData }) {
  const [subRows, setSubRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await subrowFetchData(row.original);
      setSubRows(result);
    };
    fetchData();
  }, [row.original.id, subrowFetchData]);

  return (
    <>
      {subRows.map((x, i) => {
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
