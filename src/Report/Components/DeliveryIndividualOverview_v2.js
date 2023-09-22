import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import '../../Styles/ReportsPage.css'
import { reportsService } from '../../Services/reports.service';
import { templateService } from '../../Services/template.service';
import DownloadIcon from '@mui/icons-material/Download';
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

import CsvIcon from '../../Images/downloadCsv.png';

import 'react-tooltip/dist/react-tooltip.css';

import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import Tooltip from '@mui/material/Tooltip';
import { TransitEnterexit } from '@mui/icons-material';

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

const formatDate = (date) => {
    try {
        return date.substring(0, 10);
    } catch (ex) {

        return "";
    }
}

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

function getCssClass(value) {
    if (value.includes('Failed') ||
        value.includes('Deferred') ||
        value.includes('Dropped') ||
        value.includes('Bounced') ||

        value.includes('Cancelled'))
        return "high";
    else if
        (value.includes('Sending') ||
        value.includes('Processed') ||
        value.includes('Queued') ||
        value.includes('Unknown'))
        return "medium";

    return "low";
}


function DeliveryIndividualOverview_v2(props) {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [deliveryIndividualOverviewData, setDeliveryIndividualOverviewData] = useState([]);
    const [pending, setPending] = useState(true);

    const [individualBatch, setIndividualBatch] = useState(props.batch);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [transactionNoCol, setTransactionNoCol] = useState(true);
    const [emailCol, setEmailCol] = useState(true);
    const [emailSentDateCol, setEmailSentDateCol] = useState(true);
    const [emailStatusCol, setEmailStatusCol] = useState(true);
    const [nameCol, setNameCol] = useState(true);
    const [mobileNumberCol, setMobileNumberCol] = useState(true);
    const [smsSentDateCol, setSmsSentDateCol] = useState(true);
    const [smsStatusCol, setSmsStatusCol] = useState(true);
    const [statementCreationDateCol, setStatementCreationDateCol] = useState(false);
    const [statementsUploadedCol, setStatementsUploadedCol] = useState(false);


    const current = new Date();
    const dateToday = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const viewDeliveryIndividualOverview = () => {
        reportsService
            .getDeliveryIndividualOverview(props.selectedStatemendId)
            .then((response) => {
                setDeliveryIndividualOverviewData(response);
                setPending(false);

                // setLoading(false);
            })
            .catch((error) => {
                console.log("error : " + error);

            });




    }



    useEffect(() => {
        viewDeliveryIndividualOverview();
    }, [props.selectedStatemendId]);

    const filteredItems = deliveryIndividualOverviewData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1


    );


    const setColumnHeader = () => {
        handleOpen();
    }




    const Export = ({ onExport }) =>

        <Tooltip title="Download Delivery Details Report" placement="right">
            <Button
                onClick={e => downloadReportService.downloadCSV(filteredItems, columns, 'Individual-Delivery-' + props.selectedStatemendId + "-" + dateToday)}>
                <SimCardDownloadIcon /> Export
                {/* <img className='csvDownloadButton' src={CsvIcon} /> */}
            </Button>

        </Tooltip>;



    const Export2 = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;


    const ExportCSV = () => {
        const actionsMemo = React.useMemo(() => <Export onExport={() => downloadReportService.downloadCSV(filteredItems)} />, []);

        return <DataTable title="Movie List" columns={columns} data={filteredItems} actions={actionsMemo} />;
    };

    const TooltipCreate = () => {


        return (
            <>
                <a
                    id="attributes-variant"
                    data-tooltip-content="hello world!"
                    data-tooltip-variant="success"
                > ? </a>

                <Tooltip anchorId="attributes-variant" />

            </>);
    }


    const ColumnHeader = ({ onClick }) =>
        <Button onClick={e => setColumnHeader()}  >
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
    }
    const changeView = () => {
        props.currentView(false);
    }



    const checkIfNull = (value) => {

        return value != null ? value : '--';
    }
    const columns = React.useMemo(() => [
        {
            name: <div>Account <br />Number</div>,
            id: 'accountNumber',
            width: '10%',
            selector: row => row.accountNumber,
            sortable: true,
            omit: !transactionNoCol,
            reorder: true,
            left: true,
        },
        {
            name: 'Email',
            id: 'emailAddress',
            selector: row => checkIfNull(row.emailAddress),
            sortable: true,
            omit: !emailCol,
            reorder: true,
            left: true,
        },
        {

            name: <div>Email <br />Sent Date</div>,
            id: 'emailSentDate',
            selector: row => formatDate(row.emailSentDate),
            sortable: true,
            omit: !emailSentDateCol,
            reorder: true,
            left: true,

        },
        {
            name: 'Email Status',
            id: 'emailStatus',
            selector: row => row.emailStatus,
            sortable: true,
            cell: (row) => (
                <StyledCell className={getCssClass(row.emailStatus)}>
                    {row.emailStatus}
                </StyledCell>
            ),
            omit: !emailStatusCol,
            reorder: true,
            left: true,
        },
        {
            name: 'Name',
            id: 'fullName',
            // selector: row => row.firstName + " " + row.middleName + " " + row.lastName,
            
            selector: row => row.firstName,
            sortable: true,
            omit: !nameCol,
            reorder: true,
            left: true,
            grow: 2,
            // allowOverflow:true,

        },

        {
            name: <div>Mobile <br />Number</div>,
            id: 'mobileNumber',
            selector: row => checkIfNull(row.mobileNumber),
            sortable: true,
            omit: !mobileNumberCol,
            reorder: true,
            left: true,
        },
        {
            name: <div>SMS <br />Sent Date</div>,
            id: 'smsSentDate',
            selector: row => checkIfNull(formatDate(row.smsSentDate)),
            sortable: true,
            omit: !smsSentDateCol,
            reorder: true,
            left: true,
        },
        {
            name: <div>SMS <br />Status</div>,
            id: 'smsStatus',
            selector: row => row.smsStatus,
            sortable: true,
            cell: (row) => (
                <>
                    <StyledCell className={getCssClass(row.smsStatus)}>
                        {row.smsStatus}

                    </StyledCell>
                    {/* {TooltipCreate()} */}
                </>
            ),
            omit: !smsStatusCol,
            reorder: true,
            left: true,
        },
        {
            name: 'Statement Creation Date',
            id: 'statementsCreationDate',
            width: '12%',
            selector: row => formatDate(row.statementsCreationDate),
            sortable: true,
            omit: !statementCreationDateCol,
            reorder: true,
            left: true,
        },
        {
            name: 'Statements Upload Date',
            id: 'statementsUploadDate',

            selector: row => formatDate(row.statementsUploadDate),
            sortable: true,
            omit: !statementsUploadedCol,
            reorder: true,
            left: true,
        },
        {
            name: '',
            id: 'downloadId',
            selector: row => createButton(row.requestId, (row.firstName + " " + row.middleName + " " + row.lastName)),
            sortable: true,
            // omit: !statementsUploadedCol,
            // omit: !statementsUploadedCol,
            // reorder: true,
            left: true,
        },
    ],
        [transactionNoCol, emailCol, emailSentDateCol,
            emailStatusCol, nameCol, mobileNumberCol, smsSentDateCol
            , smsStatusCol, statementCreationDateCol, statementsUploadedCol],
    );

    function downloadPDF(pdf, fileName) {
        console.log(fileName);
        const linkSource = `data:application/pdf;base64,${pdf}`;
        const downloadLink = document.createElement("a");
        // fileName = fileName + ".pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName + ".pdf";
        downloadLink.click();
    }

    const handleBtnClick = (requestId, fileName) => {

        templateService
            .downloadIndividualPdf(requestId)
            .then((response) => {
                downloadPDF(response, fileName);

                // setLoading(false);
            })
            .catch((error) => {
                console.log("error : " + error);

            });


        console.log(requestId);
    }

    const createButton = (requestId, fileName) => {

        return (
            <Button variant="outlined" size="small" startIcon={<DownloadIcon />}
                onClick={(event) => handleBtnClick(requestId, fileName)}
            >
                PDF
            </Button >

        );
    }

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
                <div className='deliveryBatchTitle'>Delivery Details  {"> " + formatDate(individualBatch)}</div>
            </Stack>

            <Stack
                direction="column"
                justifyContent="right"
                alignItems="right"
                spacing={0}>


                {filteredItems !== null ?
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        onRowClicked={rowClicked}
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={subHeaderComponent}
                        fixedHeader='true'
                        responsive={true}
                        // selectableRows
                        striped
                        persistTableHead
                        highlightOnHover={true}
                        className='dataTableReport'
                        progressPending={pending}
                    />
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


                            <Grid item xs={12} onClick={e => setTransactionNoCol(!transactionNoCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <div >Kartero Transaction Number</div>
                                    <Checkbox
                                        checked={transactionNoCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>





                            <Grid item xs={12} onClick={e => setEmailCol(!emailCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Email</div>
                                    <Checkbox
                                        checked={emailCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>

                            <Grid item xs={12} onClick={e => setEmailSentDateCol(!emailSentDateCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Email Sent Date</div>
                                    <Checkbox
                                        checked={emailSentDateCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>


                            <Grid item xs={12} onClick={e => setEmailStatusCol(!emailStatusCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Email Status</div>
                                    <Checkbox
                                        checked={emailStatusCol}

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
                            <Grid item xs={12} onClick={e => setMobileNumberCol(!mobileNumberCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Mobile Number</div>
                                    <Checkbox
                                        checked={mobileNumberCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} onClick={e => setSmsSentDateCol(!smsSentDateCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >SMS Sent Date</div>
                                    <Checkbox
                                        checked={smsSentDateCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} onClick={e => setSmsStatusCol(!smsStatusCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >SMS Status</div>
                                    <Checkbox
                                        checked={smsStatusCol}

                                    />
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item xs={12} onClick={e => setStatementCreationDateCol(!statementCreationDateCol)}
                                className='columnModalName'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"

                                >
                                    <div >Statement Creation Date</div>
                                    <Checkbox
                                        checked={statementCreationDateCol}

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

                                    <div >Statement Upload</div>
                                    <Checkbox
                                        checked={statementsUploadedCol}

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