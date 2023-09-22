import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import 'react-data-table-component-extensions/dist/index.css';
import '../../Styles/ReportsPage.css'
import { reportsService } from '../../Services/reports.service';
import Stack from '@mui/material/Stack';
import DeliveryIndividualOverview_v2 from './DeliveryIndividualOverview_v2';
import FilterComponent from './FilterComponent';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { downloadReportService } from '../../util/downloadReport.service';
import SettingsIcon from '@mui/icons-material/Settings';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { createTheme } from 'react-data-table-component';
import { adminReportsService } from '../../AdminServices/reports.service';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import Tooltip from '@mui/material/Tooltip';
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

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;


createTheme('solarized', {
    text: {
        primary: '#268bd2',
        secondary: '#2aa198',
        'font-family': 'Segoe UI',
        'font-style': 'normal',
        'font-weight': '400',
    },

});


function NewlineText(textFrom) {
    const text = textFrom;
    const newText = text.split('\n');

    return newText;
}






function DeliveryBatchOverview_v2(props) {
    const navigate = useNavigate();
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [deliveryBatchOverviewData, setDeliveryBatchOverviewData] = useState([]);
    const [showIndividualDelivery, setShowIndividualDelivery] = React.useState(false);
    const [currentStatementId, setCurrentStatementId] = useState("");
    const [pending, setPending] = useState(true);
    const [batchSelected, setBatchSelected] = useState();


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [uploadDateCol, setUploadDateCol] = useState(true);
    const [serviceCol, setServiceCol] = useState(true);
    const [statementsUploadedCol, setStatementsUploadedCol] = useState(false);
    const [statementsSentCol, setStatementsSentCol] = useState(true);
    const [smsSentCol, setSmsSentCol] = useState(true);
    const [statementsNotReceivedCol, setStatementNotReceivedCol] = useState(true);
    const [lastUpdatedCol, setLastUpdatedCol] = useState(true);


    const current = new Date();
    const dateToday = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


    const viewDeliveryOverview = () => {
        console.log("Show Delivery");
        const userId = window.localStorage.getItem("uid");
        // if (userId !== props.merchantId) {
        //     adminReportsService
        //         .getDeliveryBatchOverview(props.merchantId)
        //         .then((response) => {
        //             setDeliveryBatchOverviewData(response);
        //             setPending(false);
        //             props.setDeliveryBatchOverviewData(response);
        //         })
        //         .catch((error) => {


        //         });
        // } else {
        reportsService
            .getDeliveryBatchOverview(userId)
            .then((response) => {
                setDeliveryBatchOverviewData(response);
                setPending(false);
                props.setDeliveryBatchOverviewData(response);
            })
            .catch((error) => {


            });
        // }
    }
    const filteredItems = deliveryBatchOverviewData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1


    );

    function goTo() {
        if (props.disableBack === 'true') {
            window.location.reload(false);
        }
        else {
            navigate(process.env.REACT_APP_PATH + "/home");
        }
    }
    const handleChangeView = (response) => {
        setShowIndividualDelivery(response);
    }

    useEffect(() => {
        viewDeliveryOverview();

    }, []);

    const setColumnHeader = () => {
        handleOpen();
    }

    // const actionsMemo = React.useMemo(() => <Export onExport={() => downloadReportService.downloadCSV(filteredItems, filteredItems)} />, []);


    const Export = ({ onExport }) =>

        <Tooltip title="Download Delivery Batch Overview Report" placement="right">
            <Button
                onClick={e => downloadReportService.downloadCSV(filteredItems, columns, 'Batch-Delivery-' + dateToday)}>
                <SimCardDownloadIcon /> Export
                {/* <img className='csvDownloadButton' src={CsvIcon} /> */}
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
        setCurrentStatementId(row.transactionId);
        setShowIndividualDelivery(true);
        setBatchSelected(row.uploadDate);
    }
    const customSort = (rowA, rowB) => {

        const a = rowA.uploadDate;
        const b = rowB.uploadDate;

        if (a > b) {
            return -1;
        }

        if (b > a) {
            return 1;
        }

        return 0;
    };

    const checkIfNull = (value) => {

        return value != null ? value : '--';
    }
    const columns = React.useMemo(() => [
        // {
        //     name: 'Billing  Cycle From',
        //     id: 'billingCycleFrom',
        //     width: '12%',
        //     selector: row => row.billingCycleFrom,
        //     sortable: true,

        // },
        // {
        //     name: 'Billing Cycle To',
        //     id: 'billingCycleTo',
        //     width: '12%',
        //     selector: row => row.billingCycleTo,
        //     sortable: true,
        // },
        {
            name: 'Upload Date',
            id: 'uploadDate',
            selector: row => row.uploadDate.substring(0, 10),
            sortable: true,
            omit: !uploadDateCol,
            reorder: true,
            left: true,
            sortFunction: customSort
        },
        {
            name: 'Service',
            id: 'service',
            selector: row => checkIfNull(row.service),
            sortable: true,
            left: true,
            omit: !serviceCol,
            reorder: true,
        },
        {
            name: 'Uploaded',
            id: 'statementsUploaded',
            width: '12%',
            selector: row => checkIfNull(row.statementsUploaded),
            sortable: true,
            right: true,
            omit: !statementsUploadedCol,
            reorder: true,
        },
        {
            name: 'Statement Sent',
            id: 'statementsSent',
            width: '12%',
            selector: row => checkIfNull(row.statementsSent),
            sortable: true,
            right: true,
            omit: !statementsSentCol,
            reorder: true,

        },
        {
            name: 'SMS Sent',
            id: 'smsSent',
            width: '12%',
            selector: row => checkIfNull(row.smsSent),
            sortable: true,
            right: true,
            omit: !smsSentCol,
            reorder: true,
        },

        {
            name: <div>Statement Not <br />Received</div>,
            id: 'statementsNotReceived',
            width: '12%',
            selector: row => checkIfNull(row.statementsNotReceived),
            sortable: true,
            right: true,
            omit: !statementsNotReceivedCol,
            reorder: true,
        },
        {
            name: 'Last Updated',
            id: 'lastUpdated',
            selector: row => checkIfNull(row.lastUpdatedCol),
            sortable: true,
            right: true,
            omit: !lastUpdatedCol,
            reorder: true,
        },
        // {
        //     name: 'Last Updated',
        //     id: 'lastUpdatedIndividual',
        //     selector: row => row.lastUpdated,
        //     sortable: true,
        // },
    ],
        [uploadDateCol, serviceCol, statementsUploadedCol,
            statementsSentCol, smsSentCol, statementsNotReceivedCol, lastUpdatedCol],
    );
    const tableData = {
        columns,
        filteredItems
    };
   


    return (
        <>
            {showIndividualDelivery ? <DeliveryIndividualOverview_v2
                selectedStatemendId={currentStatementId}
                currentView={handleChangeView}
                batch={batchSelected}
            /> : null}

            <div hidden={showIndividualDelivery}>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <IconButton color="primary"  >

                        <ArrowBackIcon onClick={goTo} />
                    </IconButton>
                    <div className='deliveryBatchTitle'>Delivery Batch Overview</div>

                </Stack>
                {/* <Export /> */}
                <Stack
                    direction="column"
                    justifyContent="right"
                    alignItems="right"
                    spacing={0}>

                    {filteredItems !== null ?
                        // <DataTableExtensions {...tableData}>
                        <DataTable
                            columns={columns}
                            data={filteredItems}
                            pagination
                            onRowClicked={rowClicked}
                            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                            subHeader
                            subHeaderComponent={subHeaderComponent}
                            fixedHeader='true'
                            // striped
                            persistTableHead
                            className='dataTableReport'
                            defaultSortFieldId={'uploadDate'}
                            highlightOnHover={true}
                            progressPending={pending}
                            responsive={true}
                        // theme="solarized"






                        />
                        // </DataTableExtensions>
                        : null}


                </Stack>


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


                                <Grid item xs={12} onClick={e => setUploadDateCol(!uploadDateCol)}
                                    className='columnModalName'
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <div >Upload Date</div>
                                        <Checkbox
                                            checked={uploadDateCol}

                                        />
                                    </Grid>
                                    <Divider />
                                </Grid>





                                <Grid item xs={12} onClick={e => setServiceCol(!serviceCol)}
                                    className='columnModalName'
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"

                                    >
                                        <div >Service</div>
                                        <Checkbox
                                            checked={serviceCol}

                                        />
                                    </Grid>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12} onClick={e => setStatementsUploadedCol(!statementsUploadedCol)}
                                    className='columnModalName'
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"

                                    >
                                        <div >Statements Uploaded</div>
                                        <Checkbox
                                            checked={statementsUploadedCol}

                                        />
                                    </Grid>
                                    <Divider />
                                </Grid>


                                <Grid item xs={12} onClick={e => setStatementsSentCol(!statementsSentCol)}
                                    className='columnModalName'
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"

                                    >
                                        <div >Statements Sent</div>
                                        <Checkbox
                                            checked={statementsSentCol}

                                        />
                                    </Grid>
                                    <Divider />
                                </Grid>

                                <Grid item xs={12} onClick={e => setSmsSentCol(!smsSentCol)}
                                    className='columnModalName'
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"

                                    >
                                        <div >SMS Sent</div>
                                        <Checkbox
                                            checked={smsSentCol}

                                        />
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} onClick={e => setStatementNotReceivedCol(!statementsNotReceivedCol)}
                                    className='columnModalName'
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"

                                    >
                                        <div >Statements Not Received</div>
                                        <Checkbox
                                            checked={statementsNotReceivedCol}

                                        />
                                    </Grid>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} onClick={e => setLastUpdatedCol(!lastUpdatedCol)}
                                    className='columnModalName'
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"

                                    >
                                        <div >Last Upated</div>
                                        <Checkbox
                                            checked={lastUpdatedCol}

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
            </div>
        </>
    )
}

export default DeliveryBatchOverview_v2