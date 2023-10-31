import React from 'react';
import { IconButton, Icon, Tooltip } from '@mui/material';
import MDBox from 'components/MDBox';
import { NavLink } from 'react-router-dom';
import MDTypography from 'components/MDTypography';

const dataCasinos = {
  columns: [
    {
      Header: 'Casino Id',
      accessor: 'casino_id'
    },
    {
      Header: 'Casino name',
      accessor: 'casino_name'
    },
    {
      Header: 'Currency',
      accessor: 'currency'
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
  ],
  rows: [
    {
      casino_id: '1',
      casino_name: 'Casino 1',
      currency: 'CS1',
      active_players: '1,000'
    },
    {
      casino_id: '2',
      casino_name: 'Casino 2',
      currency: 'CS2',
      active_players: '1,000'
    },
    {
      casino_id: '3',
      casino_name: 'Casino 3',
      currency: 'CS3',
      active_players: '1,000'
    },
    {
      casino_id: '4',
      casino_name: 'Casino 4',
      currency: 'CS4',
      active_players: '1,000'
    },
    {
      casino_id: '5',
      casino_name: 'Casino 5',
      currency: 'CS5',
      active_players: '1,000'
    }
  ]
};

export default dataCasinos;
