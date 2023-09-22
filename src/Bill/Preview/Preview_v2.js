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
        spacing={0}
      >
        <Stack
          direction="row"
          justifyContent="stretch"
          alignItems="center"
          spacing={0}
        >
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <Card ref={ref} className="card" >

              <Card.Body className="cardBody">
                <Stack spacing={1} direction="column" alignItems="center">
                  <Card.Text className='cardText'>
                    EMAIL TEMPLATE
                  </Card.Text>

                  <iframe src={`data:application/pdf;base64,${pdfFile}#toolbar=0`} width="400vw" height="500vh"></iframe>
                </Stack>
              </Card.Body>
            </Card>
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <Card ref={ref} className="card" >

              <Card.Body className="cardBody">
                <Stack spacing={1} direction="column" alignItems="center">
                  <Card.Text className='cardText'>
                    HTML TEMPLATE
                  </Card.Text>

                  <iframe src={`data:text/html;base64,${htmlFile}#toolbar=0`} width="400vw" height="500vh"></iframe>
                </Stack>
              </Card.Body>
            </Card>
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <Card ref={ref} className="card" >

              <Card.Body className="cardBody">
                <Stack spacing={1} direction="column" alignItems="center">
                  <Card.Text className='cardText'>
                    SMS TEMPLATE
                  </Card.Text>
                  {/* {smsFile} */}
                  <iframe src={`data:text/html;charset=utf-8,${smsFile}#toolbar=0`} height="500vh" className='cardText'></iframe>
                </Stack>
              </Card.Body>
            </Card>
          </Grow>

        </Stack>



        <div className='previewFooterMessage'>Preview Template</div>



      </Stack >

    </div >
  )
}

export default Preview