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

export default function UpdateSubscriptionPlan(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [subscriptionData, setSubscriptionData] = useState(props.subscriptionVisibility)

    console.log(subscriptionData)

    const handleChange = () => () => {
        setSubscriptionData(!subscriptionData);
    };

    const updateSubscription = () => {
        adminSubscriptionService.updateSubscriptionVisibility(
            props.subscriptionID,
            subscriptionData
        ).then((response) => {

        }).catch((error) => {

        })
    }

    const confirmSend = () => {
        props.updateSubscription("update");
        updateSubscription();
        handleClose();
    }
    const cancelSending = () => {
        props.updateSubscription("cancel");
        handleClose();
    }
    useEffect(() => {

        
        if (props.showUpdateModal == true) {
            handleOpen();
            return;
        } else {
            handleClose();
            return
        }
    }, [props.showUpdateModal]);


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
                                Edit subscription Plan
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
                                            <Grid item xs={6}>
                                                <div className='formColumnTitle'>
                                                    Subscription Plan
                                                </div>
                                            </Grid>
                                            <Grid item xs={5.5}>
                                                <div className='formColumnContentHolder'>
                                                    {props.subscriptionName}
                                                </div>
                                            </Grid>

                                            <Grid item xs={0.5} />
                                            <Grid item xs={6}>
                                                <div className='formColumnTitle'>
                                                    Show on Account Creation
                                                </div>
                                            </Grid>
                                            <Grid item xs={5.5}>
                                                <div className='formColumnContentHolder'>
                                                    {/* <CheckBox/> */}
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox checked={subscriptionData}
                                                                onChange={handleChange()}
                                                                name='accountCreationVisible'  
                                                                value={subscriptionData}
                                                            />
                                                        }
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Stack>
                            </div>
                            <Stack spacing={2} direction="row-reverse" alignItems="flex-end" justifyContent="flex-start">
                                <div/>
                                <Button variant="contained" onClick={confirmSend} className='buttonModal'>Save</Button>
                                <Button variant="text" onClick={cancelSending} className='buttonModal'>Cancel</Button>
                            </Stack>

                        </Box>
                    </Fade>
                </Modal>

            </div>
        </ThemeProvider>
    );
}