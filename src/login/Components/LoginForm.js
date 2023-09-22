import React, { useState, useEffect } from "react";
import "../../Styles/LoginPage.css";
import logo from '../../Images/logo-white.png';
import { useNavigate } from "react-router-dom";
import { authenticationService } from '../../Services/authentication.service';
import ReCAPTCHA from 'react-google-recaptcha';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { privateRoute } from '../../util/PrivateRoute';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';

import Button from '@mui/material/Button';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const recaptchaRef = React.createRef();
function LoginForm() {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("info");
    const [snackMessage, setSnackMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isVerified, setIsverified] = useState(true);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function onChange(value) {
        setIsverified(!value == null);
    }




    function loginClick() {
        if (!isVerified) {
            authenticationService
                .login(username, password)
                .then((response) => {





                    if (response.role == 'ADMIN') {
                        navigate(process.env.REACT_APP_PATH + "/dashboard", { replace: true });
                    } else {
                        navigate(process.env.REACT_APP_PATH + "/home", { replace: true });

                    }

                })
                .catch((error) => {
                    console.log(error);
                    setSeverity("error");
                    setSnackMessage(error.response.data);
                    if (error.response.data == null) setSnackMessage(error.message);
                    setOpen(true);
                });
        }
    }

    window.onload = () => {

        setIsverified(true);
    }

    const handleExpire = () => {
        setIsverified(true);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            loginClick();
        }
    }
    const handleUserTypeChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePassTypeChange = (event) => {
        setPassword(event.target.value);
    }

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    useEffect(() => {
        // storing input name
        const userData = window.localStorage.getItem("userData");
        console.log(privateRoute.getRoles());
        // if (userData !== null) {
        //   if (userData.roles.includes('ADMIN')) {
        //     privateRoute.goTo("/admin", "admin");
        //   } else {
        //     privateRoute.goTo("/home");
        //   }
        // } else {

        //   console.log("empty");
        // }

    }, []);
    return (
        <div className='LoginForm'>
            <div>
                <img className='logoImage' src={logo} />
                {/* <input value={username}
                    onChange={handleUserTypeChange}
                    onKeyDown={handleKeyDown}
                    className='usernameTextBox' type="text" placeholder="Username" ></input><br />
                <input value={password}
                    onChange={handlePassTypeChange}
                    onKeyDown={handleKeyDown}
                    className='passwordTextBox' type="password"
                    placeholder="Password" ></input><br /> */}

                <FormControl sx={{ m: 1, minWidth: '300px', width: '301.5px' }} variant="filled"    >
                    <InputLabel htmlFor="filled-adornment-username">Username</InputLabel>
                    <FilledInput
                        id="filled-adornment-username"
                        type='text'
                        value={username}
                        onChange={handleUserTypeChange}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        sx={{
                            backgroundColor: "#FFF",
                            "&:hover": {
                                //you want this to be the same as the backgroundColor above
                                backgroundColor: "#FFF"
                            },
                            "&.Mui-focused": {
                                backgroundColor: "#FFF"
                            }



                        }}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1, minWidth: '300px', width: '301.5px' }} variant="filled"    >
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        onChange={handlePassTypeChange}
                        onKeyDown={handleKeyDown}
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="off"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"

                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        sx={{
                            backgroundColor: "#FFF",
                            "&:hover": {
                                //you want this to be the same as the backgroundColor above
                                backgroundColor: "#FFF"
                            },
                            "&.Mui-focused": {
                                backgroundColor: "#FFF"
                            }



                        }}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1, minWidth: '300px', width: '300px' }} variant="filled"    >
                    <ReCAPTCHA
                        className="captcha"
                        size="normal"
                        type="image"
                        ref={recaptchaRef}
                        onExpired={handleExpire}
                        sitekey="6LfKH-MkAAAAAELWCy1XPEXRoecOP9ll_F2y64SN"
                        onChange={onChange}
                    />
                </FormControl>

                {/* <div className="captcha" style={{ transform: "scale(0.50)", transformOrigin: "0 0" }}> */}

                {/* </div> */}
                {/* {!isVerified ? */}
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Button
                        onClick={() => { loginClick(); }}
                        disabled={isVerified}

                        className='loginButton'

                        sx={{
                            ":hover": {
                                backgroundColor: 'white', color: 'orange',
                                BorderColor: 'orange', border: 1
                            },
                        }}

                    >
                        LOGIN
                    </Button>


                </Stack>


                {/* : null} */}

            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </div>
    )


}
export default LoginForm
