import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../../Styles/Stepper.css";
import Icon from '@mui/material/Icon';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { authenticationService } from "../../Services/authentication.service";
import Template from '../Template/Template';
import Upload from '../Upload/Upload'
import Review from '../Review/Review';
import Preview from '../Preview/Preview';
import SendPage from '../Send/Send';
import ConfirmModal from '../Preview/ConfirmSendModal';
import RunScheduler from '../Schedule/RunScheduler';
import arrowNext from '../../Images/Arrow.png';
import { templateService } from '../../Services/template.service';
const steps = ['Upload', 'Review', 'Preview', 'Send'];

// const steps = ['Run Schedule', 'Upload', 'Review', 'Preview', 'Send'];


const defaultTheme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[500],
    },
  }
});


const outerTheme = createTheme({
  palette: {
    primary: {

      main: '#FD9A08',
      contrastText: '#fff',
    },
    secondary: {

      main: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            // border: `2px solid ${defaultTheme.palette.primary.main}`,
            color: defaultTheme.palette.primary.main,
          },
        },

      ],
    },
    // MuiStepConnector: {
    //   variants: [{
    //     props: { variant: "steps" },
    //     style: {
    //       // border: `2px dashed ${defaultTheme.palette.primary.main}`,
    //       color: defaultTheme.palette.primary.main,
    //     },
    //   }],
    // },
  },
});


