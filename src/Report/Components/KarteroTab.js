import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PaymentBatchOverview_v2 from './PaymentBatchOverview_v2';
import DeliveryBatchOverview from './DeliveryBatchOverview';
import DeliveryBatchOverview_v2 from './DeliveryBatchOverview_v2';
import { authenticationService } from '../../Services/authentication.service';
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
    maxWidth: 40,
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
  const [account, setAccount] = useState({});
  function extractAccount() {
    authenticationService
      .extractData()
      .then((User) => {
        setAccount(User);
      })
      .catch((error) => {
        console.log("invalid credentials");
        console.log(error);

      });
  }
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
  useEffect(() => {
    extractAccount();
  }, [showBatchOverview]);

  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ bgcolor: '#F9F9F9' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Payment Overview" onClick={viewBatchOverview} />
          <StyledTab label="Delivery Overview" onClick={viewDeliveryOverview} />
          {/* <StyledTab label="Connections" /> */}
        </StyledTabs>
        <Box sx={{ p: 3 }} >

          {
            showBatchOverview ? <PaymentBatchOverview_v2 merchantId={account.merchantId} />
              : <DeliveryBatchOverview_v2 merchantId={account.merchantId} />
          }

        </Box>
      </Box>
    </Box>
  );
}