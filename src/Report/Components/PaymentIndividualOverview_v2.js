import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import '../../Styles/ReportsPage.css'
import { reportsService } from '../../Services/reports.service';

import FilterComponent from './FilterComponent';
import Stack from '@mui/material/Stack';
import { setDayOfYear } from 'date-fns';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { downloadReportService } from '../../util/downloadReport.service';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import Tooltip from '@mui/material/Tooltip';
import CsvIcon from '../../Images/downloadCsv.png';

import DeliveryStatusModal from './DeliveryStatusModal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 0,
    'padding-left': '1.2vw',
    'padding-bottom': '1.2vw',
};


const StyledCell = styled.div`
  &.low {
  
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 700;
    font-size: 1vw;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    color: #2AA10F;
  }
  &.medium {
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 700;
    font-size: 1vw;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    color: orange;
  }
  &.high {
   
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 700;
    font-size: 1vw;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    color: red;
  }
`;

function getCssClass(aging, status) {
    if (aging > 0) {

        return status === "unpaid" ? "high" : "medium";

    }
    return "low";
}

function currencyFormat(num) {
    if (num !== null) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')
    };
};

function checkPayment(amountCollected, paymentMethod) {
    const unPaidStatus = "Unpaid";
    if (amountCollected === 0) {
        return unPaidStatus;
    };
    return paymentMethod;
}
const formatDate = (date) => {
    try {
        return date.substring(0, 10);
    } catch (ex) {

        return "";
    }
}
function DeliveryIndividualOverview_v2(props) {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [paymentIndividualOverview, setPaymentIndividualOverview] = useState([]);
    const [pending, setPending] = useState(true);
    const [individualBatch, setIndividualBatch] = useState(props.batch);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [accountNumberCol, setAccountNumberCol] = useState(true);
    const [nameCol, setNameCol] = useState(true);
    const [deliveryStatusCol, setDeliveryStatusCol] = useState(true);
    const [amountDueCol, setAmountDueCol] = useState(true);
    const [agingCol, setAgingCol] = useState(true);
    const [amountCollectedCol, setAmountCollectedCol] = useState(true);
    const [paymentMethodCol, setPaymentMethodCol] = useState(true);
    const [paymentChannelCol, setPaymentChannelCol] = useState(true);
    const [paymentStatusCol, setPaymentStatusCol] = useState(true);
    const [requestId, setRequestId] = useState("");
    const [deliveryModalStatus, setDeliveryModalStatus] = useState(false);
    const [deliveryDetails, setDeliveryDetails] = useState();
    const current = new Date();
    const dateToday = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const filteredItems = paymentIndividualOverview.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1


    );

    const viewIndividualDelivery = (curRequest) => {
        reportsService
            .getIndividualDelivery(curRequest)
            .then((response) => {
                setDeliveryDetails(response);
                // console.log(response);

                // setLoading(false);
            })
            .catch((error) => {
                console.log("error : " + error);

            });




    }

    const viewPaymentIndividualOverview = () => {

        reportsService
            .getPaymentIndividualOverview(props.selectedStatemendId)
            .then((response) => {
                setPaymentIndividualOverview(response);
                setPending(false);
            })
            .catch((error) => {


            });
    }



    useEffect(() => {
        viewPaymentIndividualOverview();
    }, [filteredItems]);

 
    const conditionalRowStyles = [
        {
            when: row => row.aging > 0 && row.paymentStatus === 'Unpaid',
            style: {
                // backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'red',
                // opacity : '70%',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.paymentStatus === 'Late',
            style: {
                // backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'orange',
                // opacity : '70%',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },

    ];


    const setColumnHeader = () => {
        handleOpen();
    }
    const Export = ({ onExport }) =>

        <Tooltip title="Download Payment Details Report" placement="right">
            <Button
                onClick={e => downloadReportService.downloadCSV(filteredItems, columns, "Individual-Payment-" + props.selectedStatemendId + "-" + dateToday)}>
                <SimCardDownloadIcon /> Export
            </Button>
        </Tooltip>;



    const ColumnHeader = ({ onClick }) =>
        <Button onClick={e => setColumnHeader()} >
            <SettingsIcon /> Set Column HEader
        </Button>;


    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >

                <Export />

                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0}
                >
                    <ColumnHeader />
                    <FilterComponent
                        onFilter={e => setFilterText(e.target.value)}
                        onClear={handleClear}
                        filterText={filterText}
                    />
                </Stack>
            </Grid>

        );
    }, [filterText, resetPaginationToggle, filteredItems]);

    const rowClicked = row => {

        viewIndividualDelivery(row.requestId);
        console.log();
        setDeliveryModalStatus(true);
    }

    const handleCloseDeliveryDetails = (deliveryModalStatus) => {
        setDeliveryModalStatus(false);
    }

    const changeView = () => {
        props.currentView(false);
    }
    const caseInsensitiveSort = (rowA, rowB) => {
        // const a = rowA.title.toLowerCase();
        // const b = rowB.title.toLowerCase();

        if (rowA > rowB) {
            return 1;

        }

        if (rowA < rowB) {
            return -1;

        }

        return 0;

    };

    const checkIfNull = (value) => {

        return value != null ? value : '--';
    }
    
    const columns = React.useMemo(() => [
        // {
        //     name: 'Kartero Transaction Number',
        //     id: 'karteroTransNumber',
        //     selector: row => row.karteroTransNumber,
        //     sortable: true,
        // },
        {
            name: <div>Account <br />Number</div>,
            id: 'accountNumber',
            selector: row => row.accountNumber,
            sortable: true,
            omit: !accountNumberCol,
            reorder: true,
            left : true,
            width: '10%',
        },
        {
            name: 'Name',
            id: 'fullName',
            // selector: row => <div>{row.firstName + " " + row.middleName + " " + row.lastName}</div>,
            
            selector: row => <div>{row.firstName }</div>,
            sortable: true,
            omit: !nameCol,
            reorder: true,
            left: true,
            width: '20%',

        },
        {
            name:<div className='textAlignLeft'>Delivery <br />Status</div>,
            id: 'deliveryStatus',
            selector: row => checkIfNull(row.deliveryStatus),
            sortable: true,
            left: true,
             width: '6%',
            omit: !deliveryStatusCol,
            reorder: true,
        },
        {
            name: <div className='textAlignRight'>Amount <br />Due</div>,
            id: 'amountDue',
            selector: row => row.amountDue,
            cell: (row) => (
                <div>
                    {/* {new Intl.NumberFormat().format(row.amountDue) + ".00"} */}
                    {row.amountDue}
                </div>
            ),
            sortable: true,
            right: true,
            omit: !amountDueCol,
            reorder: true,
            width: '6%',
            // sortFunction: caseInsensitiveSort,
        },
        {
            name: <div className='textAlignRight'>Aging</div>,
            id: 'aging',
            selector: row => row.aging,
            cell: (row) => (
                <StyledCell className={getCssClass(row.aging, row.paymentStatus)}>
                    {row.aging}
                </StyledCell>
            ),
            sortable: true,
            right: true,
            omit: !agingCol,
            reorder: true,
            width : '6%',
            
        },
        {

            name: <div className='textAlignRight'>Amount <br />Collected</div>,
            id: 'amountCollected',
            selector: row => row.amountCollected,
            cell: (row) => (
                <div>
                    {/* {new Intl.NumberFormat().format(row.amountCollected) + ".00"} */}
                    { row.amountCollected}
                </div>
            ),
            sortable: true,
            right: true,
            omit: !amountCollectedCol,
            reorder: true,
            width : '8%',
        },
        {
            name: 'Payment Method',
            id: 'paymentMethod',
            selector: row => checkIfNull(row.paymentMethod),
            sortable: true,
            omit: !paymentMethodCol,
            reorder: true,
            left: true,
            width : '10%',
        },
        {
            name: 'Payment Channel',
            id: 'paymentChannel',
            selector: row => checkIfNull(row.paymentChannel),

            sortable: true,
            omit: !paymentChannelCol,
            reorder: true,
            left: true,
        },
        {
            name: 'Payment Status',
            id: 'paymentStatus',
            selector: row => checkIfNull(row.paymentStatus),
            // cell: (row) => (
            //     <StyledCell className={getCssClass(row.paymentStatus)}>
            //         {row.paymentStatus.toUpperCase()}
            //     </StyledCell>
            // ),
            sortable: true,
            omit: !paymentStatusCol,
            reorder: true,
            left: true,
        },
        {
            name: 'requestId',
            id: 'requestId',
            selector: row => checkIfNull(row.requestId),

            omit: true,
        },

    ],
        [accountNumberCol, nameCol, deliveryStatusCol,
            amountDueCol, amountCollectedCol, paymentMethodCol, paymentStatusCol, agingCol]);
    return (
        <>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <IconButton color="primary"  >
                    <ArrowBackIcon onClick={changeView} />
                </IconButton>
                <div className='deliveryBatchTitle'>Payment Details  {"> " + formatDate(individualBatch)}</div>
            </Stack>
            {/* <Export /> */}
            <Stack
                direction="column"
                justifyContent="right"
                alignItems="right"
                spacing={2}>


                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    onRowClicked={rowClicked}
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    subHeaderComponent={subHeaderComponent}
                    fixedHeader='true'
                    // conditionalRowStyles={conditionalRowStyles}
                    // selectableRows
                    persistTableHead
                    striped
                    className='dataTableReport'
                    progressPending={pending}
                    highlightOnHover={true}
                    responsive={true}
                />

            </Stack>

            <div>
                <DeliveryStatusModal
                    deliveryDetails={deliveryDetails}
                    deliveryModalStatus={deliveryModalStatus}
                    deliveryStatus={handleCloseDeliveryDetails} />

            </div>

            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12} className='modalHeader'>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"

                                >
                                    <SettingsIcon />
                                    <div > Set Column Header</div>
                                </Grid>

                            </Grid>


                            <Grid item xs={12} onClick={e => setAccountNumberCol(!accountNumberCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <div >Account Number</div>
                                    <Checkbox
                                        checked={accountNumberCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} onClick={e => setNameCol(!nameCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Name</div>
                                    <Checkbox
                                        checked={nameCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>




                            <Grid item xs={12} onClick={e => setDeliveryStatusCol(!deliveryStatusCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Delivery Status</div>
                                    <Checkbox
                                        checked={deliveryStatusCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>

                            <Grid item xs={12} onClick={e => setAmountDueCol(!amountDueCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Amount Due</div>
                                    <Checkbox
                                        checked={amountDueCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} onClick={e => setAgingCol(!agingCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Aging</div>
                                    <Checkbox
                                        checked={agingCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>

                            <Grid item xs={12} onClick={e => setAmountCollectedCol(!amountCollectedCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Amount Collected</div>
                                    <Checkbox
                                        checked={amountCollectedCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>

                            <Grid item xs={12} onClick={e => setPaymentMethodCol(!paymentMethodCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Payment Method</div>
                                    <Checkbox
                                        checked={paymentMethodCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>
                            {/* <Grid item xs={12} onClick={e => setPaymentChannelCol(!paymentChannelCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Payment Channel</div>
                                    <Checkbox
                                        checked={paymentChannelCol}
                                    />
                                </Grid>
                                <Divider />
                            </Grid> */}
                            <Grid item xs={12} onClick={e => setPaymentStatusCol(!paymentStatusCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Payment Status</div>
                                    <Checkbox
                                        checked={paymentStatusCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>


                            <Grid item xs={12}  >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"

                                >
                                    <Button variant="contained"
                                        className='modalDoneBtn'
                                        onClick={handleClose}>Done</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default DeliveryIndividualOverview_v2