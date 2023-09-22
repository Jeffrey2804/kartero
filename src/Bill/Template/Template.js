import React, { useState, useEffect, useRef } from 'react'
import '../../Styles/Template.css';
import Box from '@mui/material/Box';
import Card from 'react-bootstrap/Card';

import samplePdf from '../../Images/samplePdf.png';


import Grow from '@mui/material/Grow';
import { Event } from '@mui/icons-material';
import PDFViewer from '../Components/PDFViewer';
import { templateService } from '../../Services/template.service';
function Template(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [colorSelected, setColorSelected] = useState({ color: 'red' });
    const [checked, setChecked] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState();
    const ref = useRef(null);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    const templateSelected = (templateId) => {

        // const cardSelected = ref.current;

        // cardSelected.className = "cardSelected";
        // console.log("items Selected " + event.currentTarget.className);
        //console.log(props.getName);
        setSelectedTemplateId(templateId);
        console.log(templateId);
        setColorSelected({ color: 'orange' });
        uploadFile(templateId);
        //  props.templateId("793759");
    }




    const uploadFile = (templateId) => {

        const userId = window.localStorage.getItem("uid");
        console.log(templateId)
        templateService
            .updateActiveTemplate(userId, templateId)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {

                console.log(error.data);
            });
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
                    <Grow
                        in={checked}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1000 } : {})}
                    >
                        <Card ref={ref} className="card" onClick={(event) => templateSelected('7b16102b-65ab-466b-bd86-31ba4d158043')}  >
                            <Card.Img className="cardImage" variant="top" />
                            <Card.Body className="cardBody">

                                <Card.Title className='cardTitle'>Bill Holder</Card.Title>
                                <img className='templateHolder' src={samplePdf} />
                            </Card.Body>
                        </Card>
                    </Grow>

                    {/* <PDFViewer /> */}

                    {/* <Grow
                        in={checked}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1000 } : {})}
                    >
                        <Card  className="card" onClick={templateSelected}  >
                            <Card.Img className="cardImage" variant="top" />
                            <Card.Body className="cardBody">

                                <Card.Title className='cardTitle'>Bill Holder</Card.Title>
                                <img className='templateHolder' src={samplePdf} />
                            </Card.Body>
                        </Card>
                    </Grow>
                    <Grow
                        in={checked}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1000 } : {})}
                    >
                        <Card className="card" onClick={templateSelected}  >
                            <Card.Img className="cardImage" variant="top" />
                            <Card.Body className="cardBody">

                                <Card.Title className='cardTitle'>Bill Holder</Card.Title>
                                <img className='templateHolder' src={samplePdf} />
                            </Card.Body>
                        </Card>
                    </Grow>
                    <Grow
                        in={checked}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1000 } : {})}
                    >
                        <Card className="card" onClick={templateSelected}  >
                            <Card.Img className="cardImage" variant="top" />
                            <Card.Body className="cardBody">

                                <Card.Title className='cardTitle'>Bill Holder</Card.Title>
                                <img className='templateHolder' src={samplePdf} />
                            </Card.Body>
                        </Card>
                    </Grow>
                    <Grow
                        in={checked}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1000 } : {})}
                    >
                        <Card className="card" onClick={templateSelected}  >
                            <Card.Img className="cardImage" variant="top" />
                            <Card.Body className="cardBody">

                                <Card.Title className='cardTitle'>Bill Holder</Card.Title>
                                <img className='templateHolder' src={samplePdf} />
                            </Card.Body>
                        </Card>
                    </Grow>
                    <Grow
                        in={checked}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1000 } : {})}
                    >
                        <Card className="card" onClick={templateSelected}  >
                            <Card.Img className="cardImage" variant="top" />
                            <Card.Body className="cardBody">

                                <Card.Title className='cardTitle'>Bill Holder</Card.Title>
                                <img className='templateHolder' src={samplePdf} />
                            </Card.Body>
                        </Card>
                    </Grow> */}

                </Box>


            </Box >


        </div >
    )
}

export default Template