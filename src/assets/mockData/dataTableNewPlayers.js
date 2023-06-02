import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { Box, Typography, CircularProgress } from '@mui/material';
import React from 'react';

const dataTableNewPlayersData = {
  columns: [
    {
      Header: 'Username',
      accessor: 'username'
    },
    {
      Header: 'Refferal',
      accessor: 'refferal'
    },
    {
      Header: 'Deposit',
      accessor: 'deposit'
    },
    {
      Header: 'KYC Status',
      accessor: 'kyc_status',
      Cell: ({ row }) => (
        // Use Cell to render an expander for each row.
        // We can use the getToggleRowExpandedProps prop-getter
        // to build the expander.
        <MDBox sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant='determinate'
            color={row.original.kyc_status === 100 ? 'success' : 'info'}
            value={row.original.kyc_status}
          />
          <MDBox
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MDTypography variant='caption' component='div'>
              {`${Math.round(row.original.kyc_status)}%`}
            </MDTypography>
          </MDBox>
        </MDBox>
      )
    }
  ],
  rows: [
    {
      username: 'Player 1',
      refferal: 'Casino 2',
      deposit: '$100',
      kyc_status: 50
    },
    {
      username: 'Player 2',
      refferal: 'Casino 3',
      deposit: '$100',
      kyc_status: 50
    },
    {
      username: 'Player 3',
      refferal: 'Casino 4',
      deposit: '$100',
      kyc_status: 80
    },
    {
      username: 'Player 4',
      refferal: 'Casino 5',
      deposit: '$100',
      kyc_status: 100
    },
    {
      username: 'Player 5',
      refferal: 'Casino 6',
      deposit: '$100',
      kyc_status: 0
    },
    {
      username: 'Player 6',
      refferal: 'Casino 7',
      deposit: '$100',
      kyc_status: 25
    }
  ]
};

export default dataTableNewPlayersData;
