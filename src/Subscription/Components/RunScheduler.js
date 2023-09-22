import React, { useState, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../Styles/RunScheduler.css';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { Grid } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import RunScheduleConfirmModal from './RunScheduleConfirmModal';
import { configService } from '../../Services/config.service';

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { subscriptionService } from '../../Services/subscription.service';
import { styled } from "@mui/material/styles";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "rgb(148, 147, 147)",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: 'none'
    },
}));

function RunScheduler() {

    // const [value, setValue] = useState(dayjs());
    const [timeValue, setTimeValue] = useState(dayjs('2018-01-01T00:00:00.000Z'));
    const [dateValue, setDateValue] = useState(dayjs());
    const [dayOfTheMonth, setDayOfTheMonth] = useState("");
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [scheduledRun, setScheduledRun] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [dueDate, setDueDate] = useState("");
    const [currentTemplateId, setCurrentTemplateId] = useState("");
    const daysInAMonth = ['1st', '2nd', '3rd', '4th', '5th', '6th',
        '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th',
        '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th',
        '25th', '26th', '27th', '28th',];

    const updateScheduledRun = () => {
        const templateId = window.localStorage.getItem("tId");
        setOpen(false);
        updateDue(templateId);
        updateDelivery(templateId);
    }



    const updateDelivery = (templateId) => {

        configService
            .updateDayOfTheMonthDelivery(
                templateId,
                dayOfTheMonth)
            .then((response) => {


                if (response !== null) {
                    setOpen(true);
                } else {
                    // setErrorOpen(true);
                }
            })
            .catch((error) => {


            });
    }



    const addDueDateAndGetDay = () => {


    }




    const updateDue = (templateId) => {

        console.log();
        configService
            .updateDayOfTheMonthDue(
                templateId,
                dueDate)
            .then((response) => {


                if (response !== null) {
                    setOpen(true);
                } else {
                    // setErrorOpen(true);
                }
            })
            .catch((error) => {


            });
    }





    const updateScheduledRunWithDueDate = () => {
        setOpen(false);
        console.log();
        configService
            .updateScheduledRunWithDueDate(
                "7b16102b-65ab-466b-bd86-31ba4d158043",
                dayOfTheMonth, dueDate)
            .then((response) => {


                if (response !== null) {
                    setOpen(true);
                } else {
                    // setErrorOpen(true);
                }
            })
            .catch((error) => {


            });
    }

    const viewConfirmModal = () => {
        setShowConfirmModal(true);
    }

    const getTemplateName = () => {
        // const templateId = window.localStorage.getItem("tId");
        return currentTemplateId.substring(0, 4);
    }

    const getScheduledRun = () => {
        const templateId = window.localStorage.getItem("tId");
        getDueDate(templateId);
        getDeliveryDate(templateId);

    }

    const getDueDate = (templateId) => {

        configService
            .getDayOfDue(
                templateId)
            .then((response) => {
                console.log(response);
                setDueDate(response);
            })
            .catch((error) => {
            });
    }

    const getDeliveryDate = (templateId) => {

        configService
            .getDayOfDelivery(
                templateId)
            .then((response) => {
                setDayOfTheMonth(response);
            })
            .catch((error) => {
            });
    }
    const handleChange = (event) => {
        setDayOfTheMonth(event.target.value);
    };
    const handleDueChange = (event) => {
        setDueDate(event.target.value);
    };

    const handleChangeDuedate = (event) => {
        setDueDate(event.target.value);
    }


    const handleConfirm = (isConfirmed) => {
        if (isConfirmed === 'confirm') {
            // updateScheduledRunWithDueDate();
            updateScheduledRun();
            setShowConfirmModal(false);
        } else {

            setShowConfirmModal(false);

        }
    }

    const getSubscriptionStatus = (merchantId) => {

        subscriptionService
            .getCurrentSubscription(merchantId)
            .then((response) => {
                // localStorage.setItem("subData", JSON.stringify(response));
                // localStorage.setItem("tId", response.activeTemplateId);
                console.log(response);
                // setSubscription(response);
                setCurrentTemplateId(response.activeTemplateId);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {
        getScheduledRun();

        const userData = window.localStorage.getItem("userData");
        console.log(userData);
        if (userData !== null) {
            // setUserData(JSON.parse(userData));

            getSubscriptionStatus(JSON.parse(userData).merchantId);
        } else {

            console.log("empty");
        }
        return () => {
        };
    }, []);

    return (
        <div className='grid justify-center mt-20'>
            <ThemeProvider theme={theme}>

                {showConfirmModal ? <RunScheduleConfirmModal showModal={showConfirmModal} confirm={handleConfirm} /> : null}


                <TableContainer sx={{ maxHeight: 480, width: '80vw', border: 1, borderRadius: 4 }}>
                    <Table sx={{ minWidth: 80 }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center" sx={{ fontSize: 23 }}>
                                    Sending Schedule : Template-{getTemplateName()}
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ cursor: 'pointer' }}>

                            <TableRow>


                                <StyledTableCell align="left" >



                                    <Stack spacing={1} direction="column" alignItems="left">
                                        <div className='titleComponent'> Pick date to schedule sending.</div>
                                        <div className='titleComponent' sx={{ color: "#707070", fontWeight: "bold" }}>Monthly Sending Day</div>





                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <div>Emails will be sent gradually starting from that date.</div>
                                            <div>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={dayOfTheMonth}
                                                    label="Day Of the Month"
                                                    onChange={handleChange}
                                                >
                                                    {daysInAMonth.map(function (object, i) {
                                                        return <MenuItem value={i + 1}>{object}</MenuItem>;
                                                    })

                                                    }

                                                </Select>
                                            </div>
                                        </Stack>





                                    </Stack>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell
                                    align="left"
                                >


                                    <Stack spacing={1} direction="column" alignItems="left">
                                        <div className='titleComponent' sx={{ color: "#707070", fontWeight: "bold" }}>Monthly Due Day</div>





                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <div>Payments will be due on the next monthly due day following the monthly sending day.</div>
                                            <div>

                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={dueDate}
                                                    label="Day Of the Month"
                                                    onChange={handleDueChange}
                                                >
                                                    {daysInAMonth.map(function (object, i) {
                                                        return <MenuItem value={i + 1}>{object}</MenuItem>;
                                                    })

                                                    }

                                                </Select>
                                            </div>
                                        </Stack>





                                    </Stack>
                                </StyledTableCell>

                            </TableRow>
                            <TableRow>
                                <StyledTableCell>
                                    <div className='grid justify-center'>
                                        <div onClick={(event) => { viewConfirmModal() }} className='grid justify-items-center text-base rounded-full p-1 w-24 bg-yellow-orange text-white font-light'>
                                            Save
                                        </div>
                                    </div>
                                </StyledTableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>





                {/* <Stack spacing={2} direction="row" alignItems="center"> */}

                {/* <Stack spacing={1} direction="column" alignItems="center"> */}
                {/* <div className='pickDateText'>Pick date & time to schedule sending.</div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                openTo="day"
                                value={dateValue}
                                onChange={(dateValue) => {
                                    setDateValue(dateValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider> */}





                {/* </Stack> */}

                {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                {/* <Stack spacing={3} direction="column" alignItems="left"> */}


                {/* <Stack spacing={2} direction="column" alignItems="left">
                                <div className='titleComponent'>Pick date to schedule sending.</div>

                            </Stack>

                            <Stack spacing={1} direction="row" alignItems="left"> */}
                {/* <Stack spacing={1} direction="row" alignItems="left"> */}

                {/* <div className='titleComponent'>Day of the Month</div> */}

                {/* <DatePicker
                                        // disableFuture
                                        // label="Responsive"
                                        openTo="day"
                                        views={['year', 'month', 'day']}
                                        value={dateValue}
                                        onChange={(dateValue) => {
                                            setDateValue(dateValue);
                                        }}

                                        renderInput={(params) => <TextField {...params} />}
                                    /> */}
                {/* <FormControl fullWidth> */}
                {/* <InputLabel id="demo-simple-select-label">Day</InputLabel> */}
                {/* <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dayOfTheMonth}
                                    label="Day Of the Month"
                                    onChange={handleChange}
                                >
                                    {daysInAMonth.map(function (object, i) {
                                        return <MenuItem value={i + 1}>{object}</MenuItem>;
                                    })

                                    }

                                </Select>



                            </Stack>
                            <div className='summaryText'>

                                <div>
                                    Emails will be sent gradually starting from that date.
                                    It might take up to several hours for all the emails to be sent.
                                </div>
                            </div> */}
                {/* <Stack spacing={2} direction="column" alignItems="left">
                                <div className='titleComponent'>Summary</div>
                                <div className='summaryText'>

                                    <div>
                                        Emails will
                                        be sent gradually starting from that date.
                                        It might take up to several hours for all the emails to be sent.
                                    </div>
                                </div>
                            </Stack> */}
                {/* <Stack spacing={1} direction="row" alignItems="left">

                                <div className='titleComponent'>Monthly Due Day</div> */}


                {/* <TextField id="outlined-basic"
                                    label=""
                                    onChange={handleChangeDuedate}
                                    value={dueDate}
                                    type="number"

                                    InputProps={{ inputProps: { min: 1, max: 31 } }}
                                    variant="outlined" /> */}

                {/* <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dueDate}
                                    label="Day Of the Month"
                                    onChange={handleDueChange}
                                >
                                    {daysInAMonth.map(function (object, i) {
                                        return <MenuItem value={i + 1}>{object}</MenuItem>;
                                    })

                                    } */}

                {/* </Select> */}
                {/*                          
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dueDate}
                                    label="Day Of the Month"
                                    onChange={handleChangeDuedate}
                                >
                                    {daysInAMonth.map(function (object, i) {
                                        return <MenuItem value={i}>{object}</MenuItem>;
                                    })

                                    }
                       
                                </Select> */}

                {/* </Stack> */}
                {/* <div className='summaryText'>

                                <div>
                                    Payments will be due on the next monthly due day following the
                                    monthly sending day.
                                </div>
                            </div> */}
                <Box sx={{ width: '20vw' }}>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Saved !
                        </Alert>
                    </Collapse>

                </Box>
                {/* <Stack spacing={2} direction="row" alignItems="center">
                    <Button variant="contained" className="saveButton"
                        onClick={(event) => { viewConfirmModal() }}

                        endIcon={<SaveIcon />}>
                        Save
                    </Button>
                </Stack> */}



                <Box sx={{ width: '15vw' }}>
                    <Collapse in={errorOpen}>
                        <Alert
                            severity="error"

                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Failed !
                        </Alert>
                    </Collapse>

                </Box>
                {/* </Stack> */}

                {/* </LocalizationProvider> */}



                {/* </Stack> */}


            </ThemeProvider>
        </div>
    )
}

export default RunScheduler