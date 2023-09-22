import React from 'react'

import Template from '../../Bill/Template/Template';

import '../../Styles/SelectTemplate.css';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
function SelectTemplate() {
    return (
        <div className='selectTemplate'>

            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Template />
                <Button variant="contained" className="saveTemplateButton" >
                    SAVE
                </Button>
            </Stack>

        </div>
    )
}

export default SelectTemplate