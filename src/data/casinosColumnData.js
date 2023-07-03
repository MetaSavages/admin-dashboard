import React from 'react';
import { IconButton, Icon, Tooltip } from '@mui/material';
import MDBox from 'components/MDBox';
import { NavLink } from 'react-router-dom';
import MDTypography from 'components/MDTypography';

export const casinosColumnData = [
  {
    Header: 'Casino Id',
    accessor: 'casino_id'
  },
  {
    Header: 'Casino name',
    accessor: 'casino_name'
  },
  {
    Header: 'Provider',
    accessor: 'provider'
  },
  {
    Header: 'Active players',
    accessor: 'active_players'
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    sorted: false,
    Cell: ({ row }) => {
      return (
        <MDBox sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Tooltip title='Edit'>
            <NavLink to={`/casinos/edit/${row.original.casino_id}`}>
              <MDTypography fontSize='0.875rem'>
                <IconButton size='small' color='info'>
                  <Icon fontSize='small'>edit</Icon>
                </IconButton>
              </MDTypography>
            </NavLink>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton size='small' color='error'>
              <Icon fontSize='small'>delete</Icon>
            </IconButton>
          </Tooltip>
        </MDBox>
      );
    }
  }
];
