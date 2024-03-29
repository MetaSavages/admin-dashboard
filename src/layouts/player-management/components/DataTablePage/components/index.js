/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect, useState, useReducer, useCallback, Fragment } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-table components
import { useAsyncDebounce } from 'react-table';
import { Skeleton, TableHead } from '@mui/material';
// @mui material components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Icon from '@mui/material/Icon';
import Autocomplete from '@mui/material/Autocomplete';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDPagination from 'components/MDPagination';

// Material Dashboard 2 PRO React examples
import PlayerDataTableHeadCell from './PlayerDataTableHeadCell';
import PlayerDataTableBodyRow from './PlayerDataTableBodyRow';
import MDButton from 'components/MDButton';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, IconButton } from '@mui/material';
import useReactTableInstance from 'hooks/useReactTableInstance';
import useFetchData from 'hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import { Can } from 'context';
import useExpandableReactTableInsance from 'hooks/useExpandableReactTableInstance';
import SubRows from './SubRows';

const ACTION = {
  PAGE_CHANGED: 'page-changed',
  PAGE_SIZE_CHANGED: 'page-sized-changed',
  TOTAL_COUNT_CHANGED: 'total-count-changed',
  SEARCH_CHANGED: 'search-changed'
};

const defaultState = {
  queryPageIndex: 0,
  queryPageSize: 20,
  queryTotalCount: 0,
  search: ''
};

const tableReducer = (state, action) => {
  switch (action.type) {
    case ACTION.PAGE_CHANGED:
      return { ...state, queryPageIndex: action.pageIndexValue };
    case ACTION.PAGE_SIZE_CHANGED:
      return { ...state, queryPageSize: action.pageSizeChangedValue };
    case ACTION.TOTAL_COUNT_CHANGED:
      return { ...state, queryTotalCount: action.totalCountChangedValue };
    case ACTION.SEARCH_CHANGED:
      return { ...state, search: action.searchChangedValue };
    default:
      return state;
  }
};

