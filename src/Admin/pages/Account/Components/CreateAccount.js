import React, { useEffect, useState } from 'react';
// import PaymentLandingPageNavBar from './Components/PaymentLandingPageNavBar';
// import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import "../../../../Styles/LandingPage.css";
import { adminAccountService } from '../../../../AdminServices/account.service';
import MuiButton from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
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
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { CreateMerchantValidator } from './CreateMerchantValidator';
import OnboardMapStepper from '../../OnboardMap/Components/OnboardMapStepper';
import { adminConfigurationService } from '../../../../AdminServices/configuration.service';

import { adminSubscriptionService } from "../../../../AdminServices/subscription.service";
import { referenceService } from '../../../../AdminServices/reference.service';

import { InputLabel } from '@mui/material';
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

const CreateAccount = props => {

    // }
    // function CreateAccount() {
    const navigate = useNavigate();
    // const [subPackage, setSubPackage] = React.useState('');
    // const [value, setValue] = React.useState(null);
    const [values, setValues] = React.useState({
        companyName: '',
        companyTradeName: '',
        companyStreetAddress: '',
        compantCityAddress: '',
        companyRegionAddress: '',
        companyZipCode: '',
        companyEmailAddress: '',
        companyCustomerRelationsEmail: '',
        companyMobileNumber1: '',
        companyPhoneNumber1: '',
        companyMobileNumber2: '',
        companyPhoneNumber2: '',
        subscriptionStart: '',
        companyWebsite: '',
        companyFacebook: '',
        companyInstagram: '',
        companyYoutube: '',
        subscriptionExpiry: '',
        subscriptionId: '',
    });

    const [mID, setmID] = useState();
    const [saveMerchant, setSaveMerchant] = useState(false);
    const [showOnboardMapping, setShowOnboardMapping] = useState(false);

    const { errors, validateForm, onBlurField } = CreateMerchantValidator(values)
    const [subscription, setSubscription] = useState([]);
    const [regionRef, setRegionRef] = useState([]);
    const [cityRef, setCityRef] = useState([]);
    const getRegionRef = () => {
        const user = JSON.parse(window.localStorage.getItem("userData"));
        referenceService
            .getRegionReference()
            .then((response) => {
                console.log(response);
                setRegionRef(response);
            })
            .catch((error) => {

            })
    }

    const getCityRef = () => {
        const user = JSON.parse(window.localStorage.getItem("userData"));
        referenceService
            .getCityReference()
            .then((response) => {
                console.log(response);
                setCityRef(response);
            })
            .catch((error) => {

            })
    }

    const viewSubscriptionList = () => {


        adminSubscriptionService
            .getSubscriptionList()
            .then((response) => {
                setSubscription(response);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const createUser = () => {
        console.log(values);
        adminAccountService.createNewMerchant(
            values
        ).then((response) => {
            adminConfigurationService
                .initializeDatabase(response)
                .then((response) => {

                    window.location.reload(false);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error)
                })
            setmID(response);
        }).catch((error) => {

        })

    }

    console.log(mID);

    useEffect(() => {
        if (saveMerchant === true) {
            createUser();
        }
    }, [saveMerchant]);

    useEffect(() => {
        viewSubscriptionList();
        getRegionRef();
        getCityRef();
    }, []);
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
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

    const saveClick = () => {
        const { isValid } = validateForm({ values, errors, forceTouchErrors: true });
        if (isValid) {
            setSaveMerchant(true);

        } else {
            return;

        }
    }

    const handleChangeView = (response) => {
        setShowOnboardMapping(response);
    };

    const backClick = () => {
        window.location.reload(false);
    }

    const merchantInfo = [
        values.companyName,
        values.companyStreetAddress + " " + values.compantCityAddress + " " + values.companyRegionAddress + " " + values.companyRegionAddress,
        values.companyEmailAddress,
        values.companyMobileNumber1,
        values.companyWebsite
    ];

    return (
        // <Form onSubmit={onSubmitForm}>
        <div className='adminPage'>
            {/* {showOnboardMapping ? (<OnboardMapStepper
                merchantValues={merchantInfo}
                merchantID={mID}
                currentView={handleChangeView}
            />) : null} */}
            <div hidden={showOnboardMapping}>
                <div className='adminPageHeader'>
                    <div className='title'>
                        <label onClick={() => { previousClick(); }}>
                            Accounts
                        </label>
                        <label> </label>
                        <label>
                            {">"}  Create New Account
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

                                <Box sx={{ width: '60vw' }}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={12}>
                                            <div className='pageTitle'>
                                                Create Account
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}></Grid>

                                        <Grid item xs={0.5} />
                                        <Grid item xs={11.5}>
                                            <div className='title'>Company Name</div>
                                        </Grid>
                                        <Grid item xs={0.5} />
                                        <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.companyName.dirty && errors.companyName.error && AdminPage.formFieldError)}
                                                    name='companyName'
                                                    value={values.companyName}
                                                    label={"Full Name"}
                                                    // onChange={handleChange('merchant')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                />
                                                {errors.companyName.dirty && errors.companyName.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.companyName.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.companyTradeName.dirty && errors.companyTradeName.error && AdminPage.formFieldError)}
                                                    name='companyTradeName'
                                                    value={values.companyTradeName}
                                                    label={"Trade Name"}
                                                    // onChange={handleChange('merchant')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                />
                                                {errors.companyTradeName.dirty && errors.companyTradeName.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.companyTradeName.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={0.5} />

                                        <Grid item xs={0.5} />
                                        <Grid item xs={11.5}>
                                            <div className='title'>Company Address</div>
                                        </Grid>
                                        <Grid item xs={0.5} />
                                        <Grid item xs={11}>
                                            <div className='contentHolder'>
                                                {/* <TextField fullWidth
                                                    // name='companyFullAddress'
                                                    value={values.companyStreetAddress + " " + values.compantCityAddress + " " + values.companyRegionAddress + " " + values.companyZipCode}
                                                    // onChange={handleChange('companyFullAddress')}
                                                    // onChange = {onUpdateField}
                                                    disabled="true"
                                                    id="standard-basic"
                                                    variant="standard"
                                                /> */}
                                            </div>
                                        </Grid>
                                        <Grid item xs={0.5} />
                                        <Grid item xs={0.5} />
                                        <Grid item xs={2.25}>
                                            <div className='contentHolder'>

                                                <TextField fullWidth id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.companyStreetAddress.dirty && errors.companyStreetAddress.error && AdminPage.formFieldError)}
                                                    name='companyStreetAddress'
                                                    value={values.companyStreetAddress}
                                                    label={"Street Name"}
                                                    // onChange={handleChange('merchant')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                />
                                                {errors.companyStreetAddress.dirty && errors.companyStreetAddress.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.companyStreetAddress.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={0.5} />
                                        <Grid item xs={2.25}>
                                            <div className='contentHolder'>


                                                <FormControl sx={{ m: 0, width: "10vw" }} size="medium">
                                                    <InputLabel id="cityLabel">Select City</InputLabel>
                                                    <Select onChange={handleChange('compantCityAddress')}
                                                        value={values.compantCityAddress}
                                                        label='Select City'
                                                        labelId="regionLabel"
                                                    >

                                                        {cityRef.map(object =>
                                                            <MenuItem value={object.id}>{object.value}</MenuItem>
                                                        )}

                                                        {/* <MenuItem value={'182'}>6 Months</MenuItem>
                                                        <MenuItem value={'365'}>12 Months</MenuItem> */}
                                                    </Select>
                                                </FormControl>



                                            </div>
                                        </Grid>
                                        <Grid item xs={0.5} />
                                        <Grid item xs={2.75}>
                                            <div className='contentHolder'>



                                                <FormControl sx={{ m: 0, width: "10vw" }} size="medium">
                                                    <InputLabel id="regionLabel">Select Region</InputLabel>
                                                    <Select onChange={handleChange('companyRegionAddress')}
                                                        label='Select Region'
                                                        labelId="regionLabel"
                                                        id="demo-simple-select"
                                                        value={values.companyRegionAddress}>

                                                        {regionRef.map(object =>
                                                            <MenuItem value={object.id}>{object.value}</MenuItem>
                                                        )}

                                                        {/* <MenuItem value={'182'}>6 Months</MenuItem>
                                                        <MenuItem value={'365'}>12 Months</MenuItem> */}
                                                    </Select>
                                                </FormControl>


                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.companyZipCode.dirty && errors.companyZipCode.error && AdminPage.formFieldError)}
                                                    name='companyZipCode'
                                                    value={values.companyZipCode}
                                                    label={"Zip Code"}
                                                    // onChange={handleChange('merchant')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                />
                                                {errors.companyZipCode.dirty && errors.companyZipCode.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.companyZipCode.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={0.5} />

                                        <Grid item xs={0.5} />
                                        <Grid item xs={11.5}>
                                            <div className='title'>Company Email</div>
                                        </Grid>
                                        <Grid item xs={0.5} />
                                        <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.companyEmailAddress.dirty && errors.companyEmailAddress.error && AdminPage.formFieldError)}
                                                    name='companyEmailAddress'
                                                    value={values.companyEmailAddress}
                                                    // onChange={handleChange('emailAddress')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                    label={"Email Address"}
                                                />
                                                {errors.companyEmailAddress.dirty && errors.companyEmailAddress.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.companyEmailAddress.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.companyCustomerRelationsEmail.dirty && errors.companyCustomerRelationsEmail.error && AdminPage.formFieldError)}
                                                    name='companyCustomerRelationsEmail'
                                                    value={values.companyCustomerRelationsEmail}
                                                    label={"Customer Relations Email"}
                                                    // onChange={handleChange('merchant')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                />
                                                {errors.companyCustomerRelationsEmail.dirty && errors.companyCustomerRelationsEmail.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.companyCustomerRelationsEmail.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={0.5} />

                                        <Grid item xs={0.5} />
                                        <Grid item xs={11.5}>
                                            <div className='title'>Company Contact Number</div>
                                        </Grid>
                                        <Grid item xs={0.5} />
                                        <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.companyMobileNumber1.dirty && errors.companyMobileNumber1.error && AdminPage.formFieldError)}
                                                    name='companyMobileNumber1'
                                                    value={values.companyMobileNumber1}
                                                    // onChange={handleChange('emailAddress')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                    label={"Mobile Number 1"}
                                                />
                                                {errors.companyMobileNumber1.dirty && errors.companyMobileNumber1.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.companyMobileNumber1.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'

                                                    name='companyMobileNumber2'
                                                    value={values.companyMobileNumber2}
                                                    label={"Mobile Number 2"}
                                                    // onChange={handleChange('companyMobileNumber2')}

                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                />
                                                {errors.companyMobileNumber2.dirty && errors.companyMobileNumber2.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.companyMobileNumber2.message}</p>
                                                ) : null}
                                            </div>

                                        </Grid>
                                        <Grid item xs={0.5} />
                                        <Grid item xs={0.5} />
                                        <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.companyPhoneNumber1.dirty && errors.companyPhoneNumber1.error && AdminPage.formFieldError)}
                                                    name='companyPhoneNumber1'
                                                    value={values.companyPhoneNumber1}
                                                    // onChange={handleChange('emailAddress')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                    label={"Phone Number 1"}
                                                />
                                                {errors.companyPhoneNumber1.dirty && errors.companyPhoneNumber1.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.companyPhoneNumber1.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'
                                                    className={clsx(AdminPage.formField, errors.companyPhoneNumber1.dirty && errors.companyPhoneNumber2.error && AdminPage.formFieldError)}
                                                    name='companyPhoneNumber2'
                                                    value={values.companyPhoneNumber2}
                                                    label={"Phone Number 2"}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                // onChange={handleChange('companyPhoneNumber2')}
                                                // onChange = {onUpdateField}
                                                />
                                                {errors.companyPhoneNumber2.dirty && errors.companyPhoneNumber2.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.companyPhoneNumber2.message}</p>
                                                ) : null}
                                            </div>

                                        </Grid>
                                        <Grid item xs={0.5} />

                                        <Grid item xs={0.5} />
                                        <Grid item xs={11.5}>
                                            <div className='title'>Company Website</div>
                                        </Grid>
                                        <Grid item xs={0.5} />
                                        <Grid item xs={2.75}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'

                                                    name='companyWebsite'
                                                    value={values.companyWebsite}
                                                    label={"Website"}
                                                    onChange={handleChange('companyWebsite')}
                                                // onChange = {onUpdateField}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={2.75}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'

                                                    name='companyFacebook'
                                                    value={values.companyFacebook}
                                                    label={"Facebook"}
                                                    onChange={handleChange('companyFacebook')}
                                                // onChange = {onUpdateField}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={2.75}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'

                                                    name='companyInstagram'
                                                    value={values.companyInstagram}
                                                    label={"Instagram"}
                                                    onChange={handleChange('companyInstagram')}
                                                // onChange = {onUpdateField}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={2.75}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth'

                                                    name='companyYoutube'
                                                    value={values.companyYoutube}
                                                    label={"Youtube"}
                                                    onChange={handleChange('companyYoutube')}
                                                // onChange = {onUpdateField}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={0.5} />

                                        <Grid item xs={0.5} />
                                        <Grid item xs={11.5}>
                                            <div className='title'>Subscription</div>
                                        </Grid>
                                        <Grid item xs={0.5} />
                                        <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <TextField fullWidth id='fullWidth' label='Start (DD/MM/YYYY)'
                                                    className={clsx(AdminPage.formField, errors.subscriptionStart.dirty && errors.subscriptionStart.error && AdminPage.formFieldError)}
                                                    name='subscriptionStart'
                                                    value={values.subscriptionStart}
                                                    // onChange={handleChange('subscriptionStart')}
                                                    onChange={onUpdateField}
                                                    onBlur={onBlurField}
                                                // value={new Date().toLocaleString([], 
                                                //     {year: 'numeric', month: 'numeric', day: 'numeric'})}
                                                // disabled
                                                >
                                                </TextField>
                                                {errors.subscriptionStart.dirty && errors.subscriptionStart.error ? (
                                                    <p className='formFieldErrorMessage'>{errors.subscriptionStart.message}</p>
                                                ) : null}
                                            </div>
                                        </Grid>
                                        {/* <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <FormControl sx={{ m: 0, minWidth: 315 }} size="medium">
                                                    <Select onChange={handleChange('subscriptionExpiry')}
                                                        value={values.subscriptionId}>
                                                        <MenuItem value={'91'}>3 Months</MenuItem>
                                                        <MenuItem value={'182'}>6 Months</MenuItem>
                                                        <MenuItem value={'365'}>12 Months</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </Grid> */}
                                        <Grid item xs={5.5}>
                                            <div className='contentHolder'>
                                                <FormControl sx={{ m: 0, minWidth: 315 }} size="medium">
                                                    <Select onChange={handleChange('subscriptionId')}
                                                        value={values.subscriptionId}>

                                                        {subscription.map(object =>
                                                            <MenuItem value={object.id}>{object.name}</MenuItem>
                                                        )}

                                                        {/* <MenuItem value={'182'}>6 Months</MenuItem>
                                                        <MenuItem value={'365'}>12 Months</MenuItem> */}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <Grid item xs={0.5} />



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

}

export default CreateAccount