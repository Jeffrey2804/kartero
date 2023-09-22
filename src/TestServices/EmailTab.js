import React, { useEffect, useState, useMemo } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { SmtpProxy } from './Services/SmtpProxy.service';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const handleChange = (event) => {
  console.log(event);
  console.log(event.target.name + " " + event.target.value);

  SmtpProxy
    .saveStatus(event.target.name, event.target.value)
    .then((response) => {

      console.log(response);
      window.location.reload(false);
    })
    .catch((error) => {


    });
};

function EmailTab(props) {
  const [statusAll, setStatusAll] = useState();
  const [smtpList, setSmtpList] = useState();
  const handleAllStatus = (event) => {
    setStatusAll(event.target.value);
  }


  const updateAllStatus = () => {
    SmtpProxy
      .saveStatusAll(statusAll)
      .then((response) => {

        console.log(response);
        window.location.reload(false);
      })
      .catch((error) => {


      });
  }


  const viewSmtp = () => {

    console.log("View Smtp");
    SmtpProxy
      .getSmtpList()
      .then((response) => {
        setSmtpList(response);
        console.log(props.smtpList);
      })
      .catch((error) => {


      });

  }

  useMemo(() => {
    viewSmtp();
    console.log(smtpList);
  }, [])



  return (
    <>


      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-select-small"
              // id={row.id}
              value={statusAll}
              label="Status"
              // name={statusAll}
              onChange={handleAllStatus}
            >


              {props.statusList.map(function (object, i) {
                return <MenuItem value={i}>{object}</MenuItem>;
              })

              }
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={updateAllStatus}>Apply to All</Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
                <StyledTableCell align="center">Sending ID</StyledTableCell>
                <StyledTableCell align="center">Recipient</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Subject</StyledTableCell>
                <StyledTableCell align="center">Message Content</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>

              {props.smtpList.map((row) => (
                <StyledTableRow key={row.name}>
                  {/* <StyledTableCell component="th" scope="row">
              {row.name}
            </StyledTableCell> */}
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.recipient}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Select
                      labelId="demo-select-small"
                      id={row.id}
                      // value={age}
                      label="Age"
                      name={row.id}
                      onChange={handleChange}
                    >
                      {props.statusList.map(function (object, i) {
                        return <MenuItem value={i}>{object}</MenuItem>;
                      })

                      }

                    </Select>

                  </StyledTableCell>
                  <StyledTableCell align="center">{row.subject}</StyledTableCell>
                  <StyledTableCell align="center">{row.content}</StyledTableCell>
                </StyledTableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Stack>

    </>
  )
}

export default EmailTab