import React, { useState, useEffect, useRef } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import '../../../../Styles/SubscriptionModal.css';
import { adminSubscriptionService } from '../../../../AdminServices/subscription.service';

const theme = createTheme({
    palette: {
        primary: {

            main: '#FD9A08',
            contrastText: '#fff',
        },
        secondary: {

            main: '#FFFFFF',
        },
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '400px',
    bgcolor: 'background.paper',
    'border-radius': '10px',
    //   border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};

export default function DeleteSubscriptionPlan(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteSubscription = () => {
        adminSubscriptionService.deleteSubscription(
            props.subscriptionID
        ).then((response) => {

        }).catch((error) => {

        })
    }

    const confirmSend = () => {
        props.deleteSubscription("delete");
        deleteSubscription();
        handleClose();
    }
    const cancelSending = () => {
        props.deleteSubscription("cancel");
        handleClose();
    }
    useEffect(() => {
        if (props.showDeleteModal == true) {
            handleOpen();
            return;
        } else {
            handleClose();
            return
        }
    }, [props.showDeleteModal]);


    return (
        <ThemeProvider theme={theme}>
            <div className='confirmModal'>
                <Modal
                    open={open}
                    onClose={cancelSending}

                    closeAfterTransition
                    className='modal'
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <div className='modalTitle'  >
                                Confirm Delete
                            </div>
                            <div className='modalText' >
                                <Stack
                                    direction="column"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={4}
                                >
                                    <Box>
                                        <Grid container>
                                            <Grid item xs={0.5} />
                                            <Grid item xs={11.5}>
                                                <div className='modalText'>
                                                    Are you sure you want to delete subscription plan: {props.subscriptionName}?
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Stack>
                            </div>
                            <Stack spacing={2} direction="row-reverse" alignItems="flex-end" justifyContent="flex-start">
                                <div/>
                                <Button variant="contained" onClick={confirmSend} className='buttonModal'>Delete</Button>
                                <Button variant="text" onClick={cancelSending} className='buttonModal'>Cancel</Button>
                            </Stack>

                        </Box>
                    </Fade>
                </Modal>

            </div>
        </ThemeProvider>
    );
}