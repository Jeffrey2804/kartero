import React, { useState, useEffect, useRef } from 'react'
import TablePreview from './TablePreview';
import '../../Styles/Review.css';
import { Stack } from '@mui/material';

import { templateService } from '../../Services/template.service';
function Review(props) {

  const [pdfPath, setPdfPath] = useState();

  const getPdfPath = () => {
    const templateId = window.localStorage.getItem("tId");
    templateService
      .getPdfPath(templateId)
      .then((response) => {
        setPdfPath(response);
        props.pdfPath();
      })
      .catch((error) => {

        console.log(error.data);
      });
  }


  useEffect(() => {
    console.log(props.fileHeader);
    getPdfPath();

    return () => {
     
    };
  }, [pdfPath]);


  return (
    <div className='review'>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0.5}
      >
        <TablePreview dataFromUpload={props.dataFromUpload} fileHeader ={props.fileHeader}/>
        <div className='reviewFooterMessage'>Review data before sending</div>
      </Stack>
    </div>
  )
}

export default Review