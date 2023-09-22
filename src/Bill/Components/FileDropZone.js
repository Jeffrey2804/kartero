import { upload } from "@testing-library/user-event/dist/upload";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { templateService } from "../../Services/template.service";

import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LinearProgress from '@mui/material/LinearProgress';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import FileDropZoneErrorMessage from "./FileDropZoneErrorMessage";
import FileDropZoneErrorModal from "./FileDropZoneErrorModal";
import FileDropZoneSingleLineModal from "./FileDropZoneSingleLineModal";
import { accountService } from "../../Services/account.service";
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
  // minHeight: "100%",
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

export default function FileDropZone(props, ref) {
  const [acceptedExtensions, setAcceptedExtensions] = useState(
    " application/csv,application/xlsx "
  );
  const [data, setData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("primary");
  const [fileName, setFileName] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [hideLoading, setHideLoading] = useState(true);
  const [errorListJSON, setErrorListJSON] = useState({});
  const abortController = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const IS_IN_DIRECTORY = "isInDirectory";
  const DIRECTORY = "directory";
  const REJECTED = "rejected";
  const [errorList, setErrorList] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    let _files = [];


    acceptedFiles.forEach((file) => {


      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        setFileName(file.name);

        uploadFile(file.name, file);


      }
      reader.readAsArrayBuffer(file);




    });

    props.onFilesDropped(_files);



  }, []);


  const parseFilePromise = new Promise((resolve, reject) => {

  })

  const getActiveTemplate = () => {


  }

  const uploadFileMethod = (name, file, templateId) => {
    templateService
      .uploadFile(name, file, templateId)
      .then((response) => {
        setData(response);
        props.uploadFile(response.data);
        props.fileHeader(response.headers);
        successProcessMessage();
      })
      .catch((error) => {


        // parseErrorMessage(error);
        console.log(error);

        if (error.message.includes("400") || error.message.includes("403")) {
          console.log("errror 400");
          setRequestMessage(error.response.data);

          setShowMessageModal(true);
        } else {

          setErrorList(error.response.data);

          setShowModal(true);
          setRequestMessage("Please check the Upload File");


        }

        errorProcessMessage();


      });
  }

  const uploadFile = (name, file) => {
    // const templateId = window.localStorage.getItem("tId");


    // if (templateId !== null) {
    // try {
    startProcessMessage();

    accountService
      .getActiveTemplateId()
      .then((templateId) => {
        console.log(templateId);
        uploadFileMethod(name, file, templateId);

      })
      .catch((error) => {

      })




    // } catch (err) {
    //   console.log(err);
    // }


    // }
  }


  const parseErrorMessage = (error) => {
    let errorMessage = "";
    console.log(error);

    if (error !== "File Size Limit") {
      // console.log("Data Found" + error.data[0].size());
      Object.keys(error.data).forEach(function (key) {

        console.log("test");

        Object.keys(error.data[key]).forEach(function (key1) {
          var value1 = error.data[key][key1];

          console.log(key1);
          console.log(value1);

          // errorMessage = errorMessage + " Invalid Format : " + key1;


          errorMessage = errorMessage +
            "{"
            + '"label":"Please Check : ' + key1 + '",'
            + '"description":"' + value1 + '"'
            + "},"


        });
      });


      console.log(errorMessage.slice(0, -1));
      const steps = JSON.parse("[" + errorMessage.slice(0, -1) + "]");

      console.log(steps);
      setErrorList(steps);
      setShowModal(true);



      setRequestMessage("Please check the Upload File");

    } else {
      setRequestMessage(error);
    }

  }

  const successProcessMessage = () => {
    setUploadStatus("success");
    setRequestMessage("Successful!");
    setHideLoading(true);
  }

  const errorProcessMessage = () => {
    setUploadStatus("error");
    setHideLoading(true);
  }

  const startProcessMessage = () => {
    setHideLoading(false);
  }

  const abortProcess = () => {
    setFileName("");
    cancelRequest();
    setUploadStatus("primary");
    setHideLoading(true);
  }

  // useEffect(() => {
  //   let isSubscribed = true
  //   fetchBananas().then(bananas => {
  //     if (isSubscribed) {
  //       setBananas(bananas)
  //     }
  //   })
  //   return () => isSubscribed = false
  // }, []);

  const cancelRequest = () => abortController.current && abortController.current.abort();

  const handleConfirm = (value) => {

    console.log(value);
    setShowModal(!showModal);
  }


  const handleCloseMessageModal = (value) => {

    setShowMessageModal(!showMessageModal);
  }


  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragAccept,
    isDragReject,

  } = useDropzone({
    onDrop,
    // accept: acceptedExtensions,
  });

  useImperativeHandle(ref, () => ({
    openDialog: () => {
      open();
    },
  }));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );


  return (

    <>
      <div {...getRootProps({ style })}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}>
          <input {...getInputProps()} />
          <div className="fileDropZone">
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}>
              <div className="dropZoneText">
                Click or drag files here
              </div>
              <div className="dropZoneStatus">
                {fileName != "" ? <Chip variant="outlined" onDelete={abortProcess}
                  icon={uploadStatus == "success" ? null : <HourglassBottomIcon />} label={fileName}
                  color={uploadStatus} /> : null}
                {hideLoading == true ? null :
                  <LinearProgress />
                }

                {uploadStatus != "error" ?
                  null :
                  <Alert severity="error">
                    {requestMessage}
                    {/* {
              Object.keys(errorListJSON.object).map((key, i) => {
                // <SomeComponent key={i} {...e} />
                <span>{key} {errorListJSON.object[key]}</span>
              })
            } */}
                  </Alert>

                }

                {uploadStatus != "success" ?
                  null :
                  <Alert severity="success">




                    {requestMessage}
                    {/* {errorListJSON} */}


                  </Alert>

                }
              </div>

              <div className="fileSizeText">
                Max 2MB file size
              </div>


            </Stack>
          </div>
        </Stack>

      </div>
      <FileDropZoneErrorModal showModal={showModal} steps={errorList} confirm={handleConfirm} />
      
      <FileDropZoneSingleLineModal showModal={showMessageModal} message={requestMessage} confirm={handleCloseMessageModal} />
    </>
  );
}
FileDropZone = forwardRef(FileDropZone);
