import React, { useState, useEffect, useRef } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
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
    width: '50vw',
    height: '400px',
    
    bgcolor: 'background.paper',
    'border-radius': '10px',
    //   border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};

export default function CreateSubscriptionPlan(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [subscriptionData, setSubscriptionData] = useState({
        name: '',
        emailVolume: '',
        smsVolume: '',
        lengthInMonth: '',
        accountCreationVisible: true
    })

    const createSubscription = () => {
        adminSubscriptionService.createNewSubscription(
            subscriptionData
        ).then((response) => {

        }).catch((error) => {

        })
    }

    const handleChange = (prop) => (event) => {
        if(prop === 'accountCreationVisible'){
            setSubscriptionData({...subscriptionData, [prop]: event.target.checked});
        } else {
            setSubscriptionData({...subscriptionData, [prop]: event.target.value});
        }
    };

    const {accountCreationVisible} = subscriptionData.accountCreationVisible;

    const confirmSend = () => {
        props.createSubscription("create");
        createSubscription();
        handleClose();
    }
    const cancelSending = () => {
        props.createSubscription("cancel");
        handleClose();
    }
    useEffect(() => {
        if (props.showCreateModal == true) {
            handleOpen();
            return;
        } else {
            handleClose();
            return
        }
    }, [props.showCreateModal]);


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
                                Create Subscription Plan
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
                                            <Grid item xs={5.5}>
                                                <div className='formColumnTitle'>
                                                    Subscription Plan
                                                </div>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <div className='formColumnContentHolder'>
                                                    <TextField fullWidth size='small'
                                                        onChange={handleChange('name')}
                                                        value={subscriptionData.name}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} />

                                            <Grid item xs={0.5} />
                                            <Grid item xs={5.5}>
                                                <div className='formColumnTitle'>
                                                    Monthly Email Limit
                                                </div>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <div className='formColumnContentHolder'>
                                                    <TextField type='number' fullWidth size='small'
                                                        onChange={handleChange('emailVolume')}
                                                        value={subscriptionData.emailVolume}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} />

                                            <Grid item xs={0.5} />
                                            <Grid item xs={5.5}>
                                                <div className='formColumnTitle'>
                                                     Monthly SMS Limit
                                                </div>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <div className='formColumnContentHolder'>
                                                    <TextField type='number' fullWidth size='small'
                                                        onChange={handleChange('smsVolume')}
                                                        value={subscriptionData.smsVolume}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} />

                                            <Grid item xs={0.5} />
                                            <Grid item xs={5.5}>
                                                <div className='formColumnTitle'>
                                                    Subscription Period
                                                </div>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <div className='formColumnContentHolder'>
                                                    <TextField type='number' fullWidth size='small'
                                                        onChange={handleChange('lengthInMonth')}
                                                        value={subscriptionData.lengthInMonth}
                                                    /> 
                                                </div>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <div className='formColumnContentHolder'>
                                                    Months
                                                </div>
                                            </Grid>
                                            <Grid item xs={2} />

                                            <Grid item xs={0.5} />
                                            <Grid item xs={5.5}>
                                                <div className='formColumnTitle'>
                                                    Show on Account Creation
                                                </div>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <div className='formColumnContentHolder'>
                                                    {/* <CheckBox checked={}/> */}
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox checked={accountCreationVisible}
                                                                onChange={handleChange('accountCreationVisible')}
                                                                name='accountCreationVisible'  
                                                                value={subscriptionData.accountCreationVisible}
                                                            />
                                                        }
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} />
                                        </Grid>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction="row-reverse" alignItems="flex-end" justifyContent="flex-start">
                                    <div/>
                                    <Button variant="contained" onClick={confirmSend} className='buttonModal'>Create</Button>
                                    <Button variant="text" onClick={cancelSending} className='buttonModal'>Cancel</Button>
                            </Stack>
                            </div>
                            

                        </Box>
                    </Fade>
                </Modal>

            </div>
        </ThemeProvider>
    );
}