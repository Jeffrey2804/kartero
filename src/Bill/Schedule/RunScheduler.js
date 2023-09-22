import React, { useState, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import '../../Styles/RunSchedulerBill.css';

import BillDateRange from './BillDateRange'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { templateService } from '../../Services/template.service';


function RunScheduler(props) {
    const [sendDateSeverity, setSendDateSeverity] = useState("info");
    const [sendDateColor, setSendDateColor] = useState("warning");
    const [dueDateSeverity, setDueDateSeverity] = useState("info");
    const [dueDateColor, setDueDateColor] = useState("warning");
    const [pdfPath, setPdfPath] = useState();
    const handleDateRange = (dateRange) => {


        sendDateSet();
        props.dateSet(true);
        if (dateRange[0].startDate !== dateRange[0].endDate) {

            dueDateSet();
            props.dateRange(dateRange);
            props.dateSet(false);
        }



    }


   

    const getPdfPath = () => {
        const templateId = window.localStorage.getItem("tId");
        templateService
            .getPdfPath(templateId)
            .then((response) => {
                setPdfPath(response);
                props.pdfPath(response);
            })
            .catch((error) => {

                console.log(error.data);
            });
    }

    

    
    const getHtmlPath = () => {
        const templateId = window.localStorage.getItem("tId");
        templateService
            .getHtmlPath(templateId)
            .then((response) => {
                setPdfPath(response);
                props.htmlPath(response);
            })
            .catch((error) => {

                console.log(error.data);
            });
    }

    const sendDateSet = () => {
        setSendDateColor("success");
        setSendDateSeverity("success");

    }


    const dueDateSet = () => {
        setDueDateColor("success");
        setDueDateSeverity("success");
    }

    useEffect(() => {
        // getScheduledRun();
        getPdfPath();
        getHtmlPath();
        return () => {
        };
    }, []);

    return (
        <div className='runScheduler'>


            {/* {showConfirmModal ? <RunScheduleConfirmModal showModal={showConfirmModal} confirm={handleConfirm} /> : null} */}


            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >

                <BillDateRange dateRange={handleDateRange} />

                <Stack spacing={2} direction="column" alignItems="center">


                    <Alert variant="outlined" severity={sendDateSeverity} color={sendDateColor} className="dateMessage">
                        <AlertTitle><strong> Set Delivery Date </strong></AlertTitle>
                        Expect to receive Email and SMS by this Date

                    </Alert>
                    <Alert variant="outlined" severity={dueDateSeverity} color={dueDateColor} className="dateMessage">
                        <AlertTitle><strong> Set Due Date </strong></AlertTitle>
                        Payment will be on due by this Date
                    </Alert>

                </Stack>

            </Stack>



        </div>
    )
}

export default RunScheduler