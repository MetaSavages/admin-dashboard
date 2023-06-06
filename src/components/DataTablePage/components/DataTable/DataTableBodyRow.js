import { TableRow } from '@mui/material';
import DataTableBodyCell from './DataTableBodyCell';
import { Can } from 'context';
import { useNavigate } from 'react-router-dom';
import { IconButton, Icon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MDButton from 'components/MDButton';
import SubRows from './SubRows';
function DataTableBodyRow({
  row,
  noEndBorder,
  object,
  noActions,
  openDelete,
  handleCloseDelete,
  handleDelete,
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
            <IconButton color='info' onClick={() => navigate(`show/${row.cells[0].value}`, { replace: false })}>
              <Icon>visibility</Icon>
            </IconButton>
          </Can>
          <Can I='update' a={object}>
            <IconButton color='info' onClick={() => navigate(`edit/${row.cells[0].value}`, { replace: false })}>
              <Icon>edit</Icon>
            </IconButton>
          </Can>
          <Can I='delete' a={object}>
            <IconButton
              color='error'
              onClick={() => handleDelete(row.cells[0].value)}
              // onClick={handleOpenDelete}
            >
              <Icon>delete</Icon>
            </IconButton>
            <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>{`Delete ${object}`}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Are you sure you want to delete this {object}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <MDButton variant='text' onClick={handleCloseDelete}>
                  No
                </MDButton>
                <MDButton variant='text' color='error' onClick={() => handleDelete(row.cells[0].value)}>
                  yes
                </MDButton>
              </DialogActions>
            </Dialog>
          </Can>
        </DataTableBodyCell>
      )}
    </TableRow>
  );
}

export default DataTableBodyRow;
