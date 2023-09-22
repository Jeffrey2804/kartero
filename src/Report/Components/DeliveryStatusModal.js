import React, { useEffect, useState, useMemo } from 'react'
import { Button } from '@mui/material';
import '../../Styles/ReportsPage.css'
import SettingsIcon from '@mui/icons-material/Settings';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { reportsService } from '../../Services/reports.service';

import Divider from '@mui/material/Divider';




import { styled } from "@mui/material/styles";
import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 0,
    // 'border' : 'none',
    'padding-left': '1.4vw',
    'padding-bottom': '1.2vw',
    // 'border-radius': '2px',
};

function DeliveryStatusModal(props) {
    const [deliveryDetails, setDeliveryDetails] = useState();
    const handleClose = () => {
        props.deliveryStatus(false);
    }



    useEffect(() => {
        console.log(props.deliveryDetails);
        // viewIndividualDelivery(props.requestId);
    }, [props.deliveryDetails]);

    const viewIndividualDelivery = () => {
        // reportsService
        //     .getIndividualDelivery(props.requestId)
        //     .then((response) => {
        //         setDeliveryDetails(response);
        //         console.log(response);

        //         // setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.log("error : " + error);

        //     });




    }
    return (
        <div>
            {props.deliveryDetails != null ?
                <Modal
                    open={props.deliveryModalStatus}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ borderRadius: 2 }}
                    disableEnforceFocus
                >
                    <Grid sx={style}>

                        <TableContainer sx={{ bgcolor: 'white', minHeight: '500px', minWidth: 700, width: '700px', borderRadius: 4 }}>
                            <Table sx={{ minWidth: 80 }}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                sx={{

                                                    fontFamily: 'Segoe UI',
                                                    fontStyle: 'normal',
                                                    fontWeight: 500,
                                                    fontSize: 20,

                                                }}
                                            >
                                                <SettingsIcon />
                                                <div>Account Information</div>
                                            </Grid>
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>


                                    <TableRow>
                                        <StyledTableCell align="center">

                                            <TableContainer >
                                                <Table sx={{ minWidth: 80 }}>
                                                    {/* <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">

                                        </StyledTableCell>
                                        <StyledTableCell align="right">

                                        </StyledTableCell>
                                        <StyledTableCell align="left">

                                        </StyledTableCell>
                                    </TableRow>

                                </TableHead> */}

                                                    <TableBody style={{ cursor: 'pointer' }}
                                                        className='columnModalName'>

                                                        <TableRow>
                                                            <StyledTableCell align="left" >
                                                                <div className='columnModalName'>Account Number </div>
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">

                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" >
                                                                <div className='columnModalName'>{props.deliveryDetails.accountNumber}</div>

                                                            </StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell align="left" >
                                                                <div className='columnModalName'>Email</div>

                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">

                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" >
                                                                <div className='columnModalName'>{props.deliveryDetails.customerEmailAddress}</div>

                                                            </StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell align="left" >
                                                                <div className='columnModalName'>Email Sent Date</div>

                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">

                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" >
                                                                <div className='columnModalName'>{props.deliveryDetails.emailSentDate}</div>

                                                            </StyledTableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <StyledTableCell align="left" >
                                                                <div className='columnModalName'>Email Status</div>


                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">

                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" >
                                                                <div className='columnModalName'>{props.deliveryDetails.emailStatus}</div>

                                                            </StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell align="left" >
                                                                <div className='columnModalName'>SMS Sent Date</div>


                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">

                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" >
                                                                <div className='columnModalName' >{props.deliveryDetails.smsSentDate}</div>

                                                            </StyledTableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <StyledTableCell align="left" >
                                                                <div className='columnModalName' >SMS Status</div>

                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">

                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" >
                                                                <div className='columnModalName'> {props.deliveryDetails.smsStatus}</div>

                                                            </StyledTableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <StyledTableCell align="left" >
                                                                <div className='columnModalName'>Mobile Number</div>


                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">

                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" >
                                                                <div className='columnModalName'>{props.deliveryDetails.customerMobileNumber}</div>

                                                            </StyledTableCell>
                                                        </TableRow>
                                                        {/* <TableRow>
                                                            <StyledTableCell align="left" >


                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Button variant="contained"
                                                                    className='modalDoneBtn'
                                                                    // sx={{marginLeft : 8}}
                                                                    onClick={handleClose}>Done</Button>
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" >

                                                            </StyledTableCell>
                                                        </TableRow> */}
                                                    </TableBody>

                                                </Table>


                                            </TableContainer>
                                        </StyledTableCell>

                                    </TableRow>

                                    <TableRow>
                                        <StyledTableCell align="center">
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                sx={{

                                                    fontFamily: 'Segoe UI',
                                                    fontStyle: 'normal',
                                                    fontWeight: 500,
                                                    fontSize: 20,

                                                }}
                                            >    
                                                <div className='grid justify-items-center text-base rounded-full p-1 w-28 transition ease-in-out bg-yellow-orange hover:bg-dark-yellow-orange text-white font-light cursor-pointer'>
                                                    <button onClick={handleClose}>
                                                        Done
                                                    </button>
                                                </div>
                                            </Grid>
                                        </StyledTableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>





                    </Grid>

                </Modal>
                : null
            }
        </div >
    )
}

export default DeliveryStatusModal