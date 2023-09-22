import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import '../../Styles/ReportsPage.css'
import { reportsService } from '../../Services/reports.service';

import Stack from '@mui/material/Stack';
import PaymentBatchOverview_v2 from './PaymentIndividualOverview_v2';
import FilterComponent from './FilterComponent';
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { downloadReportService } from '../../util/downloadReport.service';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

import CsvIcon from '../../Images/downloadCsv.png';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import Tooltip from '@mui/material/Tooltip';
import { adminReportsService } from '../../AdminServices/reports.service';

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
  'border-radius': '10px',
  'padding-left': '1.2vw',
  'padding-bottom': '1.2vw',
};



const formatDate = (date) => {
  try {
    return date.substring(0, 10);
  } catch (ex) {

    return "";
  }
}


function currencyFormat(num) {
  return new Intl.NumberFormat().format(num);
}



function DeliveryBatchOverview_v2(props) {
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [showIndividualPayment, setShowIndividualPayment] = React.useState(false);
  const [paymentBatchOverviewData, setPaymentBatchOverviewData] = useState([]);

  const [currentStatementId, setCurrentStatementId] = useState("");
  const [pending, setPending] = useState(true);
  const [batchSelected, setBatchSelected] = useState();


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [uploadDateCol, setUploadDateCol] = useState(true);
  const [dueDateCol, setDueDateCol] = useState(true);
  const [serviceCol, setServiceCol] = useState(true);
  const [sentCol, setSentCol] = useState(true);
  const [paidCol, setPaidCol] = useState(true);
  const [amountCollectedCol, setAmountCollectedCol] = useState(true);
  const [amountUncollectedCol, setAmountUncollectedCol] = useState(true);
  const [amountBouncedCol, setAmountBouncedCol] = useState(true);
  const [statementsUploadedCol, setStatementsUploadedCol] = useState(false);
  const [statementBouncedCol, setStatementBouncedCol] = useState(true);
  const current = new Date();
  const dateToday = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


  const navigate = useNavigate();

  const viewBatchOverview = () => {
    const userId = window.localStorage.getItem("uid");
    // console.log(userId);
    // if (userId !== props.merchantId) {
    //   console.log(props.merchantId)
    //   adminReportsService
    //     .getPaymentBatchOverview(props.merchantId)
    //     .then((response) => {
    //       setPaymentBatchOverviewData(response);
    //       setPending(false);

    //     })
    //     .catch((error) => {
    //       console.log(error);

    //     });
    // }
    // else {
    reportsService
      .getPaymentBatchOverview(userId)
      .then((response) => {
        setPaymentBatchOverviewData(response);
        setPending(false);

      })
      .catch((error) => {
        console.log(error);

      });
  }
  // }
  const filteredItems = paymentBatchOverviewData.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1


  );
  function viewIndividualPayment(statementId) {

    setCurrentStatementId(statementId);
    setShowIndividualPayment(true);
  }
  const handleChangeView = (response) => {
    setShowIndividualPayment(response);
  }
  function goTo() {
    if (props.disableBack === 'true') {
      window.location.reload(false);
    }
    else {
      navigate(process.env.REACT_APP_PATH + "/home");
    }
  }
  useEffect(() => {
    viewBatchOverview();

  }, []);


  const setColumnHeader = () => {
    handleOpen();
  }

  const downloadUpdatedCSV = () => {
    downloadReportService.downloadCSV(filteredItems, columns, "Batch-Payment-" + dateToday);
  }

  let Export = ({ onExport }) =>

    <Tooltip title="Download Payment Batch Overview" placement="right">

      <Button

        onClick={e => downloadUpdatedCSV()}>
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
        console.log(filterText);
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
    console.log(row.transactionId);
    setCurrentStatementId(row.transactionId);
    setShowIndividualPayment(true);
    setBatchSelected(row.uploadDate);
  }


  const customSort = (rowA, rowB) => {
    const a = rowA.uploadDate; 
    const b = rowB.uploadDate; 
   
    // console.log(a);
    // console.log(b)

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
  //   name: 'Billing Cycle From',
  //   id: 'billingCycleFrom',
  //   selector: row => row.billingCycleFrom,
  //   sortable: true,
  // },
  // {
  //   name: 'Billing Cycle To',
  //   id: 'billingCycleTo',
  //   selector: row => row.billingCycleTo,
  //   sortable: true,
  // },
  {
    name: 'Upload Date',
    id: 'uploadDate',
    selector: row => formatDate(row.uploadDate),
    sortable: true,
    omit: !uploadDateCol,
    reorder: true,
    sortFunction: customSort
  },
  {
    name: 'Due Date',
    id: 'dueDate',
    selector: row => formatDate(row.dueDate),
    sortable: true,
    omit: !dueDateCol,
    reorder: true,
  },
  {
    name: 'Service',
    id: 'service',
    selector: row => checkIfNull(row.service),
    sortable: true,
    omit: !serviceCol,
    reorder: true,
  },
  {
    name: 'Uploaded',
    id: 'statementsUploaded',
    selector: row => checkIfNull(row.statementsUploaded),
    sortable: true,
    omit: !statementsUploadedCol,
    reorder: true,
    right: true,
  },
  {
    name: 'Sent',
    id: 'statementsSent',
    selector: row => checkIfNull(row.statementsSent),
    sortable: true,
    right: true,
    omit: !sentCol,
    reorder: true,
  },
  {
    name: 'Bounced',
    id: 'statementsBounced',
    selector: row => checkIfNull(row.statementsBounced),
    sortable: true,
    right: true,
    omit: !statementBouncedCol,
    reorder: true,
  },
  {
    name: 'Paid',
    id: 'statementsPaid',
    selector: row => checkIfNull(row.statementsPaid),
    sortable: true,
    right: true,
    omit: !paidCol,
    reorder: true,
  },
  {

    name: <div>Amount <br />Collected</div>,
    id: 'amountCollected',
    // selector: row => currencyFormat(row.amountCollected) + ".00",
    selector: row => row.amountCollected,
    sortable: true,
    right: true,
    omit: !amountCollectedCol,
    reorder: true,
  },
  {


    name: <div>Amount <br />Uncollected</div>,
    id: 'amountUncollected',
    // selector: row => currencyFormat(row.amountUncollected) + ".00",
    selector: row => row.amountUncollected,
    sortable: true,
    right: true,
    omit: !amountUncollectedCol,
    reorder: true,
  },
  {
    name: <div>Amount <br />Bounced</div>,
    id: 'amountBounced',
    // selector: row => currencyFormat(row.amountBounced) + ".00",
    selector: row =>row.amountBounced,
    sortable: true,
    right: true,
    omit: !amountBouncedCol,
    reorder: true,
  },
],
  [uploadDateCol, dueDateCol
    , serviceCol, statementsUploadedCol, sentCol,
    statementBouncedCol, paidCol, amountCollectedCol,
    amountUncollectedCol, amountBouncedCol],
);



  return (
    <>
      {showIndividualPayment ? <PaymentBatchOverview_v2
        selectedStatemendId={currentStatementId}
        currentView={handleChangeView}
        batch={batchSelected}
      /> : null}

      <div hidden={showIndividualPayment}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <IconButton color="primary"  >

            <ArrowBackIcon onClick={goTo} />
          </IconButton>
          <div className='deliveryBatchTitle'>Payment Batch Overview</div>
        </Stack>
        {/* <Export /> */}
        <Stack
          direction="column"
          justifyContent="right"
          alignItems="right"
          spacing={0}>


          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            onRowClicked={rowClicked}
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponent}
            // striped
            persistTableHead
            className='dataTableReport'
            progressPending={pending}
            defaultSortFieldId={'uploadDate'}
            fixedHeader='true'
            responsive={true}
          />

        </Stack>



        <div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modalBody"
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
                <Grid item xs={12} onClick={e => setDueDateCol(!dueDateCol)}
                  className='columnModalName'
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <div >Due Date</div>
                    <Checkbox
                      checked={dueDateCol}

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
                    <div >Uploaded</div>
                    <Checkbox
                      checked={statementsUploadedCol}

                    />
                  </Grid>
                  <Divider />
                </Grid>


                <Grid item xs={12} onClick={e => setSentCol(!sentCol)}
                  className='columnModalName'
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"

                  >
                    <div >Sent</div>
                    <Checkbox
                      checked={sentCol}

                    />
                  </Grid>
                  <Divider />
                </Grid>
                <Grid item xs={12} onClick={e => setStatementBouncedCol(!statementBouncedCol)}
                  className='columnModalName'
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"

                  >
                    <div >Bounced</div>
                    <Checkbox
                      checked={statementBouncedCol}

                    />
                  </Grid>
                  <Divider />
                </Grid>

                <Grid item xs={12} onClick={e => setPaidCol(!paidCol)}
                  className='columnModalName'
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"

                  >
                    <div >Paid</div>
                    <Checkbox
                      checked={paidCol}

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

                <Grid item xs={12} onClick={e => setAmountUncollectedCol(!amountUncollectedCol)}
                  className='columnModalName'
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"

                  >
                    <div >Amount Uncollected</div>
                    <Checkbox
                      checked={amountUncollectedCol}

                    />
                  </Grid>
                  <Divider />
                </Grid>
                <Grid item xs={12} onClick={e => setAmountBouncedCol(!amountBouncedCol)}
                  className='columnModalName'
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"

                  >
                    <div >Amount Bounced</div>
                    <Checkbox
                      checked={amountBouncedCol}

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
                    className='modalFooter'
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