import React, { useState, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import '../../Styles/RunScheduler.css';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Card from 'react-bootstrap/Card';

// import { configService } from '../../../../Services/config.service';
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


function SetSchedule() {

    // const [value, setValue] = useState(dayjs());
    const [timeValue, setTimeValue] = useState(dayjs('2018-01-01T00:00:00.000Z'));
    const [dateValue, setDateValue] = useState(dayjs());

    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [scheduledRun, setScheduledRun] = useState([]);
    const ref = useRef(null);

    return (
        <div className='template'>

            <Box className='mainContentBox'>

                <Box className='billHolder'>
                    
                            
        <div className='runScheduler'>
            <ThemeProvider theme={theme}>
                <Stack spacing={2} direction="row" alignItems="center" margin={5}>

                    <Stack spacing={1} direction="column" alignItems="center">
                        <div className='pickDateText'>Pick date & time to schedule sending.</div>
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
                        </LocalizationProvider>


                    </Stack>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3} direction="column" alignItems="left">
                            <Stack spacing={1} direction="row" alignItems="left">
                                <Stack spacing={1} direction="column" alignItems="left">

                                    <div className='titleComponent'>Date</div>

                                    <DatePicker
                                        // disableFuture
                                        // label="Responsive"
                                        openTo="day"
                                        views={['year', 'month', 'day']}
                                        value={dateValue}
                                        onChange={(dateValue) => {
                                            setDateValue(dateValue);
                                        }}

                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </Stack>
                            <Stack spacing={2} direction="column" alignItems="left">
                                <div className='titleComponent'>Summary</div>
                                <div className='summaryText'>
                                    {/* Scheduling emails to be sent from email.client@email.com starting from
                                    <b className='scheduledRun'> November 24, 2022 at 9:00 AM </b> */}

                                    <div>
                                        Emails will
                                        be sent gradually starting from that date.
                                        It might take up to several hours for all the emails to be sent.
                                    </div>
                                </div>
                            </Stack>


                            <Stack spacing={2} direction="row" alignItems="center">

                            </Stack>
                            <Box sx={{ width: '15vw' }}>
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
                        </Stack>

                    </LocalizationProvider>



                </Stack>


            </ThemeProvider>
        </div>
        </Box>
        </Box>
        </div>
    )
}

export default SetSchedule