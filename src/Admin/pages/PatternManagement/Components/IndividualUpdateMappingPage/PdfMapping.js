import React, { useState, useEffect, useRef } from 'react'
// import '../../Styles/Template.css';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import Card from 'react-bootstrap/Card';
import { FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import samplePdf2 from '../../../../../Images/samplePDF1.png';
import { adminConfigurationService } from '../../../../../AdminServices/configuration.service';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PDFMapping from '../../../../../TemplateManagementComponents/Components/PDFMapping';

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

function PdfMapping(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [colorSelected, setColorSelected] = useState({ color: 'red' });
    const [pdfHeaders, setPdfHeaders] = useState([]);
    const ref = useRef(null);
    const listOfValues = [];

    const viewPdfHeaders = () => {
        adminConfigurationService
            .getStatementField()
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
        for(var i = 0; i < pdfHeaders.length; i++) {
            const addToArraylist = ({name: '',
                        statementField: pdfHeaders[i],
                        emailPlaceholder: 'null',
                        parserFormat: '',
                        delimeter: '',
                        type: ''});
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
        const rowValue = {...listOfValues};

        listOfValues.map(i => {
            if(id === rowValue[index].statementField) {
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
            <PDFMapping templateId = {props.templateId}/>
        </div >
    )
}

export default PdfMapping