import { IconButton, Icon, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, TextField } from '@mui/material';
import { useState } from 'react';

function TooltipAction(props) {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    function actionModal(action) {
        return( 
            <Dialog
                open={showModal}
                onClose={handleCloseModal}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {'Are you sure you want to '} 
                    <span style={{textTransform: 'uppercase'}}>
                        {props.action} 
                    </span>
                    {' this payout?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{paddingBottom: 1}}>Type a reason {props.action == 'reject' ? '*' : ''}</DialogContentText>
                    <TextField sx={{width: '100%'}}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Discard</Button>
                    <Button onClick={handleCloseModal}>
                        {action == 'approve' ? 'Approve payout' : 'Reject payout'}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return(
        <>
            {actionModal(props.action)}
            <Tooltip title={props.title}>
                <IconButton
                    variant='determinate'
                    size='small'
                    color={props.color}
                    onClick={() => {
                        handleOpenModal();
                    }}
                >
                    <Icon>{props.icon}</Icon>
                </IconButton>
            </Tooltip>
        </>
        
    )
}

export default TooltipAction;