import React, { useState, useEffect, useRef } from 'react'
import '../../Styles/Preview.css';
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';
import Grow from '@mui/material/Grow';

import samplePdf from '../../Images/samplePdf.png';
import sampleSms from '../../Images/sms.png';
import sampleEmail from '../../Images/email.png';

import Stack from '@mui/material/Stack';

import { templateService } from '../../Services/template.service';
import MessageBubble from './MessageBubble';
import { ArrowLeft } from '@mui/icons-material';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';


function Preview(props) {
  const [checked, setChecked] = useState(false);
  const ref = useRef(null);
  const [pdfPath, setPdfPath] = useState();
  const [htmlPath, setHtmlPath] = useState();
  const [pdfFile, setPdfFile] = useState();
  const [htmlFile, setHtmlFile] = useState();
  const [smsFile, setSmsFile] = useState("");


  const getPdfTemplate = () => {
    console.log(props.pdfPath);
    templateService
      .getPdf(props.pdfPath)
      .then((response) => {
        console.log(response);
        setPdfFile(response);
      })
      .catch((error) => {

        console.log(error.data);
      });
  }


  const getHtmlTemplate = () => {
    console.log(props.htmlPath);
    templateService
      .getHtml(props.htmlPath)
      .then((response) => {
        console.log(response);
        setHtmlFile(response);
      })
      .catch((error) => {

        console.log(error.data);
      });
  }

  const getSmsTemplate = () => {
    const templateId = window.localStorage.getItem("tId");
    templateService
      .getSms(templateId)
      .then((response) => {
        console.log(response);
        setSmsFile(response);
      })
      .catch((error) => {

        console.log(error.data);
      });
  }




  useEffect(() => {
    // getPdfPath();
    // getHtmlPath();
    console.log(props.pdfPath);
    console.log(props.htmlPath);
    getSmsTemplate();
    getPdfTemplate();
    getHtmlTemplate();
    setChecked((prev) => !prev);
    return () => {
      setChecked((prev) => !prev);
    };
  }, [props.pdfPath]);

  return (
    <div className='preview'>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <Stack
            direction="column"
            justifyContent="stretch"
            alignItems="center"
            spacing={0}
          >
            <div className='cardSizePdf'>
              <div className='cardPdfTitle'>
                PDF
              </div>
              <div className='cardContent'>
                <iframe src={`data:application/pdf;base64,${pdfFile}#toolbar=0`} width="100%" height="100%"></iframe>
              </div>
            </div>
          </Stack>
          <Stack
            direction="column"
            justifyContent="stretch"
            alignItems="center"
            spacing={0}
          >
            <div className='cardSize'>
              <div className='cardHtmlTitle'>
                HTML
              </div>
              <div className='cardContent'>
                {/* <Scrollbars
                  style={{ height: 300 }}>
                </Scrollbars> */}
                <iframe src={`data:text/html;base64,${htmlFile}#toolbar=0`} width="100%" height="100%"></iframe>
              </div>
            </div>
          </Stack>

          <Stack
            direction="column"
            justifyContent="stretch"
            alignItems="center"
            spacing={0}
          >
            <div className='cardSize'>
              <div className='cardSmsTitle'>
                SMS
              </div>
              <div className='cardContent'>
                <div className="smartphone">
                  <div className='bg-slate-400 h-10 text-white p-1'>
                    <ArrowLeft
                      className="h-6 w-6"
                    />
                    +639123456789
                  </div>
                  <div className="content">
                    <MessageBubble message={smsFile} />
                    {/* <iframe src={`data:text/html;charset=utf-8,${smsFile}#toolbar=0`} width="100%" height="100%" ></iframe> */}
                  </div>
                  <div className='bg-slate-400 h-16 text-white p-1 flex flex-row'>

                    <textarea
                      id="OrderNotes"
                      class="mt-2 w-64 pl-10 rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                      rows="2"
                    // placeholder="Enter any additional order notes..."
                    ></textarea>
                    <PaperAirplaneIcon
                      className="h-full w-6 bg-slate-400"
                    />
                  </div>
                </div>

              </div>
            </div>
          </Stack>





        </Stack >
        <div className='previewFooterMessage'>Preview Template</div>
      </Stack>
    </div >
  )
}

export default Preview