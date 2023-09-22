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
import { globalVariablesService } from '../../../../AdminServices/globalVariable.service';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import e from 'cors';
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
    width: '445px',
    height: '357px',
    minWidth: '445px',
    bgcolor: 'background.paper',
    'border-radius': '10px',
    //   border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};



export default function AddGlobalVariableModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [subscription, setSubscription] = useState([]);
    const [curSub, setCurSub] = useState([]);
    const [curDate, setCurDate] = useState(new Date());

    const [curDataType, setCurDataType] = useState("");
    const [variable, setVariable] = useState([]);

    const confirmSend = () => {

        console.log(curSub);
        console.log(curDate);
        // createActiveSubscription();
        props.confirmSend("confirm");
        handleClose();
    }


    const deleteGlobalVariable = () => {
        const user = JSON.parse(window.localStorage.getItem("userData"));
        console.log(user);
        console.log(props.varId);

        globalVariablesService
            .deleteGlobalVariable(props.varId, user.merchantId)
            .then((response) => {
                props.confirm("confirm");
                handleClose();
                console.log(response);
            }).catch((error) => {

            })

            handleClose();
    }

    const cancelSending = () => {
        // props.confirmSend("cancel");
        handleClose();
    }




    const cancelButton = () => {
        handleClose();
        props.confirm("confirm");
    }

    useEffect(() => {
        /*
        setChecked((prev) => !prev);
        return () => {
          setChecked((prev) => !prev);
        };*/
        // getSubscriptionList();
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



                            <Box sx={{ width: '100%' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={12}>
                                        <div className='modalConfirmTitle'  >

                                            <Stack
                                                direction="column"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                spacing={2}

                                                sx={{
                                                    fontSize: 20
                                                }}
                                            >

                                                <div className='deleteTitle'> Delete Global Variable ? </div>
                                                <div className='deleteVarName'>{props.varName}</div>
                                            </Stack>
                                        </div>
                                    </Grid>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={4}>

                                        <Stack direction="column" >
                                            <Button
                                                onClick={e => deleteGlobalVariable()}
                                                sx={{
                                                    minWidth: 190,
                                                    width: 190,
                                                    margin: 1,
                                                    border: 1,
                                                    borderColor: 'orange',
                                                    color: 'white',
                                                    backgroundColor: 'orange',
                                                    ":hover": {
                                                        backgroundColor: 'white', color: 'orange',
                                                        BorderColor: 'orange', border: 1
                                                    },
                                                }}
                                            >

                                                Delete
                                            </Button>
                                            <Button
                                                onClick={e => cancelButton()}
                                                sx={{
                                                    minWidth: 100,
                                                    width: 190,
                                                    margin: 1,
                                                    border: 1,
                                                    borderColor: 'orange',
                                                    color: 'orange',
                                                    backgroundColor: 'white',
                                                    ":hover": {
                                                        backgroundColor: 'orange', color: 'white',
                                                        BorderColor: 'orange', border: 1
                                                    },
                                                }}
                                            >

                                                Cancel
                                            </Button>

                                        </Stack>
                                    </Grid>

                                    {/* {curDataType == 'Date' ? showDate() : null} */}


                                </Grid>
                            </Box>





                        </Box>
                    </Fade>
                </Modal>

            </div>
        </ThemeProvider >
    );
}
