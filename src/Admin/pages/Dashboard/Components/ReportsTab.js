import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box'; 
import DeliveryBatchOverview_v2 from '../../../../Report/Components/DeliveryBatchOverview_v2';
import PaymentBatchOverview_v2 from '../../../../Report/Components/PaymentBatchOverview_v2';
import { pink } from '@mui/material/colors';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(253, 154, 8, 1)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#FD9A08',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#FD9A08',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#FD9A08',
  },
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 100,
    width: '100%',
    backgroundColor: '#FD9A08',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(151, 151, 151, 1)',
    '&.Mui-selected': {
      color: '#FD9A08',
      backgroundColor: '#FFFFFF',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(253, 154, 8, 1)',
    },
  }),
);

export default function CustomizedTabs(props) {
  const [value, setValue] = React.useState(0);
  const [showBatchOverview, setBatchOverview] = React.useState(true);
  const [showDeliveryOverview, setDeliveryOverview] = React.useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function viewBatchOverview() {
    setBatchOverview(true);
    setDeliveryOverview(false);
  }

  function viewDeliveryOverview() {
    setBatchOverview(false);
    setDeliveryOverview(true);
  }

  function previousClick() {
    window.location.reload(false);
  };

  return (
    <div className='adminPage'>
            <div className='adminPageContent'>
              <Box sx={{ width: '1500px' }}>

      <Box sx={{ bgcolor: '#f5f5f5', width: '73vw' }}>
        <Grid container spacing={1} columns={10}>
          {/* <Grid item > 
            <StyledTab icon={<ArrowBack/>} iconPosition="start" label={props.merchantName} onClick={() => {previousClick();}}/>
          </Grid> */}
          <Grid item xs={7}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Payment Overview" onClick={viewBatchOverview}/>
            <StyledTab label="Delivery Overview" onClick={viewDeliveryOverview}/>
            {/* <StyledTab label="Connections" /> */}
          </StyledTabs>
          </Grid>
        </Grid>
        <Box sx={{ p: 3 }} >

        {showBatchOverview ?  
          <PaymentBatchOverview_v2 merchantId={props.selectedStatemendId} disableBack='true'/> : 
          <DeliveryBatchOverview_v2 merchantId={props.selectedStatemendId} disableBack='true'/>}

        </Box>
      </Box>
    </Box>
    </div>
    </div>
  );
}