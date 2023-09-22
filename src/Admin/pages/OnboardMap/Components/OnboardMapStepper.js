import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountVerification from './AccountVerification';
import UploadExcel from './UploadExcel';
import GlobalVariableMatching from './GlobalVariableMatching';
import TransactionVariableMatching from './TransactionVariableMatching';
import SelectPdf from './SelectPdf';
import PdfMapping from './PdfMapping';
import SelectHtml from './SelectHtml';
import HtmlMapping from './HtmlMapping';
import CreateSms from './CreateSms';
import ExcelPreview from './ExcelPreview';
import SetSchedule from './SetSchedule';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StepButton from '@mui/material/StepButton';
import { useNavigate } from 'react-router-dom';
import '../../../../Styles/AdminStepper.css';
import { adminConfigurationService } from '../../../../AdminServices/configuration.service';
import GlobalVariableMatchingv2 from './GlobalVariableMatchingv2';
import PdfMappingv2 from './PdfMappingv2';
import HtmlMappingv2 from './HtmlMappingv2';
import { globalVariablesService } from '../../../../AdminServices/globalVariable.service'

import { adminAccountService } from '../../../../AdminServices/account.service';
import { mappingService } from '../../../../AdminServices/mapping.service';
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
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'dashed' },
                    style: {
                        textTransform: 'none',
                        border: `2px solid ${defaultTheme.palette.primary.main}`,
                        color: defaultTheme.palette.primary.main,
                    },
                },

            ],
        },
        MuiStepConnector: {
            variants: [{
                props: { variant: "steps" },
                style: {
                    border: `2px dashed ${defaultTheme.palette.primary.main}`,
                    color: defaultTheme.palette.primary.main,
                },
            }],
        },
    },
});

