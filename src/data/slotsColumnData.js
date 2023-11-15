import React from 'react';
import { IconButton, Icon, Tooltip } from '@mui/material';
import MDBox from 'components/MDBox';
import { NavLink } from 'react-router-dom';
import MDTypography from 'components/MDTypography';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { deleteCasino } from 'services/casinos';
import { Can } from 'context';

export const slotsColumnData = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Slot name',
    accessor: 'name'
  },
  {
    Header: 'Provider',
    accessor: 'provider'
  },
  {
    Header: 'RTP',
    accessor: 'rtp'
  },
  {
    Header: 'Promo Index',
    accessor: 'promoIndex'
  },
  {
    Header: 'Is Unreal',
    accessor: 'isUnreal'
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    sorted: false,
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const handleOpenModal = () => setShowModal(true);
      const handleCloseModal = () => setShowModal(false);
      const [deleteCasinoId, setDeleteCasinoId] = useState('');

      return (
        <>
          <MDBox sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Can I='update' a='casino'>
              <Tooltip title='Edit'>
                <NavLink to={`/slots/edit/${row.original.id}`}>
                  <MDTypography fontSize='0.875rem'>
                    <IconButton size='small' color='info'>
                      <Icon fontSize='small'>edit</Icon>
                    </IconButton>
                  </MDTypography>
                </NavLink>
              </Tooltip>
            </Can>
          </MDBox>
        </>
      );
    }
  }
];
