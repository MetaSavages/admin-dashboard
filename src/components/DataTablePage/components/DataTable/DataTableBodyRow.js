import { useState } from 'react';
import { TableRow, Tooltip } from '@mui/material';
import DataTableBodyCell from './DataTableBodyCell';
import { Can } from 'context';
import { useNavigate } from 'react-router-dom';
import { IconButton, Icon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MDButton from 'components/MDButton';
import SubRows from './SubRows';
import { useEffect } from 'react';

function DataTableBodyRow({
  row,
  noEndBorder,
  object,
  noActions,
  openDelete,
  handleCloseDelete,
  handleDelete,
  handleOpenDelete,
  rowsLength
}) {
  const navigate = useNavigate();

  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map((cell, index) => (
        <DataTableBodyCell
          key={`player-data-${index}`}
          noBorder={noEndBorder && rowsLength - 1 === key}
          align={cell.column.align ? cell.column.align : 'left'}
          {...cell.getCellProps()}
          expanded={row.isExpanded}
        >
          {cell.render('Cell')}
        </DataTableBodyCell>
      ))}
      {!noActions && (
        <DataTableBodyCell noBorder={noEndBorder && rowsLength - 1 === key} width='0.5rem' align='left'>
          <Can I='read' a={object}>
            <Tooltip title='View'>
              <IconButton color='info' onClick={() => navigate(`show/${row.cells[0].value}`, { replace: false })}>
                <Icon>visibility</Icon>
              </IconButton>
            </Tooltip>
          </Can>
          <Can I='update' a={object}>
            <Tooltip title='Edit'>
              <IconButton color='info' onClick={() => navigate(`edit/${row.cells[0].value}`, { replace: false })}>
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
          </Can>
          <Can I='delete' a={object}>
            <Tooltip title='Delete'>
              <IconButton
                color='error'
                onClick={async () => {
                  handleOpenDelete();
                  const value = row.cells[0].value;
                  const result = await handleDelete(value);
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </Can>
        </DataTableBodyCell>
      )}
    </TableRow>
  );
}

export default DataTableBodyRow;
