import React, { useState, useEffect, useRef } from 'react'
// import '../../Styles/Template.css';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import Card from 'react-bootstrap/Card';
import { FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import samplePdf2 from '../../../../../Images/email.png';
import { adminConfigurationService } from '../../../../../AdminServices/configuration.service';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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

function HTMLMapping(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [colorSelected, setColorSelected] = useState({ color: 'red' });
    const [pdfHeaders, setPdfHeaders] = useState([]);
    const ref = useRef(null);
    const listOfValues = [];

    const viewPdfHeaders = () => {
        adminConfigurationService
            .getEmailPlaceholders()
            .then((response) => {
                setPdfHeaders(response);
                props.setPdfHeaders(response);
                console.log(response);
            })
            .catch((error) => {

            });
    }

    useEffect(() => {
        viewPdfHeaders();
    }, []);

    function addValueToList() {
        for (var i = 0; i < pdfHeaders.length; i++) {
            const addToArraylist = ({
                name: '',
                statementField: pdfHeaders[i],
                emailPlaceholder: 'null',
                parserFormat: '',
                delimeter: '',
                type: ''
            });
            listOfValues.push(addToArraylist);
        }
        return listOfValues
    }

    const addToList = addValueToList();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(listOfValues);
    };

    const handleChange = (index, id, event) => {
        const rowValue = { ...listOfValues };

        listOfValues.map(i => {
            if (id === rowValue[index].statementField) {
                rowValue[index][event.target.name] = event.target.value
            }
            return i
        })
    }

    const templateSelected = event => {

        const cardSelected = ref.current;

        cardSelected.className = "cardSelected";
        console.log("items Selected " + event.currentTarget.className);
        setColorSelected({ color: 'orange' });
    }

    return (
        <div className='adminPage'>
            <div className='title'>
                <Typography sx={{
                    mt: 2, mb: 1, py: 1,
                    textAlign: 'center', fontSize: 25, fontWeight: 'bold'
                }}>
                    Edit HTML Mapping
                </Typography>
            </div>
            <ThemeProvider theme={outerTheme}>
                <Box className='adminStepperBox' >

                    <div className='template'>

                        <Box className='mainContentBox'>

                            <Box className='billHolder'>
                                <Card ref={ref} className="card" onClick={templateSelected}  >
                                    <Card.Img className="cardImage" variant="top" />
                                    <Card.Body className="cardBody">
                                        <img className='templateHolder' src={samplePdf2} />
                                    </Card.Body>
                                </Card>

                                <Card className="mappingCard">
                                    <Card.Body className="mappingCardBody">
                                        <Grid container spacing={1} columns={12}>
                                            <Grid item xs={4}>
                                                <div className='contentHolder'>
                                                    <div className='mappingTitle'>Metadata Field</div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <div className='contentHolder'>
                                                    <div className='mappingTitle'>CSV Header Name</div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <div className='contentHolder'>
                                                    <div className='mappingTitle'>Datatype</div>
                                                </div>
                                            </Grid>

                                            {addToList.map((fields, index) =>
                                                <div>

                                                    <div key={index.toString}>

                                                        <Stack
                                                            direction="column"
                                                            justifyContent="left"
                                                            alignItems="left"
                                                            spacing={4}
                                                        >

                                                            <Box sx={{ width: '30vw' }}>

                                                                <Grid container spacing={6} columns={12}>
                                                                    <Grid item xs={4}>
                                                                        <div className='contentHolder'>
                                                                            <div className='fieldTitle'>{fields.statementField}</div>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <div className='contentHolder'>
                                                                            <TextField fullWidth id='fullWidth' size='small'
                                                                                name="name"
                                                                                value={addToList.name}
                                                                                onChange={event => handleChange(index, fields.statementField, event)}
                                                                            />
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <div className='contentHolder'>
                                                                            <FormControl fullWidth id='fullWidth' size="small">
                                                                                <Select onChange={event => handleChange(index, fields.statementField, event)}
                                                                                    value={addToList.type}
                                                                                    name="type">
                                                                                    <MenuItem value={'Text'}>Text</MenuItem>
                                                                                    <MenuItem value={'Date'}>Date</MenuItem>
                                                                                    <MenuItem value={'Number'}>Number</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </Stack>
                                                    </div>
                                                </div>
                                            )}

                                        </Grid>
                                    </Card.Body>
                                </Card>
                            </Box>


                        </Box>
                    </div>
                    <div className='adminStepperButton'>
                        <React.Fragment>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="secondary"
                                    variant="dashed"
                                    className='adminButtonBack'
                                >
                                    <KeyboardArrowLeftIcon />
                                    Back
                                </Button>


                                <Box sx={{ flex: '1 1 auto' }} />

                                <Button
                                    color="secondary"
                                    variant="dashed"
                                >

                                    Submit
                                    <KeyboardArrowRightIcon />
                                </Button>
                            </Box>
                        </React.Fragment>
                    </div>
                </Box>
            </ThemeProvider>
        </div >
    )
}

export default HTMLMapping