import React, { useEffect, useState } from 'react';
import { IconButton, Icon, Tooltip, Checkbox } from '@mui/material';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const label = { inputProps: { 'aria-label': 'Checkbox player' } };

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const emailColumnData = [
  {
    width: 20,
    Header: (data) => {
      console.log();
      return (
        <Checkbox
          sx={{ marginLeft: '25px' }}
          {...label}
          icon={icon}
          checkedIcon={checkedIcon}
          checked={data?.data[0]?.additionalData?.headerCheck ? data?.data[0]?.additionalData?.headerCheck : false}
          onChange={(e) => {
            data.data[0].additionalData.setHeaderCheck(e.target.checked);
            if (e.target.checked) {
              const allPlayers = data.data.map((item) => item.id);
              data.data[0].additionalData.setArrayOfPlayers(allPlayers);
            } else {
              data.data[0].additionalData.setArrayOfPlayers([]);
            }
          }}
        />
      );
    },
    id: 'checked',
    Cell: ({ row }) => {
      return (
        <Checkbox
          {...label}
          icon={icon}
          checkedIcon={checkedIcon}
          checked={row.original.additionalData.arrayOfPlayers.some((el) => el == row.original.id)}
          onChange={(e) => {
            if (e.target.checked) {
              row.original.additionalData.setArrayOfPlayers([
                ...row.original.additionalData.arrayOfPlayers,
                row.original.id
              ]);
            } else {
              const newArray = row.original.additionalData.arrayOfPlayers.filter((item) => item !== row.original.id);
              row.original.additionalData.setArrayOfPlayers(newArray);
            }
          }}
        />
      );
    },

    SubCell: () => null
  },
  {
    Header: 'Username',
    accessor: 'nickname'
  },
  {
    Header: 'email',
    accessor: 'email'
  },
  {
    Header: 'Wallet',
    accessor: 'wallet'
  },
  {
    Header: 'Location',
    accessor: 'location'
  },
  {
    Header: 'KYC Status',
    accessor: 'kyc_status'
  },
];

export default emailColumnData;