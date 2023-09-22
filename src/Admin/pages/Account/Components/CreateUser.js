import React, { useEffect, useState } from 'react';
// import PaymentLandingPageNavBar from './Components/PaymentLandingPageNavBar';
// import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import "../../../../Styles/LandingPage.css";
import { adminAccountService } from '../../../../AdminServices/account.service';
import MuiButton from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Divider from '@mui/material/Divider';
import { FormControl, IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import { minWidth } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AdminPage from '../../../../Styles/AdminPage.css';
import clsx from 'clsx';
import { CreateUserValidator } from './CreateUserValidator';
import AdminNavbar from '../../../../Components/AdminNavbar';
import Sidebar from '../../../../Components/Sidebar';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { referenceService } from '../../../../AdminServices/reference.service';
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

const options = {
    shouldForwardProp: (prop) => prop !== 'rounded',
};

const Button = styled(
    MuiButton,
    options,
)(({ rounded }) => ({
    borderRadius: rounded ? '24px' : null,
    backgroundColor: '#FD9A08'
}));

const CreateUser = props => {
    // }
    // function CreateAccount() {
    const navigate = useNavigate();
    // const [subPackage, setSubPackage] = React.useState('');
    // const [value, setValue] = React.useState(null);
    const merchantID = props.selectedStatementId;
    const [roles, setRoles] = useState([]);

    const [values, setValues] = React.useState({
        merchantId: merchantID,
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        roles: '',
        showPassword: false
    });

    const { errors, validateForm, onBlurField } = CreateUserValidator(values)

    const createUser = () => {
        console.log(values);
        adminAccountService.createNewUser(
            values
        ).then((response) => {
            
        window.location.reload(false);
        }).catch((error) => {

        })
    }
    const getRoles = () => {
        const user = JSON.parse(window.localStorage.getItem("userData"));
        referenceService
            .getRolesReference()
            .then((response) => {
                console.log(response);
                setRoles(response);
            })
            .catch((error) => {

            })
    }


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleHidePassword = (event) => {
        event.preventDefault();
    };

    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
            ...values,
            [field]: e.target.value,
        };
        setValues(nextFormState);
        if (errors[field].dirty)
            validateForm({
                values: nextFormState,
                errors,
                field,
            });
    };

    const onSubmitForm = e => {
        e.preventDefault();
        const { isValid } = validateForm({ values, errors, forceTouchErrors: true });
        if (!isValid) return;
        alert(JSON.stringify(values, null, 2));
    };


    const saveClick = () => {
        { createUser() }
    }

    const backClick = () => {
        window.location.reload(false);
    }


    useEffect(() => {

        getRoles();

    }, []);

    return (
        <div className='adminMainPage'>
            {/* // <Form onSubmit={onSubmitForm}> */}
            <div className='adminPage'>
                <div className='adminPageHeader'>
                    <div className='title'>
                        <label onClick={() => { previousClick(); }}>
                            Accounts
                        </label>
                        <label> </label>
                        <label>
                            {">" + props.selectedName + ">"}  Create New User
                        </label>
                    </div>

                </div>

                <div className='createAccount'>
                    <ThemeProvider theme={theme}>

                        <div className='paymentLandingPage'>
                            <Stack
                                direction="column"
                                justifyContent="left"
                                alignItems="left"
                                spacing={4}
                            >

                                <Box sx={{ width: '650px' }} onSubmit={onSubmitForm}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={12}>
                                            <div className='pageTitle'>
                                                Create User
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}></Grid>
                                        <Grid item xs={6}>
                                            <div className='title'>Merchant</div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='title'>{props.selectedName}</div>
                                            {/* <div className='contentHolder'>
                                            <TextField fullWidth label='' id='fullWidth' 
                                                className={clsx(AdminPage.formField,errors.merchant.dirty && errors.merchant.error && AdminPage.formFieldError)}
                                                name='merchant'
                                                value={props.selectedName}
                                                disabled = 'true'
                                                />
                                        </div> */}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='title'>First Name</div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth label='' id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.firstName.dirty && errors.firstName.error && AdminPage.formFieldError)}
                                                    name='firstName'
                                                    value={values.firstName}
                                                    // onChange={handleChange('firstName')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                />
                                                {errors.firstName.dirty && errors.firstName.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.firstName.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='title'>Last Name</div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth label='' id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.lastName.dirty && errors.lastName.error && AdminPage.formFieldError)}
                                                    name='lastName'
                                                    value={values.lastName}
                                                    // onChange={handleChange('lastName')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                />
                                                {errors.lastName.dirty && errors.lastName.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.lastName.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='title'>Username</div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth label='' id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.userName.dirty && errors.userName.error && AdminPage.formFieldError)}
                                                    name='userName'
                                                    value={values.userName}
                                                    // onChange={handleChange('userName')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                />
                                                {errors.userName.dirty && errors.userName.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.userName.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='title'>Password</div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth label='' id='fullWidth'
                                                    type={values.showPassword ? 'text' : 'password'}
                                                    className={clsx(AdminPage.formField, errors.password.dirty && errors.password.error && AdminPage.formFieldError)}
                                                    name='password'
                                                    value={values.password}
                                                    // onChange={handleChange('password')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleHidePassword}
                                                                edge="end">
                                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                {errors.password.dirty && errors.password.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.password.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='title'>Confirm Password</div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth label='' id='fullWidth'
                                                    type={values.showPassword ? 'text' : 'password'}
                                                    className={clsx(AdminPage.formField, errors.confirmPassword.dirty && errors.confirmPassword.error && AdminPage.formFieldError)}
                                                    name='confirmPassword'
                                                    value={values.confirmPassword}
                                                    // onChange={handleChange('confirmPassword')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleHidePassword}
                                                                edge="end">
                                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.confirmPassword.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='title'>Role</div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className='contentHolder'>
                                                <div className='contentHolder'>
                                                    <FormControl sx={{ m: 0, minWidth: 315 }} size="medium">
                                                        <Select onChange={handleChange('role')}
                                                            value={values.role}>

                                                            {roles.map(object =>
                                                                <MenuItem value={object.id}>{object.value}</MenuItem>
                                                            )}


                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <div className='adminStepperButton'>
                                    <React.Fragment>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Button
                                                color="secondary"
                                                variant="dashed"
                                                className='adminButtonBack'
                                                onClick={backClick}
                                            >
                                                <KeyboardArrowLeft />
                                                Back
                                            </Button>


                                            <Box sx={{ flex: '1 1 auto' }} />

                                            <Button
                                                color="secondary"
                                                variant="dashed"
                                                onClick={saveClick}
                                            >

                                                Save
                                                <KeyboardArrowRight />
                                            </Button>
                                        </Box>
                                    </React.Fragment>
                                </div>

                            </Stack>
                        </div>

                    </ThemeProvider >
                </div>
            </div>
        </div>
        // </Form>
    )

    function nextClick() {
        navigate(process.env.REACT_APP_PATH + "/onboardMap");
    }

    function previousClick() {
        window.location.reload(false);
    }
    // function saveClick() {
    //     {createUser()}
    //     navigate(process.env.REACT_APP_PATH + "/onboarding");
    // }


    // }

}

export default CreateUser