export default function HorizontalNonLinearStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [stepShown, setStepShow] = useState(0);
  const [fileHeader, setFileHeader] = useState([]);
  const [showTemplate, setShowTemplate] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [viewSendPage, setViewSendPage] = useState(false);
  const [showRunSchedule, setShowRunSchedule] = useState(false);


  const [templateId, setTemplateId] = useState("");
  const [accountData, setAccountData] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [nextButtonEnable, setNextButtonEnable] = useState(true);

  const [pdfPath, setPdfPath] = useState();
  const [htmlPath, setHtmlPath] = useState();
  const [user, setUser] = useState("");

  const [dateUpload, setDateUpload] = useState();

  const totalSteps = () => {
    return steps.length - 1;
  };

  function getProperty() {

  }

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    if (currentStep != 3) {
      setNextButtonEnable(true);
      handleNextSteps();
      return;
    }
    if (currentStep == 3) {
      setShowConfirmModal(true);
      showSteps();
    }

  };

  const handleNextSteps = () => {
    getProperty();
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    setStepShow((step) => step + 1);
    setCurrentStep(currentStep + 1);
  }

  function showSelectTemplate() {
    setShowTemplate(true);
    setShowUpload(false);
    setShowUpload(false);
    setShowPreview(false);
    setViewSendPage(false);
    setShowRunSchedule(false);
  }

  function showUploadPage() {
    setShowTemplate(false);
    setShowUpload(true);
    setShowReview(false);
    setShowPreview(false);
    setViewSendPage(false);
    setShowRunSchedule(false);
  }

  function showReviewPage() {
    setShowReview(true);
    setShowUpload(false);
    setShowTemplate(false);
    setShowPreview(false);
    setViewSendPage(false);
    setShowRunSchedule(false);
    setNextButtonEnable(false);
  }

  function showPreviewPage() {
    setShowReview(false);
    setShowUpload(false);
    setShowTemplate(false);
    setShowPreview(true);
    setViewSendPage(false);
    setShowRunSchedule(false);
    setNextButtonEnable(false);
  }

  function showSendPage() {
    setShowReview(false);
    setShowUpload(false);
    setShowTemplate(false);
    setShowPreview(false);
    setViewSendPage(true);
    setShowRunSchedule(false);
  }


  function viewRunSchedule() {
    setShowReview(false);
    setShowUpload(false);
    setShowTemplate(false);
    setShowPreview(false);
    setViewSendPage(false);
    setShowRunSchedule(true);
  }


  function showSteps() {

    // if (currentStep == 1) {
    //   showSelectTemplate();
    //   return;
    // }
    console.log(currentStep);
    // if (currentStep === 1) {

    //   viewRunSchedule();

    //   return;
    // }
    if (currentStep === 1) {

      showUploadPage();

      return;
    }

    if (currentStep === 2) {

      showReviewPage();

      return;
    }

    if (currentStep === 3) {
      showPreviewPage();

      return;
    }

    if (currentStep === 4) {
      showSendPage();
    }

  }




  const handleBack = () => {
    setCurrentStep(currentStep - 1);

    setStepShow((step) => step - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  const templateSelected = (id) => {
    setTemplateId(id);
    setNextButtonEnable(false);

  }

  const handleUploadedData = (data) => {
    setAccountData(data);
    setNextButtonEnable(false);
  }

  const handleConfirmSending = (confirmSending) => {
    if (confirmSending == "confirm") {
      handleNextSteps();

    } else {
      setShowConfirmModal(confirmSending);
    }

  }

  const handleDateSet = (dateSet) => {
    console.log(dateSet);
    setNextButtonEnable(dateSet);
  }

  function extractAccount() {
    authenticationService
      .extractData()
      .then((User) => {
        setUser(User);
      })
      .catch((error) => {
        // console.log("invalid credentials");
        console.log(error);

      });
  }

  const handleDateRange = (dateRange) => {
    setDateUpload(dateRange);
    console.log(dateRange);
  }

  const handlePdfPath = (pdfPath) => {
    console.log(pdfPath);
    setPdfPath(pdfPath);
  }

  const handleHtmlPath = (htmlPath) => {
    console.log(htmlPath);
    setHtmlPath(htmlPath);
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
        setHtmlPath(response);
        props.htmlPath(response);
      })
      .catch((error) => {

        console.log(error.data);
      });
  }

  const handleFileHeader = (fileHeader) => {
    setFileHeader(fileHeader);
   
    console.log(fileHeader);
  }

  useEffect(() => {

    showSteps();
    extractAccount();
    getPdfPath();
    getHtmlPath();
  }, [currentStep, accountData, templateId, pdfPath]);

  return (
    <ThemeProvider theme={outerTheme} className='mainBillMenu'>

      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={2}
      >

        {!viewSendPage ?

          <Button
            color="primary"
            variant="text"
            disabled={activeStep === 0}
            onClick={handleBack}
            // sx={{ mr: 1 }}
            className='buttonBack'
          >
            {
              activeStep !== 0 ? <img className='arrowPrev' src={arrowNext} /> : null
            }

            {/* <KeyboardArrowLeftIcon /> */}

          </Button>
          : null
        }




        <Box className='stepperBox' >
          <Stepper nonLinear activeStep={activeStep} alternativeLabel className='Stepper' >

            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}  >
                <StepButton variant="steps" color='primary' disableRipple={true}>
                  {label}
                </StepButton>
              </Step>
            ))}

          </Stepper>

          {showRunSchedule ? <RunScheduler
            dateRange={handleDateRange}
            dateSet={handleDateSet}
            pdfPath={handlePdfPath}
            htmlPath={handleHtmlPath} /> : null}

          {showUpload ? <Upload templateId={templateId} uploadData={handleUploadedData} fileHeader={handleFileHeader} /> : null}
          {showReview ? <Review dataFromUpload={accountData} fileHeader={fileHeader} /> : null}
          {showPreview ? <Preview pdfPath={pdfPath} htmlPath={htmlPath} /> : null}
          {showConfirmModal ? <ConfirmModal showModal={showConfirmModal} confirmSend={handleConfirmSending} /> : null}
          {viewSendPage ? <SendPage dataFromUpload={accountData} merchantId={user.merchantId} dateUpload={dateUpload} /> : null}



        </Box>

        {!viewSendPage ?


          <Button onClick={handleComplete}
            color="primary"
            variant="text"
            disabled={nextButtonEnable}
            className='buttonNext'
          >

            {/* {completedSteps() === totalSteps() - 1
                    ? 'Send'
                    : 'Next'} */}

            <img className='arrowNext' src={arrowNext} disabled={nextButtonEnable} />
            {/* <KeyboardArrowRightIcon /> */}
          </Button>
          : null
        }
      </Stack>

      {!viewSendPage ?
        <div className='stepperButton'>
          {/* {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Send</Button>
              </Box>
            </React.Fragment>
          ) :  */}
          {/* ( */}


          {/* )} */}
        </div>
        : null
      }


    </ThemeProvider >
  );
}
