import React, { useState, useEffect, useRef } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker } from 'react-date-range';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { Button } from '@mui/material';

function BillDateRange(props) {

    

    const [state, setState] = useState([
        {
            // startDate: addDays(new Date(), 1),
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
            color: 'orange',
            scroll : {
                enabled : true
            }

        }
    ]);

    const setDateRange = (item) =>{
        setState([item.selection]);
        props.dateRange([item.selection]);
    }

    
    const printDateRange = () => {
        console.log(state);
        console.log(state[0].startDate);

        console.log(state[0].endDate);
        props.dateRange(state);
    }
    return (
        <>
            <DateRange
                editableDateInputs={true}
                onChange={item => setDateRange(item)}
                moveRangeOnFirstSelection={false}
                ranges={state}
                // className="dateRangePicker"
                // minDate={addDays(new Date() ,1)}
                minDate={new Date() }
            />


        </>
    );
}

export default BillDateRange