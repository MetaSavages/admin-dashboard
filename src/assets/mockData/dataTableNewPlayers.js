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