export default function OnboardMapStepper(props) {
    // const [page, setPage] = useState(0);
    // const conditionalComponent = () => {
    //     switch (page) {
    //         case 0:
    //             return <SelectPdf />;
    //         case 1:
    //             return <PdfMapping />;
    //         case 2:
    //             return <SelectHtml />;
    //         case 3:
    //             return <HtmlMapping />;
    //         default:
    //             return <SelectPdf />;
    //     }
    // }

    // function handleSubmit(){
    //     setPage(page + 1);
    // }

    // return(
    //     <div className='adminPage'>
    //         {conditionalComponent()}
    //         <Button onClick={handleSubmit}>
    //             {page === 0 || page === 1 ? "Next" : "Submit"}
    //         </Button>
    //         {page > 0 && <Button onClick={() => setPage(page-1)}>Back</Button>}
    //     </div>
    // )

    const steps = ['', '', '', '', ''
        , '', '', '', ''
    ];
    const [activeStep, setActiveStep] = React.useState(0);
    console.log("Active Step" + activeStep)
    const [completed, setCompleted] = React.useState({});

    const [stepShown, setStepShow] = useState(0);
    const navigate = useNavigate();
    const [showTemplate, setShowTemplate] = useState(true);
    const [showSelectPDF, setShowSelectPDF] = useState(false);
    const [showPDFMapping, setShowPDFMapping] = useState(false);
    const [showSelectHTML, setShowSelectHTML] = useState(false);
    const [showHTMLMapping, setShowHTMLMapping] = useState(false);
    const [showCreateSMS, setShowCreateSMS] = useState(false);
    const [showExcelPreview, setShowExcelPreview] = useState(false);
    const [showSelectDefaultSchedule, setShowSelectDefaultSchedule] = useState(false);
    const [stepName, setStepName] = useState("");
    const [currentStep, setCurrentStep] = useState(1);

    const [mappingConfig, setMappingConfig] = useState([]);
    const [htmlConfig, setHtmlConfig] = useState([]);
    const [pdfConfig, setPdfConfig] = useState([]);
    const [globalVariables, setGlobalVariables] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [transactionVariables, setTransactionVariables] = useState([]);
    const [pdfID, setPdfID] = useState();
    const [pdfPath, setPdfPath] = useState();
    const [htmlID, setHtmlID] = useState();
    const [htmlPath, setHtmlPath] = useState();
    const [smsContent, setSMSContent] = useState([]);
    const [metadataHeader, setMetadataHeader] = useState([]);
    const merchantID = props.merchantID;
    const merchantInfo = props.merchantValues;

    const [showAccountVerification, setShowAccountVerification] = useState(false);
    const [showUploadExcel, setShowUploadExcel] = useState(false);
    const [showGlobalVariableMatching, setShowGlobalVariableMatching] = useState(false);
    const [showTransactionVariableMatching, setShowTransactionVariableMatching] = useState(false);

    const [nextButtonEnable, setNextButtonEnable] = useState(true);

    const [templateName, setTemplateName] = useState("");
    const [subscriptionId, setSubscriptionId] = useState("");

    const createTemplate = () => {


        var mergeObject = { ...pdfConfig, ...htmlConfig }
        // console.log(mergeObject);
        const mergePdfHtmlMapping = [...pdfConfig, ...htmlConfig];
        const mergeMapping = mergeMappedValues_v2(globalVariables, pdfConfig, htmlConfig, metadataHeader)

        getActiveTemplateById(props.merchantID);

        const serviceType = '';
        adminConfigurationService
            .createConfig(
               
                merchantID,
                transactionVariables,
                pdfPath,
                htmlPath,
                smsContent,
                serviceType,
                subscriptionId,
                templateName)
            .then((response) => {

                console.log(response);

                createMappingConfig(mergeMapping, response.templateId, props.merchantID);
            }).catch((error) => {

            })
    }


    const createMappingConfig = (mappingConfig, currentTemplateId, merchantId) => {
        mappingService
            .createMappingConfig(mappingConfig, currentTemplateId, merchantId)
            .then((response) => {

                console.log(response);
            }).catch((error) => {

            })
    }
    const getActiveTemplateById = (merchantId) => {
        adminAccountService
            .getActiveSubsByMerchantId(merchantId)
            .then((response) => {
                console.log(response);

                return response;
            })
            .catch((error) => {

            })
    }



    const mergeMappedValues_v2 = (currentGlobalVariable, pdfMapping, htmlConfig, metadataHeader) => {

        var ctr = 0;

        const mergeValues = currentGlobalVariable.map(obj => {


            var pdfStatemenField = "";
            var htmlStatementField = "";
            var metaDataHeader = "";
            var name = "";




            metadataHeader.map(metaData => {
                if (metaData.name == obj.id) {
                    metaDataHeader = metaData.statementField
                    name = metaData.name
                }
            })

            pdfMapping.map(pdfMap => {
                if (pdfMap.globalVariableId == obj.id) {
                    pdfStatemenField = pdfMap.statementField
                    name = pdfMap.name
                }
            })


            htmlConfig.map(htmlMap => {
                if (htmlMap.globalVariableId == obj.id) {
                    htmlStatementField = htmlMap.statementField
                    name = htmlMap.name
                }
            })

            console.log(pdfStatemenField);
            console.log(htmlStatementField);




            return {
                globalVariableId: obj.id,
                htmlPlaceholder: htmlStatementField,
                pdfField: pdfStatemenField,
                metadataHeader: metaDataHeader
            }

        });

        console.log(mergeValues)
        return mergeValues;
    };



    const mergeMappedValues = (currentGlobalVariable, currentMapping, mapType) => {


        const mergeValues = currentGlobalVariable.map(obj => {
            const index = currentMapping.findIndex(element => element["name"] == obj["name"]);

            console.log(obj);
            console.log(currentMapping["name"]);
            console.log(currentMapping);
            console.log(index);
            if (mapType === "pdf") {
                var { statementField } = index !== -1 ? currentMapping[index] : {};
                if (statementField === undefined) {
                    statementField = "";
                    return {
                        ...obj,
                        statementField
                    }
                } else {
                    return {
                        ...obj,
                        statementField
                    }
                }
            } else {
                var { emailPlaceholder } = index !== -1 ? currentMapping[index] : {};
                if (emailPlaceholder === undefined) {
                    emailPlaceholder = "";
                    return {
                        ...obj,
                        emailPlaceholder
                    }
                } else {
                    return {
                        ...obj,
                        emailPlaceholder
                    }
                }
            }
        });
        return mergeValues;
    };

    const mergeUniquely = (mergedByName, mergedValues) => {
        const newArr = mergedByName.concat(mergedValues);
        const map = {};
        const res = [];
        newArr.forEach(el => {
            if (!map[el['name']]) {
                res.push(el);
                map[el['name']] = 1;
            };
        });
        return res;
    }

    const totalSteps = () => {
        return steps.length;
    };

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
        // const newActiveStep =
        // isLastStep() && !allStepsCompleted()
        //     ? // It's the last step, but not all steps have been completed,
        //     // find the first step that has been completed
        //     steps.findIndex((step, i) => !(step in completed))
        //     : activeStep + 1;
        // setActiveStep(newActiveStep);
        setStepShow((step) => step + 1);
        showSteps();
        setNextButtonEnable(true);
        // setActiveStep(activeStep + 1);
        setCurrentStep(currentStep + 1);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);


    };

    const handleBack = () => {
        console.log("Test:" + currentStep)
        setStepShow((step) => step - 1);
        // setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setCurrentStep(currentStep - 1);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        console.log("Test" + currentStep);
        showSteps();
    };

    function showSelectTemplate() {
        setShowTemplate(true);
        setShowAccountVerification(false);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(false);
        setShowPDFMapping(false);
        setShowSelectHTML(false);
        setShowSelectHTML(false);
        setShowCreateSMS(false);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(false);
    }

    function showAccountVerificationPage() {
        setStepName("Account Details Verification")
        setShowTemplate(false);
        setShowAccountVerification(true);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(false);
        setShowPDFMapping(false);
        setShowSelectHTML(false);
        setShowSelectHTML(false);
        setShowCreateSMS(false);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(false);
        setNextButtonEnable(false);
    }

    function showUploadExcelPage() {
        setStepName("Upload Excel");
        setShowTemplate(false);
        setShowAccountVerification(false);
        setShowUploadExcel(true);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(false);
        setShowPDFMapping(false);
        setShowSelectHTML(false);
        setShowSelectHTML(false);
        setShowCreateSMS(false);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(false);
    }

    function showGlobalVariableMatchingPage() {
        setStepName("Global Variable Matching");
        setShowTemplate(false);
        setShowAccountVerification(false);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(true);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(false);
        setShowPDFMapping(false);
        setShowSelectHTML(false);
        setShowSelectHTML(false);
        setShowCreateSMS(false);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(false);
    }

    function showTransactionVariableMatchingPage() {
        setStepName("Transaction Variable Matching");
        setShowTemplate(false);
        setShowAccountVerification(false);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(true);
        setShowSelectPDF(false);
        setShowPDFMapping(false);
        setShowSelectHTML(false);
        setShowSelectHTML(false);
        setShowCreateSMS(false);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(false);
    }

    function showSelectPDFPage() {
        setStepName("Select PDF");
        setShowTemplate(false);
        setShowAccountVerification(false);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(true);
        setShowPDFMapping(false);
        setShowSelectHTML(false);
        setShowSelectHTML(false);
        setShowCreateSMS(false);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(false);
    }

    function showPDFMappingPage() {
        setStepName("PDF Mapping");
        setShowTemplate(false);
        setShowAccountVerification(false);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(false);
        setShowPDFMapping(true);
        setShowSelectHTML(false);
        setShowHTMLMapping(false);
        setShowCreateSMS(false);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(false);
    }

    function showSelectHTMLPage() {
        setStepName("Select HTML");
        setShowTemplate(false);
        setShowAccountVerification(false);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(false);
        setShowPDFMapping(false);
        setShowSelectHTML(true);
        setShowHTMLMapping(false);
        setShowCreateSMS(false);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(false);
    }

    function showHTMLMappingPage() {
        setStepName("HTML Mapping");
        setShowTemplate(false);
        setShowAccountVerification(false);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(false);
        setShowPDFMapping(false);
        setShowSelectHTML(false);
        setShowHTMLMapping(true);
        setShowCreateSMS(false);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(false);
    }

    function showCreateSMSPage() {
        setStepName("Create SMS Text");
        setShowTemplate(false);
        setShowAccountVerification(false);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(false);
        setShowPDFMapping(false);
        setShowSelectHTML(false);
        setShowHTMLMapping(false);
        setShowCreateSMS(true);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(false);
    }

    function showExcelPreviewPage() {
        setStepName("Excel Preview");
        setShowTemplate(false);
        setShowAccountVerification(false);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(false);
        setShowPDFMapping(false);
        setShowSelectHTML(false);
        setShowHTMLMapping(false);
        setShowCreateSMS(false);
        setShowExcelPreview(true);
        setShowSelectDefaultSchedule(false);
    }

    function showSelectDefaultSchedulePage() {
        setStepName("Select Default Schedule");
        setShowTemplate(false);
        setShowAccountVerification(false);
        setShowUploadExcel(false);
        setShowGlobalVariableMatching(false);
        setShowTransactionVariableMatching(false);
        setShowSelectPDF(false);
        setShowPDFMapping(false);
        setShowSelectHTML(false);
        setShowHTMLMapping(false);
        setShowCreateSMS(false);
        setShowExcelPreview(false);
        setShowSelectDefaultSchedule(true);
    }

    function showSteps() {
        // console.log("Stepshow: " + stepShown);
        console.log("Active Step Test: " + currentStep);

        // if(activeStep === 0){
        //     showSelectTemplate();
        //     return;
        // }
        if (currentStep === 1) {
            showAccountVerificationPage();
            return
        }
        if (currentStep === 2) {
            showUploadExcelPage();
            return
        }
        if (currentStep === 3) {
            console.log(templateName);
            showGlobalVariableMatchingPage();
            return
        }
        if (currentStep === 4) {
            showTransactionVariableMatchingPage();
            return
        }
        if (currentStep === 5) {
            showSelectPDFPage();
            return;
        }
        if (currentStep === 6) {
            showPDFMappingPage();
            return;
        }
        if (currentStep === 7) {
            showSelectHTMLPage();
            return;
        }
        if (currentStep === 8) {
            showHTMLMappingPage();
            return;
        }
        if (currentStep === 9) {
            showCreateSMSPage();
            return;
        }
        // if (currentStep === 9) {
        //     showExcelPreviewPage();
        //     return;
        // }
        // if (currentStep === 10) {
        //     showSelectDefaultSchedulePage();
        //     return;
        // }

        // if(stepShown  === 1){
        // showSelectTemplate();
        // }
        // if(stepShown ===2){
        //     showSelectHtmlPage();
        // }
        // else if(stepShown  == 0){
        // showUpload();
        // }

        // console.log("Show Template: " + showTemplate);
        console.log("Show Select HTML: " + showSelectHTML)
        // console.log("Step Shown: " + stepShown);
    }

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

    function submitClick() {
        { createTemplate() }
        // {handleCollectAllConfig()}
        navigate(process.env.REACT_APP_PATH + "/dashboard");
    }

    const handleHtmlConfig = (data) => {

        setNextButtonEnable(false);
        setHtmlConfig(data);
    }

    const handlePdfConfig = (data) => {
        setNextButtonEnable(false);
        setPdfConfig(data);
    }

    const getAllGlobalVariables = () => {
        globalVariablesService
            .getGlobalAllVarialbes()
            .then((response) => {
                console.log(response);
                setGlobalVariables(response);
                setNextButtonEnable(false);
            })
            .catch((error) => {

            })
    }


    const handleHeaders = (data) => {
        setHeaders(data);
        setNextButtonEnable(false);
    }

    const handleTransactionVariables = (data) => {
        setTransactionVariables(data);
        setNextButtonEnable(false);
    }

    const handlePDFData = (pdfIdData, pdfFilePath) => {
        setPdfID(pdfIdData);
        setPdfPath(pdfFilePath);
        setNextButtonEnable(false);
    }

    const handleSMS = (sms) => {

        setNextButtonEnable(false);
        setSMSContent(sms);
    }

    const handleHTMLData = (htmlIdData, htmlFilePath) => {
        console.log(htmlIdData);
        console.log(htmlFilePath);
        setHtmlID(htmlIdData);
        setHtmlPath(htmlFilePath);
        setNextButtonEnable(false);
    }

    useEffect(() => {

        showSteps();

    }, [currentStep, mappingConfig, htmlConfig, pdfConfig]);

    useEffect(() => {


        getAllGlobalVariables();
    }, []);



    const handleTemplateName = (currentTemplateName) => {
        console.log("templateName is : " + currentTemplateName);
        setTemplateName(currentTemplateName);
    }

    const handleSubscriptionId = (currentSubscriptionId) => {
        // console.log("current subscription id : " + currentSubscriptionId);
        setSubscriptionId(currentSubscriptionId);
    }

    const handleMetadataHeader = (metaData) => {
        setMetadataHeader(metaData);
        setNextButtonEnable(false);
        console.log(metaData);
    }

    return (
        <div>
            {/* <div className='adminPageHeader' > */}
            <div className='title'>
                <Typography sx={{
                    mt: 2, mb: 1, py: 1,
                    textAlign: 'center', fontSize: 25, fontWeight: 'bold'
                }}>
                    {stepName}
                </Typography>
            </div>
            {/* </div> */}
            <ThemeProvider theme={outerTheme}>

                <Box className='adminStepperBox' >
                    <Stepper nonLinear activeStep={activeStep} alternativeLabel className='Stepper' >

                        {steps.map((label, index) => (
                            <Step key={label}
                            // completed={completed[index]}  
                            >
                                <StepButton onClick={handleStep(index)} variant="steps" color='primary'>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}

                    </Stepper>

                    {showAccountVerification ? <AccountVerification merchantID={merchantID} merchantInfo={merchantInfo} /> : null}
                    {showUploadExcel ? <UploadExcel uploadData={handleHeaders} merchantID={merchantID}
                        subscriptionId={handleSubscriptionId}
                        templateName={handleTemplateName}
                    /> : null}
                    {showGlobalVariableMatching ? <GlobalVariableMatchingv2 headerList={headers} globalVariablesList={globalVariables} metaDataHeader={handleMetadataHeader} /> : null}
                    {showTransactionVariableMatching ? <TransactionVariableMatching transactionVariablesData={handleTransactionVariables} /> : null}
                    {showSelectPDF ? <SelectPdf pdfData={handlePDFData} /> : null}
                    {showPDFMapping ? <PdfMappingv2 pdfId={pdfID} pdfPath={pdfPath} mappingConfigData={handlePdfConfig} globalVariablesList={globalVariables} /> : null}
                    {showSelectHTML ? <SelectHtml htmlData={handleHTMLData} /> : null}
                    {showHTMLMapping ? <HtmlMappingv2 htmlId={htmlID} htmlPath={htmlPath} mappingConfigData={handleHtmlConfig} globalVariablesList={globalVariables} /> : null}
                    {showCreateSMS ? <CreateSms smsContents={handleSMS} /> : null}
                    {/* {showExcelPreview? <ExcelPreview globalVariablesList={globalVariables} transactionVariablesList={transactionVariables} pdfConfig={pdfConfig} htmlConfig={htmlConfig} collectAllData={handleCollectAllConfig}/> : null} */}
                    {/* {showSelectDefaultSchedule? <SetSchedule/> : null} */}

                    <div className='adminStepperButton'>
                        {activeStep === 9 ? (
                            <React.Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="secondary"
                                        variant="dashed"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className='adminButtonBack'
                                    >
                                        <KeyboardArrowLeftIcon />
                                        Back
                                    </Button>


                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={submitClick()}
                                        color="secondary"
                                        disabled={false}
                                        variant="dashed">
                                        Submit
                                        <KeyboardArrowRightIcon />
                                    </Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="secondary"
                                        variant="dashed"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className='adminButtonBack'
                                    >
                                        <KeyboardArrowLeftIcon />
                                        Back
                                    </Button>


                                    <Box sx={{ flex: '1 1 auto' }} />

                                    <Button onClick={handleNext}
                                        color="secondary"
                                        variant="dashed"
                                        disabled={nextButtonEnable}
                                    >

                                        {activeStep < 8 ? "Next" : "Submit"}
                                        <KeyboardArrowRightIcon />
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </div>
                </Box>
            </ThemeProvider>
        </div>

    );
}