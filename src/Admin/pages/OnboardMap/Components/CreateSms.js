import React, { useState, useEffect, useRef } from 'react'
// import '../../Styles/Template.css';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';

import samplePdf2 from '../../../../Images/samplePDF1.png';

import Grow from '@mui/material/Grow';
import { TextField } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


const options = {
    shouldForwardProp: (prop) => prop !== 'rounded',
};

function CreateSms(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [colorSelected, setColorSelected] = useState({ color: 'red' });
    const [checked, setChecked] = React.useState(false);
    const [smsContent, setSmsContent] = React.useState({
        text: ''
    });
    const handleChange = (prop) => (event) => {
        setSmsContent({...smsContent, [prop]: event.target.value});
        if(smsContent === '\n'){
            setSmsContent({...smsContent, [prop]: event.target.value.con});
        }
       props.smsContents(smsContent); 
    }
    console.log("Test: " + smsContent);
    const ref = useRef(null);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    const templateSelected = event => {
      
        const cardSelected = ref.current;

        cardSelected.className = "cardSelected";
        console.log("items Selected " + event.currentTarget.className);
        //console.log(props.getName);
        setColorSelected({ color: 'orange' });

      //  props.templateId("793759");
    }

    useEffect(() => {
        setChecked((prev) => !prev);
        return () => {
            setChecked((prev) => !prev);
        };
    }, []);

    return (
        <div className='template'>

            <Box className='mainContentBox'>

                <Box className='billHolder'>
            <Box component="form"
                sx={{"& .MuiTextField-root": { m: 4, width: "63vw", 
                // alignItems: "center", justifyContent: "center" 
                }}}
                noValidate
                autoComplete="off">
                    <div>
                        <TextField id='outlined-multiline-static' multiline rows={7} 
                            fullWidth
                            value={smsContent.text}
                            label=""
                            onChange={handleChange('text')}
                            placeholder="Type Your Message Here (Max 160 Characters)"/>
                    </div>
                    {console.log(smsContent)}
                    <div className='title'>
                        <ul>
                            <li>
                                Do not put any links
                            </li>
                            <li>
                                The same message will be sent to all contacts of the merchant
                            </li>
                        </ul>
                    </div>
            </Box>
            </Box>


</Box>


</div >
    )
}

export default CreateSms