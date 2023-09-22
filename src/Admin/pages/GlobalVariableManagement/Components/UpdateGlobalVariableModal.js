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
    width: '675px',
    height: '500px',
    minWidth: '500px',
    bgcolor: 'background.paper',
    'border-radius': '10px',
    //   border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};



export default function UpdateGlobalVariableModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [subscription, setSubscription] = useState([]);
    const [curSub, setCurSub] = useState([]);
    const [curDate, setCurDate] = useState(new Date());

    const [curDataType, setCurDataType] = useState("String");
    const [variable, setVariable] = useState([]);

    const confirmSend = () => {

        console.log(curSub);
        console.log(curDate);
        createActiveSubscription();
        props.confirmSend("confirm");
        handleClose();
    }


    const createActiveSubscription = () => {
        const user = JSON.parse(window.localStorage.getItem("userData"));
        console.log(user);
        console.log(curSub.id);
        console.log(curDate.getMonth() + 1 + " " + curDate.getDate() + " " + curDate.getFullYear());


        globalVariablesService
            .updateGlobalVariable(variable, user.merchantId)
            .then((response) => {
                console.log(response);
                props.confirm("confirm");
            })
            .catch((error) => {

            })
    }

    const cancelSending = () => {
        // props.confirmSend("cancel");
        handleClose();
    }



    const handleChangeDataType = (prop) => (event) => {

        setCurDataType(event.target.value);


        setVariable(null);

        setVariable({ ...variable, [prop]: event.target.value });


    }




    const handleChange = (prop) => (event) => {

        setVariable({ ...variable, [prop]: event.target.value });


    }


    const showString = () => {

        return (
            <>
                <Grid item xs={4}>
                    <div className='globalVariableText'>
                        Format
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ minWidth: '300px' }}>
                        <InputLabel id="formatLabel">Select format</InputLabel>
                        <Select
                            labelId="formatLabel"
                            id="formatString"
                            value={variable.format}
                            label="Select format"
                            onChange={handleChange("format")}
                        >


                            <MenuItem value='/^[a-zA-Z ]*$/'>Alphabet with space</MenuItem>
                            <MenuItem value='/^[A-Za-z]+$/;'>Alphabet no space</MenuItem>
                            <MenuItem value='/^[\w\-\s]+$/'>Alphanumeric with space</MenuItem>
                            <MenuItem value='/^[\w\-]+$/'>Alphanumeric no space (A-Z, 0-9)</MenuItem>
                            <MenuItem value='/^\d{1,45}$/'>String Numbers (0-9)</MenuItem>
                            <MenuItem value='/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/'>E-mail address</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <div className='globalVariableText'>
                        Min. Length
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={variable.min}
                        onChange={handleValueChange('min')}
                        id="outlined-basic" label="Set Min. Length" variant="outlined" />

                </Grid>
                <Grid item xs={4}>
                    <div className='globalVariableText'>
                        Max. Length
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={variable.max}
                        onChange={handleValueChange('max')}
                        id="outlined-basic" label="Set Max. Length" variant="outlined" />

                </Grid>
                <Grid item xs={4}>
                    <div className='globalVariableText'>
                        Always Visible
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Checkbox
                        checked={variable.alwaysVisible}
                        onChange={handleValueChange('alwaysVisible')}
                    />

                </Grid>
                <Grid item xs={4}>
                    <div className='globalVariableText'>

                    </div>
                </Grid>
                <Grid item xs={6}>
                    {saveButton()}
                </Grid>
            </>
        );
    }


    const showNumeric = () => {

        return (
            <>
                <Grid item xs={4}>
                    <div className='globalVariableText'>
                        Format
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ minWidth: '300px' }}>
                        <InputLabel id="formatLabel">Select format</InputLabel>
                        <Select
                            labelId="formatLabel"
                            id="formatString"
                            value={variable.format}
                            label="Select format"
                            onChange={handleChange("format")}
                        >
                            <MenuItem value='#,###.00'>Amount (###,###,###.##)</MenuItem>
                            <MenuItem value='#,###.00 PHP'>Amount with Peso (###,###,###.## PHP)</MenuItem>
                            <MenuItem value='#.00"%"'>Percentage (##.##)</MenuItem>
                            <MenuItem value='#####'>Integer</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <div className='globalVariableText'>
                        Min. Value
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={variable.min}
                        onChange={handleValueChange('min')}
                        id="outlined-basic" label="Set Min. Value" variant="outlined" />

                </Grid>
                <Grid item xs={4}>
                    <div className='globalVariableText'>
                        Max. Value
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={variable.max}
                        onChange={handleValueChange('max')}
                        id="outlined-basic" label="Set Max. Value" variant="outlined" />

                </Grid>
                <Grid item xs={4}>
                    <div className='globalVariableText'>
                        Always Visible
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Checkbox
                        checked={variable.alwaysVisible}
                        onChange={handleValueChange('alwaysVisible')}
                    />

                </Grid>

                <Grid item xs={4}>
                    <div className='globalVariableText'>

                    </div>
                </Grid>
                <Grid item xs={6}>
                    {saveButton()}

                </Grid>
            </>
        );
    }


    const cancelButton = () => {
        handleClose();
        props.confirm("confirm");
    }

    const saveButton = () => {

        return (
            <Stack direction="row" >
                <Button
                    onClick={e => createActiveSubscription()}
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

                    Save
                </Button>
                <Button
                    onClick={e => cancelButton()}
                    sx={{
                        minWidth: 100,
                        width: 100,
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
        );
    }


    const showDate = () => {

        return (
            <>
                <Grid item xs={4}>
                    <div className='globalVariableText'>
                        Format
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ minWidth: '300px' }}>
                        <InputLabel id="formatLabel">Select format</InputLabel>
                        <Select
                            labelId="formatLabel"
                            id="formatString"
                            value={variable.format}
                            label="Select format"
                            onChange={handleChange("format")}
                        >

                            <MenuItem value='dd/MM/yyyy'>DD/MM/YYYY</MenuItem>


                        </Select>
                    </FormControl>

                </Grid>

                <Grid item xs={4}>
                    <div className='globalVariableText'>
                        Always Visible
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Checkbox
                        checked={variable.alwaysVisible}
                        onChange={handleValueChange('alwaysVisible')}
                    />

                </Grid>
                <Grid item xs={4}>
                    <div className='globalVariableText'>

                    </div>
                </Grid>
                <Grid item xs={6}>
                    {saveButton()}
                </Grid>
            </>
        );
    }


    const handleValueChange = (prop) => (event) => {

        if (prop === 'alwaysVisible') {
            setVariable({ ...variable, [prop]: event.target.checked });
        } else {

            setVariable({ ...variable, [prop]: event.target.value });
        }

        console.log(variable);

    };



    useEffect(() => {


        console.log(props.variable.name);



        setCurDataType(props.variable.type);

        setVariable({
            ...variable, ["name"]: props.variable.name,
            ...variable, ["type"]: props.variable.type,
            ...variable, ["format"]: props.variable.format,
            ...variable, ["max"]: props.variable.max,
            ...variable, ["min"]: props.variable.min,
            ...variable, ["alwaysVisible"]: props.variable.alwaysVisible,
            ...variable, ["id"]: props.variable.id
        });

        console.log(variable);


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
                                    <Grid item xs={6}>
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
                                                Update Variable

                                            </Stack>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {/* <Item>2</Item> */}
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className='globalVariableText'>
                                            Variable Name
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="outlined-basic" label="Set Variable Name" variant="outlined"
                                            value={variable.name}
                                            onChange={handleValueChange('name')}
                                        />

                                    </Grid>

                                    <Grid item xs={4}>
                                        <div className='globalVariableText'>
                                            Data Type
                                        </div>
                                    </Grid>


                                    <Grid item xs={6}>
                                        <FormControl sx={{ minWidth: '300px' }}>
                                            <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={curDataType}
                                                label="Data Type"
                                                onChange={handleChangeDataType("type")}
                                            >
                                                {/* {
                                                    Object.keys(subscription).map(function (key) {

                                                        return (<MenuItem value={subscription[key]}>{subscription[key].name}</MenuItem>)

                                                    }
                                                    )
                                                } */}

                                                <MenuItem value='String'>String</MenuItem>
                                                <MenuItem value='Numeric'>Numeric</MenuItem>
                                                <MenuItem value='Date'>Date</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {curDataType == 'String' ? showString() : null}

                                    {curDataType == 'Numeric' ? showNumeric() : null}

                                    {curDataType == 'Date' ? showDate() : null}


                                </Grid>
                            </Box>





                        </Box>
                    </Fade>
                </Modal>

            </div>
        </ThemeProvider >
    );
}
