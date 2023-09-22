import React, { useEffect, useState } from 'react'

// import ProgressBar from 'react-percent-bar';
import Stack from '@mui/material/Stack';

import { transactionService } from '../../Services/transaction.service';
import ProgressBar from "@ramonak/react-progress-bar";
import '../../Styles/SendingSummary.css'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
function SendingSummary() {
    // const [percent, updatePercent] = useState(20);

    const [transactions, setStransactions] = useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const [personName, setPersonName] = React.useState([]);
    const [selectedBatch, setSelectedBatch] = useState(0);

    const [amountCollected, setAmountCollected] = useState("");
    const [amountPayable, setAmountPayable] = useState("");
    const [amountPercent, setAmountPercent] = useState(0);
    const [statementsUploaded, setStatementsUploaded] = useState("");
    const [statementDelivered, setStatementsDelivered] = useState("");
    const [statementPercent, setStatementPercent] = useState(0);
    const [emailSent, setEmailSent] = useState("");

    const handleChangeMultiple = (event) => {

        console.log(event.target.selectedIndex);
        console.log(event.target.value);
        console.log(transactions[event.target.selectedIndex].amountCollected);

        setAmountCollected(transactions[event.target.selectedIndex].amountCollected !== null ? transactions[event.target.selectedIndex].amountCollected : 0);
        setAmountPayable(transactions[event.target.selectedIndex].amountPayable !== null ? transactions[event.target.selectedIndex].amountPayable : 0);
        setStatementsUploaded(transactions[event.target.selectedIndex].statementsUploaded !== undefined ? transactions[event.target.selectedIndex].statementsUploaded : 0);
        setStatementsDelivered(transactions[event.target.selectedIndex].statementDelivered !== undefined ? transactions[event.target.selectedIndex].statementDelivered : 0);


        console.log((amountCollected / amountPayable) * 100);

        setAmountPercent((amountCollected / amountPayable) * 100);
        setStatementPercent((setStatementsDelivered / statementsUploaded) * 100);

    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const getTransactionStatus = (merchantId) => {

        transactionService
            .getTransactionStatus()
            .then((response) => {
                setStransactions(response);
                console.log(response);

            })
            .catch((error) => {
                console.log(error);
            });
    }
    const formatDate = (date) => {
        try {
            return date.substring(0, 10);
        } catch (ex) {

            return "";
        }
    }
    useEffect(() => {
        getTransactionStatus();


    }, []);
    return (
        <div className='sendingSummary'>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                className="main"
            >

                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <div className='titleContainer'>
                        <div className='titleList'>List of Batches</div>
                    </div>
                    <FormControl sx={{ m: 1, minWidth: 288, maxWidth: 600 }}>
                        {/* <InputLabel shrink htmlFor="select-multiple-native">
                            Native
                        </InputLabel> */}
                        <Select
                            multiple
                            native
                            value={personName}
                            // @ts-ignore Typings are not considering `native`
                            onChange={handleChangeMultiple}
                            // label="Native"
                            inputProps={{
                                // id: 'select-multiple-native',
                            }}
                        >
                            {transactions.map((transaction) => (
                                <option key={transaction.dateUploaded} value={transaction.dateUploaded}>
                                    {formatDate(transaction.dateUploaded)}
                                </option>
                            ))}
                        </Select>
                    </FormControl>



                </Stack>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}

                >
                    {/* <div onClick={updatePercent}>
                        <h3>Im all the way up!</h3>
                        <ProgressBar
                            borderColor={'rgba(128,0,128,0.2)'}
                            fillColor="orange" percent={percent} />
                    </div>
                    <div onClick={updatePercent}>
                        <h3>Im all the way up!</h3>
                        <ProgressBar
                            borderColor={'rgba(128,0,128,0.2)'}
                            fillColor="orange" percent={percent} />
                    </div> */}
                    <ProgressBar
                        completed={amountPercent}
                        customLabel={amountCollected + "/" + amountPayable}
                        maxCompleted={'100'}
                        width={'50vw'}
                        height={'5vh'}
                        bgColor={'#f0ad4e'}
                        borderRadius={'10px'}
                        labelClassName="label"
                        labelAlignment='center'
                    />
                    <div className='percentTitle'>Collection Target</div>
                    <ProgressBar
                        completed={statementPercent}
                        customLabel={statementDelivered + "/" + statementsUploaded}
                        maxCompleted={'100'}
                        width={'50vw'}
                        height={'5vh'}
                        bgColor={'#f0ad4e'}
                        borderRadius={'10px'}
                        labelClassName="label"
                        labelAlignment='center' />
                    <div className='percentTitle'>% Delivery Success Rate</div>
                </Stack>
            </Stack>

        </div>
    )
}

export default SendingSummary