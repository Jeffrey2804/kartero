// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import PDFMapping from './Components/PDFMapping';
// import samplePDF from '../Files/template.pdf';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// function highlightPattern(text, pattern){
//     return text.replace(pattern, (value) => `<mark>${value}</mark>`);
// }

// function TemplateManagement() {
//     const [searchText, setSearchText] = useState('');
//     const [numPage, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);
//   const textRenderer = useCallback(
//     (textItem) => highlightPattern(textItem.str, searchText),
//     [searchText]
//   );

//   function onChange(event) {
//     setSearchText(event.target.value);
//   }

//   function onDocumentLoadSuccess({numPages}){
//     setNumPages(numPage);
//     setPageNumber(1);
//   }

//   return (
//     <>
      
//       <div>
//       <Document file={samplePDF} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page
//             height={600}
//           pageNumber={pageNumber}
//         //   customTextRenderer={textRenderer}
//         />
//       </Document>
//         <label htmlFor="search">Search:</label>
//         <input type="search" id="search" value={searchText} onChange={onChange} />
//       </div>
//     </>
//   );
// }

// export default TemplateManagement


// import { Html, PictureAsPdf } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
// import React from "react";
// import { useDropzone } from "react-dropzone";
// import { adminConfigurationService } from "../AdminServices/configuration.service";

// function TemplateManagement() {
//     const {getRootProps:getRootPdfProps, getInputProps:getnInputPdfProps} = useDropzone({
//         onDrop: (acceptedFile) => {
//             acceptedFile.forEach((pdfFile) => {
//                 const reader = new FileReader();

//                 reader.onload = () => {
//                     uploadPdfFile(pdfFile);
//                 };
//                 reader.readAsArrayBuffer(pdfFile);
//             })
//         }
//     })

//     const uploadPdfFile = (pdfFile) => {
//         adminConfigurationService
//             .uploadPDF(pdfFile)
//             .then((response) => {
//                 window.location.reload(false);
//             })
//             .catch((error) => {

//             });
//     }

//     const {getRootProps:getRootHtmlProps, getInputProps:getInputHtmlProps} = useDropzone({
//         onDrop: (acceptedFile) => {
//             acceptedFile.forEach((htmlFile) => {
//                 const reader = new FileReader();

//                 reader.onload = () => {
//                     uploadHtmlFile(htmlFile);
//                 };
//                 reader.readAsArrayBuffer(htmlFile);
//             })
//         }
//     })

//     const uploadHtmlFile = (htmlFile) => {
//         adminConfigurationService
//             .uploadHTML(htmlFile)
//             .then((response) => {
//                 window.location.reload(false);
//             })
//             .catch((error) => {

//             });
//     }

//     return (
//         <div className="adminPageContent">
//             <IconButton {...getRootPdfProps({className: 'dropzone'})}>
//                 <input {...getnInputPdfProps()} />
//                 <PictureAsPdf>Download PDF</PictureAsPdf>
//             </IconButton>

//             <IconButton {...getRootHtmlProps({className: 'dropzone'})}>
//                 <input {...getInputHtmlProps()} />
//                 <Html>Download HTML</Html>
//             </IconButton>
//         </div>
//     )

// }

// export default TemplateManagement


import { Card, FormControl, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function TemplateManagement() {
    return(
        <div className="adminPage">
            
        </div>
    )
}

export default TemplateManagement