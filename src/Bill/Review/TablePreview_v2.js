import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import '../../Styles/ReportsPage.css'
import FilterComponent from '../../Report/Components/FilterComponent';
import Stack from '@mui/material/Stack';
import { downloadReportService } from '../../util/downloadReport.service';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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
  background: green !important;
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size:0.8vw;
  line-height: 4vh;
  text-align: center;
  cursor: pointer;
  color: white;
}
&.medium {
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size:0.8vw;
  line-height: 4vh;
  text-align: center;
  cursor: pointer;
  color: white;
  background: orange;
}
&.high {
 
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 400;
  font-size:0.8vw;
  line-height: 4vh;
  text-align: center;
  cursor: pointer;
  color: white;
  background: rgba(242, 38, 19, 0.9) !important;
}
`;

function getCssClass(value) {
  if (value === 'Failed') return "high";
  else if (value === 'Sending') return "medium";
  return "low";
}
function currencyFormat(num) {

  if (num !== null) {
    return parseInt(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')
  }
}

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



export default function TablePreview_v2(props) {
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  // const [pending, setPending] = useState(true);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const current = new Date();
  const dateToday = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const filteredItems = props.dataFromUpload.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1


  );


  useEffect(() => {

    console.log(Object.keys(props.dataFromUpload)[0]);
    // setPending(false);
  }, [props.dataFromUpload]);

  const widthSetter = (id) => {
    if (id === "Account Number"
      || id === "Email Address"
      || id === "Mobile Number") {
      return { minWidth: "150" };
    }
    return { minWidth: "50" };
  }


  const Export = ({ onExport }) =>
    <Button onClick={e => downloadReportService.downloadCSV(filteredItems, columns, "Individual-Payment-" + props.selectedStatemendId + "-" + dateToday)}>
      <SaveIcon /> Export as CSV.
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
          {/* <ColumnHeader /> */}
          <FilterComponent
            onFilter={e => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        </Stack>
      </Grid>

    );
  }, [filterText, resetPaginationToggle, filteredItems]);

  const columns = React.useMemo(() => [

    {
      name: 'Account Number',
      id: 'accountNumber',
      selector: row => row.accountNumber,
      sortable: true,
      reorder: true,
      // right: true,
      // width: '15%',
    },
    {
      name: 'Name',
      id: 'fullName',
      selector: row => row.firstName + " " + row.middleName + " " + row.lastName,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Phone Number',
      id: 'mobileNumber',
      selector: row => row.mobileNumber,
      sortable: true,
      center: true,
      // width: '15%',
      // width: '10%',
      // cell: (row) => (
      //     <StyledCell className={getCssClass(row.deliveryStatus)}>
      //         {row.deliveryStatus}
      //     </StyledCell>
      // ),
      reorder: true,
    },
    {
      name: 'Email Address',
      id: 'emailAddress',
      selector: row => row.emailAddress,
      sortable: true,
      // right: true,
      reorder: true,
      // width: '25%',
    },
    {
      name: 'Amount',
      id: 'amountDue',
      selector: row => currencyFormat(row.amountDue),
      sortable: true,
      left: true,
      reorder: true,
      // width: '10%',
    },



  ],
    [filteredItems]);
  return (
    <Paper sx={{ width: '100%', minHeight: '30vh', overflow: 'hidden' }}>
      <Stack
        direction="column"
        justifyContent="right"
        alignItems="right"
        spacing={2}>


        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          // onRowClicked={rowClicked}
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          // subHeader
          // subHeaderComponent={subHeaderComponent}
          fixedHeader='true'
          // conditionalRowStyles={conditionalRowStyles}
          // selectableRows
          persistTableHead
          striped
          className='dataTableReport'
          // progressPending={pending}
          highlightOnHover={true}
        />

      </Stack>

    </Paper >
  );
}
