import React from 'react'
import '../../Styles/ManageSubscription.css'
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';

import { accountService } from '../../Services/account.service';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';



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
    },
}));
function ChangePassword() {

    const [emailAddress, setEmailAddress] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowOldPassword((show) => !show);
    const handleClickShowOldPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowConfirmPassword((show) => !show);

    const [open, setOpen] = useState(false);
    const [confirmEnable, setConfirmEnable] = useState(true);
    const [errorOpen, setErrorOpen] = useState(false);


    const [errorMessage, setErrorMessage] = useState("");

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const changePass = () => {
        setOpen(false);
        setErrorOpen(false);
        const userId = JSON.parse(window.localStorage.getItem("userData"));
        console.log(userId);

        checkConfirm();

        if (newPassword == confirmPassword) {
            accountService
                .changePassword(
                    userId.id,
                    emailAddress,
                    oldPassword,
                    newPassword)
                .then((response) => {
                    console.log(response);
                    setOpen(true);
                })
                .catch((error) => {
                    console.log(error);

                    console.log(error.data.newPassword);

                    try {
                        if ('newPassword' in error.data) {
                            setErrorMessage("Password : " + error.data.newPassword);
                        } else if ('emailAddress' in error.data) {
                            setErrorMessage(error.data.emailAddress);
                        }
                    } catch (ex) {
                        setErrorMessage(error.data);
                    }


                    setErrorOpen(true);
                });
        } else {
            setConfirmEnable(false);
            setErrorMessage("Password do not Match");
            setErrorOpen(true);
        }
    }

    const handleEmailTypeChange = (event) => {
        setEmailAddress(event.target.value);
    }
    const handleOldNPassword = (event) => {
        setOldPassword(event.target.value);
    }
    const handleNewPassword = (event) => {
        setNewPassword(event.target.value);
        // checkConfirm();
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
        // checkConfirm();
    }


    const checkConfirm = () => {

        if (newPassword == confirmPassword) {
            setConfirmEnable(true);
        }


        console.log(newPassword + " " + confirmPassword);
    }

    return (
        <div className='changePassword'>

            <TableContainer sx={{ marginLeft: '10vw', minHeight: '56vh', minWidth:500, width: '80vw', border: 1, borderRadius: 4 }}>
                <Table sx={{ minWidth: 80 }}>
                    <TableHead >
                        <TableRow>
                            <StyledTableCell align="right" sx={{backgroundColor: "red"}}>

                            </StyledTableCell>
                            <StyledTableCell align="left" sx={{ fontSize: 23 }}>
                                Change Password
                            </StyledTableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody style={{ cursor: 'pointer' }}>

                        <TableRow>
                            <StyledTableCell align="right" >
                                <div className='titleHolder'>Email Address </div>
                            </StyledTableCell>
                            <StyledTableCell align="left" >
                                <FormControl sx={{ m: 1, width: '16vw', 'background-color': 'white', 'border-radius': '15px' }} variant="filled"    >
                                    <InputLabel htmlFor="filled-adornment-password"></InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        onChange={handleEmailTypeChange}
                                        // onKeyDown={handleKeyDown}
                                        type={'text'}
                                        autoComplete="off"

                                    />
                                </FormControl>

                            </StyledTableCell>
                        </TableRow>

                        <TableRow>
                            <StyledTableCell align="right" >
                                <div className='titleHolder'>Old Password </div>
                            </StyledTableCell>
                            <StyledTableCell align="left" >
                                <FormControl sx={{ m: 1, width: '16vw', 'background-color': 'white', 'border-radius': '15px' }} variant="filled"    >
                                    <InputLabel htmlFor="filled-adornment-password"></InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        onChange={handleOldNPassword}
                                        // onKeyDown={handleKeyDown}
                                        type={showOldPassword ? 'text' : 'password'}
                                        autoComplete="off"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    // onClick={handleClickShowPassword}
                                                    onMouseDown={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </StyledTableCell>
                        </TableRow>



                        <TableRow>
                            <StyledTableCell align="right" >
                                <div className='titleHolder'>New Password </div>
                            </StyledTableCell>
                            <StyledTableCell align="left" >
                                <FormControl sx={{ m: 1, width: '16vw', 'background-color': 'white', 'border-radius': '15px' }} variant="filled"    >
                                    <InputLabel htmlFor="filled-adornment-password"></InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        onChange={handleNewPassword}
                                        // onKeyDown={handleKeyDown}
                                        type={showNewPassword ? 'text' : 'password'}
                                        autoComplete="off"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    // onClick={handleClickShowOldPassword}
                                                    onMouseDown={handleClickShowOldPassword}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </StyledTableCell>
                        </TableRow>

                        <TableRow>
                            <StyledTableCell align="right" >
                                <div className='titleHolder'>Confirm Password </div>
                            </StyledTableCell>
                            <StyledTableCell align="left" >
                                <FormControl sx={{ m: 1, width: '16vw', 'background-color': 'white', 'border-radius': '15px' }} variant="filled"    >
                                    <InputLabel htmlFor="filled-adornment-password"></InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        onChange={handleConfirmPassword}
                                        // onKeyDown={handleKeyDown}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        autoComplete="off"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    // onClick={handleClickShowPassword}
                                                    onMouseDown={handleClickShowNewPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="right" >

                            </StyledTableCell>
                            <StyledTableCell align="left" >
                                <Button variant="contained"
                                    sx={{ minWidth: 30 }}
                                    // disabled={confirmEnable}
                                    onClick={changePass}
                                    className="sendButton" >
                                    Confirm
                                </Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>

                </Table>


            </TableContainer>





            <Stack spacing={2} direction="column" alignItems="left">

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
                            Success!
                        </Alert>
                    </Collapse>

                </Box>


                <Box sx={{ width: '30vw' }}>
                    <Collapse in={errorOpen}>
                        <Alert
                            severity="error"

                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setErrorOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {errorMessage}
                        </Alert>
                    </Collapse>

                </Box>
            </Stack>



        </div >
    )
}

export default ChangePassword