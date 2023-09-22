import React, { useState, useEffect, useRef } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import '../../../../Styles/ConfirmModal.css';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
    width: '30%',
    height: '500px',
    minWidth: '500px',
    bgcolor: 'background.paper',
    'border-radius': '10px',
    //   border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};



export default function AddActiveSubsModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [subscription, setSubscription] = useState([]);
    const [curSub, setCurSub] = useState([]);
    const [curDate, setCurDate] = useState(new Date());

    const confirmSend = () => {

        console.log(curSub);
        console.log(curDate);
        createActiveSubscription();
        props.confirmSend("confirm");
        handleClose();
    }


    const createActiveSubscription = () => {
        console.log(curSub.id);
        console.log(curDate.getMonth() + 1 + " " + curDate.getDate() + " " + curDate.getFullYear());


        var curDateThis = new Intl.DateTimeFormat('en-US',
            {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(curDate)

        adminSubscriptionService
            .createActiveSubscription(curSub.id,
                curDateThis

                , props.merchantId)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {

            })
    }

    const cancelSending = () => {
        props.confirmSend("cancel");
        handleClose();
    }

    const getSubscriptionList = () => {
        adminSubscriptionService
            .getSubscriptionList()
            .then((response) => {

                console.log(response);
                setSubscription(response);
            })
            .catch((error) => {

            })
    }

    const handleChange = (event) => {
        console.log(event.target);
        console.log(event.target.value);
        setCurSub(event.target.value);

    }

    useEffect(() => {
        /*
        setChecked((prev) => !prev);
        return () => {
          setChecked((prev) => !prev);
        };*/
        getSubscriptionList();
        if (props.showModal == true) {
            handleOpen();
            return;
        } else {
            handleClose();
            return
        }


    }, [props.showModal]);


    return (
        <ThemeProvider theme={theme}>
            <div className='confirmModal'>
                <Modal
                    // aria-labelledby="transition-modal-title"
                    // aria-describedby="transition-modal-description"
                    open={open}
                    onClose={cancelSending}

                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    className='modal'
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <div className='modalConfirmTitle'  >

                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={2}

                                    sx={{
                                        fontSize: 20, marginLeft: 3
                                    }}
                                >
                                    Add Subscription

                                </Stack>
                            </div>
                            <div className='modalText' >

                                <Stack
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}

                                    sx={{
                                        fontSize: 15, marginLeft: 3
                                    }}
                                >

                                    <Stack
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        spacing={2}

                                    >
                                        <div >
                                            Subscription Plan
                                        </div>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={5}
                                            sx={{ minWidth: '30px' }}
                                        >
                                            <FormControl sx={{ minWidth: '300px' }}>
                                                <InputLabel id="demo-simple-select-label">Select Subscription</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={curSub.name}
                                                    label="Subscription"
                                                    onChange={handleChange}
                                                >
                                                    {
                                                        Object.keys(subscription).map(function (key) {

                                                            return (<MenuItem value={subscription[key]}>{subscription[key].name}</MenuItem>)

                                                        }
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Stack>



                                    </Stack>


                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={12}
                                        sx={{ minWidth: '30px' }}
                                    >
                                        <div>Monthly Email Limit</div>
                                        <div >{curSub.emailVolume == null ? '-----' : curSub.emailVolume}</div>
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={13.8}
                                        sx={{ minWidth: '30px' }}
                                    >
                                        <div>Monthly SMS Limit</div>
                                        <div >{curSub.smsVolume == null ? '-----' : curSub.smsVolume}</div>
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={12}
                                        sx={{ minWidth: '30px' }}
                                    >
                                        <div>Subscription length</div>
                                        <div >{curSub.lengthInMonth == null ? '-----' : curSub.lengthInMonth}</div>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                        sx={{ minWidth: '30px' }}
                                    >
                                        <div>New Subscription Start</div>
                                        <div >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    displayStaticWrapperAs="desktop"
                                                    openTo="day"
                                                    value={curDate}
                                                    onChange={(dateValue) => {
                                                        setCurDate(new Date(dateValue));
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </Stack>

                                </Stack>


                            </div>
                            <Stack spacing={2} direction="column" alignItems="center">
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
