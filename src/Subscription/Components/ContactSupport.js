import React from 'react'
import '../../Styles/ManageSubscription.css'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import ContactSupportImage from '../../Images/support.png';

import Stack from '@mui/material/Stack';

import { styled } from "@mui/material/styles";
import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { Grid } from '@mui/material';
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

function ContactSupport() {
    return (
        <div className='contactSupport grid justify-center mt-20'>

            <TableContainer sx={{ minHeight: '56vh', minWidth: 500, width: '80vw', border: 1, borderRadius: 4 }}>
                <Table sx={{ minWidth: 80 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" sx={{ fontSize: 23 }}>
                                Contact Support
                            </StyledTableCell>

                        </TableRow>

                    </TableHead>
                    <TableBody style={{ cursor: 'pointer' }}>

                        <TableRow>
                            <StyledTableCell align="center" >
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={20}>

                                    <img src={ContactSupportImage} className='supportImage' />

                                    <Stack spacing={5} direction="column" alignItems="left">
                                        <Stack direction="column" alignItems="left">





                                            <div className='supportName'>Raymond G. Debuque</div>
                                            <div className='supportPosition'>Kartero Support Representative</div>
                                        </Stack>
                                        <Stack spacing={1} direction="column" alignItems="left">
                                            <div className='supportMessage'>You may contact our representiative through:</div>
                                        </Stack>
                                        <Stack spacing={1} direction="column" alignItems="left">
                                            <div className='supportNumber'>(+63)995-295-8603</div>
                                            <div className='supportEmail'>rgdebuque@infobuilder.ph</div>
                                        </Stack>
                                    </Stack>

                                </Stack>
                            </StyledTableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>





        </div>
    )
}

export default ContactSupport