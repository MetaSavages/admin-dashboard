import React, { useEffect, useMemo, useState } from 'react';
import { IconButton, Icon, Tooltip, Checkbox } from '@mui/material';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import MDBox from 'components/MDBox';

import { Can } from 'context';

import { deleteCode } from 'services/codes';

import { getFirstObjectKey } from 'helpers';

const label = { inputProps: { 'aria-label': 'Checkbox code' } };

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const codesColumnData = [
  {
    width: 20,
    Header: (data) => {
      if (data?.data.length > 0) {
        const moreData = data.data[0].additionalData;
        if (
          moreData.queryPageIndex !== undefined &&
          moreData.queryPageIndex !== null &&
          moreData.queryPageSize !== undefined &&
          moreData.queryPageSize !== null
        ) {
          moreData.setQueryPageIndex(moreData.queryPageIndex);
          moreData.setQueryPageSize(moreData.queryPageSize);
        }
      }

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
              const allCodes = data.data.map((item) => item.code);
              data.data[0].additionalData.setHeaderCheck(true);
              data.data[0].additionalData.setArrayFromCodes((old) => {
                return [...new Set([...old, ...allCodes])];
              });
            } else {
              const existingCodes = data.data.map((item) => item.code);
              const currentCodesInSet = data.data[0].additionalData.arrayFromCodes;
              const validCodes = currentCodesInSet.filter((code) => !existingCodes.includes(code));

              data.data[0].additionalData.setArrayFromCodes(validCodes);
              data.data[0].additionalData.setHeaderCheck(false);
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
          checked={row.original.additionalData.arrayFromCodes.some((el) => el == row.original.code)}
          onChange={(e) => {
            if (e.target.checked) {
              row.original.additionalData.setArrayFromCodes([
                ...row.original.additionalData.arrayFromCodes,
                row.original.code
              ]);
            } else {
              const newArray = row.original.additionalData.arrayFromCodes.filter((item) => item !== row.original.code);
              row.original.additionalData.setArrayFromCodes(newArray);
            }
          }}
        />
      );
    },

    SubCell: () => null
  },
  {
    Header: 'Code Id',
    accessor: 'code_id'
  },
  {
    Header: 'code',
    accessor: 'code'
  },
  {
    Header: 'Claimed User',
    accessor: 'claimed_user'
  },
  {
    Header: 'Date Create',
    accessor: 'date_create'
  },
  {
    Header: 'Date Claimed',
    accessor: 'date_claimed'
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    sorted: false,
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const handleOpenModal = () => setShowModal(true);
      const handleCloseModal = () => setShowModal(false);
      const [deletePromoCode, setDeletePromoCode] = useState('');
      const [searchParams, setSearchParams] = useSearchParams();
      const [firstObjectKey, setFirstObjectKey] = useState();

      return (
        <>
          <MDBox sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {/* <Can I='update' a='casino'>
              <Tooltip title='Edit'>
                <NavLink to={`/casinos/edit/${row.original.casino_id}`}>
                  <MDTypography fontSize='0.875rem'>
                    <IconButton size='small' color='info'>
                      <Icon fontSize='small'>edit</Icon>
                    </IconButton>
                  </MDTypography>
                </NavLink>
              </Tooltip>
            </Can> */}
            <Can I='delete' a='promocode'>
              <Tooltip
                title='Delete'
                onClick={() => {
                  handleOpenModal();
                  setDeletePromoCode(row.original.code);
                  setFirstObjectKey(getFirstObjectKey(row.original));
                }}
              >
                <IconButton size='small' color='error'>
                  <Icon fontSize='small'>delete</Icon>
                </IconButton>
              </Tooltip>
            </Can>
          </MDBox>

          <Dialog
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{'Are you sure you want to delete this casino?'}</DialogTitle>
            <DialogActions>
              <Button
                onClick={async () => {
                  searchParams.set('code', deletePromoCode);

                  await deleteCode(row.original.code).then(() => {
                    if (row.original.additionalData.arrayFromCodes) {
                      const newArray = row.original.additionalData.arrayFromCodes.filter(
                        (item) => item !== row.original.code
                      );
                      row.original.additionalData.setArrayFromCodes(newArray);
                    }
                  });
                  setSearchParams(searchParams);

                  handleCloseModal();
                }}
              >
                Yes
              </Button>
              <Button onClick={handleCloseModal}>No</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  }
];

export default codesColumnData;
