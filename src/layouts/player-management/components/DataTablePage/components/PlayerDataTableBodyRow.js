import { TableRow } from '@mui/material';
import DataTableBodyCell from './PlayerDataTableBodyCell';

import { useState } from 'react';

function PlayerDataTableBodyRow({ row, noEndBorder, object, ...rest }) {
  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map((cell) => (
        <DataTableBodyCell
          noBorder={noEndBorder && rows.length - 1 === key}
          align={cell.column.align ? cell.column.align : 'left'}
          {...cell.getCellProps()}
          expanded={row.isExpanded}
        >
          {cell.render('Cell')}
        </DataTableBodyCell>
      ))}
    </TableRow>
  );
}

export default PlayerDataTableBodyRow;
