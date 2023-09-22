import React, { useState, useEffect, useRef } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import '../../Styles/ConfirmModal.css';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FileDropZoneErrorMessage from './FileDropZoneErrorMessage';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import FileDropZoneSingleErrorMessage from './FileDropZoneSingleErrorMessage';
const theme = createTheme({
    palette: {
        primary: {

            main: '#FD9A08',
            contrastText: '#fff',
        },
        secondary: {

            main: '#FFFFFF',
        },
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '550px',
    height: '440px',
    bgcolor: 'background.paper',
    'border-radius': '10px',
    //   border: '2px solid #000',
    boxShadow: 24,

    // p: 4,
};



export default function FileDropZoneSingleLineModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const confirmSend = () => {
        props.confirm("confirm");
        handleClose();
    }
    const cancelSending = () => {
        // props.confirm("confirm");
        handleClose();
    }
    useEffect(() => {
        /*
        setChecked((prev) => !prev);
        return () => {
          setChecked((prev) => !prev);
        };*/
        console.log(props.steps);
        if (props.showModal == true) {
            handleOpen();
            return;
        } else {
            handleClose();
            return
        }


    }, [props.showModal]);


    return (
        <ThemeProvider theme={theme}>
            <div className='confirmModal'>
                <Modal
                    // aria-labelledby="transition-modal-title"
                    // aria-describedby="transition-modal-description"
                    open={open}
                    onClose={confirmSend}

                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    className='modal'
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            {/* <div className='modalTitle'  >
                                Confirm Submission
                            </div> */}
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={3}
                                sx={{marginTop: 8}}
                            >

                                <div className='modalText' >
                                    <FileDropZoneSingleErrorMessage 
                                    
                                    message={props.message} />
                                </div>
                            </Stack>
                            <Stack spacing={2} direction="column" alignItems="center">
                                <Button variant="contained" 
                                sx={{borderRadius: 20}}
                                onClick={confirmSend} className='buttonModal'>Ok</Button>
                                {/* <Button variant="text" onClick={cancelSending} className='buttonModal'>Cancel</Button> */}
                            </Stack>

                        </Box>
                    </Fade>
                </Modal>

            </div>
        </ThemeProvider>
    );
}
