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
import { templateService } from "../../../../Services/template.service";

import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LinearProgress from '@mui/material/LinearProgress';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { adminConfigurationService } from "../../../../AdminServices/configuration.service";

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

  const IS_IN_DIRECTORY = "isInDirectory";
  const DIRECTORY = "directory";
  const REJECTED = "rejected";

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


  const uploadFile = (name, file) => {
      try {
        startProcessMessage();
        adminConfigurationService
          .getHeaders(file)
          .then((response) => {
            setData(response);
            props.uploadFile(response);
            successProcessMessage();
          })
          .catch((error) => {


            parseErrorMessage(error);

            errorProcessMessage();
          });

      } catch (err) {
        console.log(err);
      }
  }


  const parseErrorMessage = (error) => {
    let errorMessage = "";
    console.log(error);
    if (error.hasOwnProperty("data")) {
      if (error.data !== "Invalid file.") {
        for (const errorIndex in error.data) {
          errorMessage = errorMessage + " " + errorIndex + " " + error.data[errorIndex];
          console.log(errorIndex + " " + error.data[errorIndex]); // "a 5", "b 7", "c 9"
        }
      } else {
        errorMessage = error.data;
      }
    } else {
      errorMessage = error;
    }

    setRequestMessage(errorMessage);

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
    console.log("clicked");
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

    <div {...getRootProps({ style })}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}>
        <input {...getInputProps()} />
        <div className="adminFileDropZone">
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <div className="dropZoneText">
              Click To Upload Or Drop The File Here
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
          </Stack>
        </div>
      </Stack>

    </div>

  );
}
FileDropZone = forwardRef(FileDropZone);
