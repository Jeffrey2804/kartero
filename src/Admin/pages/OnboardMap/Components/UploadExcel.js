import React, { useRef, useState, useEffect } from "react";
import { Stack } from "@mui/material";
import FileDropZone from "./FileDropZone";
import '../../../../Styles/AdminStepper.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import TextField from '@mui/material/TextField';
import { subscriptionService } from "../../../../Services/subscription.service";
import { accountService } from "../../../../Services/account.service";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  //padding: "20px",
  borderWidth: 1,
  borderRadius: 10,
  borderColor: "orange",
  borderStyle: "solid",
  backgroundColor: "rgba(250,250,250,0)",
  color: "#4e4e4e",
  outline: "none",
  cursor: "pointer",
  transition: "border .24s ease-in-out",
  minHeight: "100%",
  textAlign: "center",
  justifyContent: "center",
};

const activeStyle = {
  borderColor: "orange",
};

const acceptStyle = {
  borderColor: "orange",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function UploadExcel(props) {
  const fileChooserRef = useRef();
  const [activeSubscription, setActiveSubscription] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState("");
  const [templateName, setTemplateName] = useState("");
  const handleDropItems = (items) => {

    if (items.length > 0) {

      //setOpenImportModal(true);
      //setDroppedItems(items);
      console.log("import" + items);
    }
  };
  const handleChange = (event) => {
    // setAge(event.target.value);
    console.log(event.target.value);
    setSubscriptionId(event.target.value);
    props.subscriptionId(event.target.value);
  };

  const handleKeyDown = (event) => {
    setTemplateName(event.target.value);
    props.templateName(event.target.value);
  }

  const getActiveSubscriptionById = () => {
    const adminId = localStorage.getItem("uid");
    console.log(props.merchantID);


    subscriptionService
      .getActiveSubscriptionById(props.merchantID, adminId)
      .then((response) => {
        console.log(response);
        setActiveSubscription(response);
      })
      .catch((error) => {
        console.log(error.data);
      })



  }

  useEffect(() => {
    getActiveSubscriptionById();
  }, []);


  const handleUpload = (items) => {
    try {
      props.uploadData(items);
      console.log("Values: " + items)
      console.log(items)
    } catch (e) {
      console.log("Error on upload");
    }
  }

  return (
    <div className="uploadBoxHolder">
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ minWidth: '500px', marginTop: 2 }}
        >
          <div className="titleText">Template Name</div>
          <FormControl sx={{ minWidth: '300px' }}>
            <TextField
              value={templateName}
              onChange={handleKeyDown}
              onKeyDown={handleKeyDown}
              
              label="Enter Template Name" id="outlined-size-normal" />
          </FormControl>
        </Stack>


        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ minWidth: '500px', marginTop: 2 }}
        >
          <div className="titleText">Subscription Plan</div>
          <FormControl sx={{ minWidth: '300px' }}>
            <InputLabel sx={{ width: 200 }} id="demo-simple-select-label">Select Subscription</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Subscription"
              value={subscriptionId}

              onChange={handleChange}
            >
              {
                Object.keys(activeSubscription).map(function (key) {

                  return (<MenuItem value={activeSubscription[key].id}>{activeSubscription[key].subscriptionName}</MenuItem>)

                }
                )
              }
            </Select>
          </FormControl>
        </Stack>





        <FileDropZone
          ref={fileChooserRef}
          onFilesDropped={handleDropItems}
          uploadFile={handleUpload}
          className='adminFileDropZone'
        />

        <div className="fileSizeText">
          You may only upload template provided by Infobuilder.
        </div>

      </Stack>
    </div>
  )
}

export default UploadExcel