function PlayerDataTable({
  canSearch,
  showTotalEntries,
  pagination,
  isSorted,
  noEndBorder,
  canFilter = false,
  columnData,
  fetchData,
  queryKey,
  object,
  onDelete
}) {
  const [tableState, dispatchTableAction] = useReducer(tableReducer, defaultState);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 576);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const setQueryPageIndexHandler = ({ pageIndexValue }) => {
    dispatchTableAction({
      type: ACTION.PAGE_CHANGED,
      pageIndexValue
    });
  };

  const setQueryPageSizeHandler = ({ pageSizeChangedValue }) => {
    dispatchTableAction({
      type: ACTION.PAGE_SIZE_CHANGED,
      pageSizeChangedValue
    });
  };

  const setTotalCountHandler = ({ totalCountChangedValue }) => {
    dispatchTableAction({
      type: ACTION.TOTAL_COUNT_CHANGED,
      totalCountChangedValue
    });
  };

  const setSearchHandler = ({ searchChangedValue }) => {
    dispatchTableAction({
      type: ACTION.SEARCH_CHANGED,
      searchChangedValue
    });
  };

  const { queryPageIndex, queryPageSize, queryTotalCount, search: searchParam } = tableState;

  const queryTotalPageCount = Math.ceil(queryTotalCount / queryPageSize);

  const {
    data: RES_DATA,
    error,
    isLoading,
    isFetched
  } = useFetchData(
    queryPageIndex,
    queryPageSize,
    queryTotalPageCount,
    queryKey,
    fetchData,
    searchParam,
    setTotalCountHandler
  );
  const tableColumns = useMemo(() => columnData, []);
  const tableData = useMemo(() => RES_DATA.data, [RES_DATA]);
  const navigate = useNavigate();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
    globalFilter,
    setGlobalFilter,
    visibleColumns
  } = useExpandableReactTableInsance(tableColumns, tableData, queryPageIndex, queryPageSize, queryTotalPageCount);
  const [openFilters, setOpenFilters] = useState(false);
  const [search, setSearch] = useState(globalFilter);
  const handleOpenFilters = () => setOpenFilters(!openFilters);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  useEffect(() => {
    setQueryPageIndexHandler({ pageIndexValue: pageIndex });
  }, [pageIndex]);

  useEffect(() => {
    setQueryPageSizeHandler({ pageSizeChangedValue: pageSize });
  }, [pageSize]);

  const entries = ['5', '10', '15', '20', '25'];
  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);
  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination item key={option} onClick={() => gotoPage(Number(option))} active={pageIndex === option}>
      {option + 1}
    </MDPagination>
  ));

  const handleDelete = (id) => {
    onDelete(id);
    handleCloseDelete();
  };
  // // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) => {
    return value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));
  };

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state

  // // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setSearchHandler({ searchChangedValue: value || '' });
    setQueryPageIndexHandler({ pageIndexValue: 0 });
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;
    if (isSorted && column.isSorted && column?.id !== 'expander' && column?.id !== 'action') {
      sortedValue = column.isSortedDesc ? 'desc' : 'asce';
    } else if (isSorted && column?.id !== 'expander' && column?.id !== 'action') {
      sortedValue = 'none';
    } else if (!isSorted || column?.id === 'expander' || column?.id === 'action') {
      sortedValue = false;
    }

    return sortedValue;
  };
  const renderRowSubComponent = useCallback(
    ({ row, rowProps, visibleColumns }) => <SubRows row={row} rowProps={rowProps} visibleColumns={visibleColumns} />,
    []
  );
  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd = pageSize * (pageIndex + 1) > queryTotalCount ? queryTotalCount : pageSize * (pageIndex + 1);

  if (isLoading) {
    return <Skeleton variant='rounded' animation='wave' sx={{ borderRadius: 5 }} height={600} />;
  }
  return (
    <TableContainer sx={{ boxShadow: 'none' }}>
      {queryPageSize || canSearch ? (
        <MDBox
          display='flex'
          justifyContent='space-between'
          p={3}
          sx={{
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: isSmallScreen ? 'flex-start' : 'center'
          }}
        >
          {queryPageSize && (
            <MDBox display='flex' alignItems='center'>
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size='small'
                sx={{ width: '5rem' }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant='caption' color='secondary' sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                entries per page
              </MDTypography>
            </MDBox>
          )}
          <MDBox display='flex' alignItems='center' justifyContent='space-between' width='20rem'>
            {canSearch && (
              <MDBox width='12rem' ml='auto'>
                <MDInput
                  placeholder='Search...'
                  value={search}
                  size='small'
                  fullWidth
                  onChange={({ currentTarget }) => {
                    setSearch(search);
                    onSearchChange(currentTarget.value);
                  }}
                />
              </MDBox>
            )}
            {canFilter && (
              <MDBox display='flex' alignItems='center' justifyContent='space-between' width='5rem' ml='auto'>
                <MDButton variant='text' onClick={handleOpenFilters}>
                  <Icon>filter_alt</Icon>
                  Filter
                </MDButton>
                <Dialog
                  open={openFilters}
                  onClose={handleOpenFilters}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>{"Use Google's location service?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                      Let Google help apps determine location. This means sending anonymous location data to Google,
                      even when no apps are running.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <MDButton variant='text' onClick={handleOpenFilters}>
                      Disagree
                    </MDButton>
                    <MDButton variant='text' onClick={handleOpenFilters}>
                      Agree
                    </MDButton>
                  </DialogActions>
                </Dialog>
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      ) : null}
      <Table {...getTableProps()}>
        <MDBox component='thead'>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <PlayerDataTableHeadCell
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : 'auto'}
                  align={column.align ? column.align : 'left'}
                  sorted={setSortedValue(column)}
                >
                  {column.render('Header')}
                </PlayerDataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              <Fragment key={key}>
                <PlayerDataTableBodyRow row={row} noEndBorder={noEndBorder} object={object} />
                {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display='flex'
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant='button' color='secondary' fontWeight='regular'>
              Showing {entriesStart} to {entriesEnd} of {queryTotalCount} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : 'gradient'}
            color={pagination.color ? pagination.color : 'info'}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width='5rem' mx={1}>
                <MDInput
                  inputProps={{ type: 'number', min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
PlayerDataTable.defaultProps = {
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: 'gradient', color: 'info' },
  isSorted: true,
  noEndBorder: false
};

// Typechecking props for the DataTable
PlayerDataTable.propTypes = {
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(['contained', 'gradient']),
    color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark', 'light'])
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool
};

export default PlayerDataTable;
