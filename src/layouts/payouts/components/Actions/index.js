import { useEffect, useState } from 'react';
// prop-type is a library for typechecking of props
import PropTypes from 'prop-types';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { IconButton, Icon, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Modal, ModalBody } from 'react-bootstrap';
import TooltipAction from '../TooltipAction'

function Actions(props) {
    return(
        <MDBox
        sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
        }}
        >
            <TooltipAction title={'Approve'} color={'success'} icon={'check'} action={'approve'}></TooltipAction>
            <TooltipAction title={'Reject'} color={'error'} icon={'close'} action={'reject'}></TooltipAction>
            <Tooltip title='View history'>
            <IconButton variant='determinate' size='small' color='info'>
                <NavLink
                to={`/analytics/event-history?${props.queryStringParams}`}
                style={{
                    height: '16px',
                    width: '18px'
                }}
                >
                <MDTypography
                    variant='body2'
                    fontWeight='light'
                    color='info'
                    sx={{
                    height: '18px',
                    width: '18px'
                    }}
                >
                    <Icon
                    sx={{
                        height: '18px',
                        width: '18px'
                    }}
                    >
                    history
                    </Icon>
                </MDTypography>
                </NavLink>
            </IconButton>
            </Tooltip>
        </MDBox>
    )
}

export default Actions;