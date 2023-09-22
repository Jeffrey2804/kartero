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
    height: '300px',
    minWidth: '500px',
    bgcolor: 'background.paper',
    'border-radius': '10px',
    //   border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};



export default function DeleteActiveSubModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [subscription, setSubscription] = useState([]);
    const [curSubId, setCurSubId] = useState(props.subId);

    const confirmSend = () => {

        // console.log(curSub);
        // console.log(curDate);
        // createActiveSubscription();
        props.confirmSend("confirm");
        deleteActiveSubscription();
        handleClose();
    }


    const deleteActiveSubscription = () => {

        console.log(props.subId +"  " +props.merchantId);

        adminSubscriptionService
            .deleteActiveSubscription(props.subId, props.merchantId)
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
        // setCurSub(event.target.value);

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
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}

                                    sx={{
                                        fontSize: 20
                                    }}
                                >
                                    Warning

                                </Stack>
                            </div>
                            <div className='modalText' >



                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}

                                >
                                    <div >
                                        Are you sure you want to Delete ?<b> {props.subName}</b>
                                    </div>




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
