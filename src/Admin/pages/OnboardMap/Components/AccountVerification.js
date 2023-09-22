import { Box, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import '../../../../Styles/AdminStepper.css';

function AccountVerification(props) {

    const values = props.merchantInfo;
    
    return(
        <div className='template'>

            <Box className='mainContentBox'>
                <Box className='billHolder'>
                    <Paper className="paperHolder">
                        {/* {values.map((data, index) => ( */}
                            <Stack
                            direction="column"
                            justifyContent="left"
                            alignItems="left"
                            spacing={4}
                            >

                                <Box className="boxHolder">
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={6}>
                                            <div className="accountVerifyFields">
                                                Company Name
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="accountVerifyValues">
                                                {values[0]}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}/>
                                        <Grid item xs={6}>
                                            <div className="accountVerifyFields">
                                                Company Address
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="accountVerifyValues">
                                                {values[1]}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}/>
                                        <Grid item xs={6}>
                                            <div className="accountVerifyFields">
                                                Company Email
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="accountVerifyValues">
                                                {values[2]}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}/>
                                        <Grid item xs={6}>
                                            <div className="accountVerifyFields">
                                                Company Contact Number
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="accountVerifyValues">
                                                {values[3]}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}/>
                                        <Grid item xs={6}>
                                            <div className="accountVerifyFields">
                                                Company Website
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="accountVerifyValues">
                                                {values[4]}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Stack>
                        {/* ))} */}
                    </Paper>
                </Box>
            </Box>
        </div>    
    );
}

export default AccountVerification;