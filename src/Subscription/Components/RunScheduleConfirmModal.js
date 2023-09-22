import React, { useState, useEffect, useRef } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import '../../Styles/ConfirmModal.css';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    width: '40%',
    height: '40%',
    bgcolor: 'background.paper',
    'border-radius': '10px',
    //   border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};



export default function TransitionsModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const confirmSend = () => {
        props.confirm("confirm");
        handleClose();
    }
    const cancelSending = () => {
        props.confirm("cancel");
        handleClose();
    }
    useEffect(() => {
        /*
        setChecked((prev) => !prev);
        return () => {
          setChecked((prev) => !prev);
        };*/

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
                {/* <Button onClick={handleOpen}>Open modal</Button> */}

               
                   
                    <Modal
                        // aria-labelledby="transition-modal-title"
                        // aria-describedby="transition-modal-description"
                        open={open}
                        onClose={cancelSending}

                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                        className='modal'
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <div className='modalConfirmTitle'  >
                                    Confirm Date Change?
                                </div>
                                <div className='p-10 text-xl text-center font-segoe text-modal-gray' >
                                Changing the schedule to the present date or earlier 
                                will set the 
                                batch sending to the <b>succeeding month</b> instead.
                                </div>

                                <Stack spacing={2} direction="column" alignItems="center">

                                    <div className='grid justify-items-center text-base rounded-full p-1 w-28 transition ease-in-out bg-yellow-orange hover:bg-dark-yellow-orange text-white font-light cursor-pointer'>
                                        <button onClick={confirmSend}>
                                            Confirm
                                        </button>
                                    </div>
                                    <div className='grid justify-items-center text-base p-1 w-24 transition ease-in-out text-yellow-orange  font-light cursor-pointer'>
                                        <button onClick={cancelSending}>
                                            Cancel
                                        </button>
                                    </div>

                                </Stack>

                            </Box>
                        </Fade>
                    </Modal>
            
            </div>
        </ThemeProvider>
    );
}
