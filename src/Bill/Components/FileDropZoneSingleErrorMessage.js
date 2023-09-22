import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Divider from '@mui/material/Divider';

import Stack from '@mui/material/Stack';


import "../../Styles/ModalErrorMessage.css";
const steps = [
    {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

export default function FileDropZoneSingleErrorMessage(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    // const maxSteps = props.steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ maxWidth: 800, flexGrow: 1 }}>
            {/* <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '10vh',
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography>{props.steps[activeStep].label}</Typography>
            </Paper>
            <Box sx={{ height: '4vw', maxWidth: '37vw', width: '100%', p: 2 }}>
                {props.steps[activeStep].description}
            </Box> */}

            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >

                <div className='errorSubscription'>Invalid File</div>
                <Divider />
                <Typography>{props.message}</Typography>
                {/* <div className='errorVariable'>{props.message}</div> */}
            </Stack>



        </Box>
    );
}