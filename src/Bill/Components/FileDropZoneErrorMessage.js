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

export default function FileDropZoneErrorMessage(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = props.steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <div className='grid grid-rows-6 grid-flow-col'>
                
            <div className='row-start-3 row-span-6 flex justify-start'>
                    <Button 
                    size="large" 
                    onClick={handleBack} 
                    disabled={activeStep === 0}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        
                    </Button>
                </div>

                <div className="row-span-2 font-segoe text-3xl text-yellow-orange font-bold  pb-5 pt-5">
                    {props.steps[activeStep].error}
                </div>
                
                <div className='row-span-3'>
                <p className='font-segoe text-xl text-gray-400'>Please check header:</p>
                    <div className='text-2xl'>
                        {props.steps[activeStep].header == "" ?
                            <div className=' errorVariable'>{props.steps[activeStep].value}</div>
                            : <div className=' errorVariable'>{props.steps[activeStep].header}</div>
                        }
                    </div>
                    <div>Row:</div>
                    <div className='errorVariable'>{props.steps[activeStep].row}</div>
                </div>
                
                <div className='row-span-1 flex justify-center'>
                    <MobileStepper
                        variant="text"
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button 
                                style={{display: 'none'}}
                                size="large"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button 
                            size="large" 
                            onClick={handleBack} 
                            disabled={activeStep === 0}
                            style={{display: 'none'}}
                            >
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                
                            </Button>
                        }
                    />
                </div>
                <div className='row-start-3 row-span-6 flex justify-end'>
                    <Button
                        size="large"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                </div>

            </div>
        </>
    );
}