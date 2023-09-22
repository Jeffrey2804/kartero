import React, {
  useEffect,
  useRef,
  useState
} from "react";
import '../../Styles/Upload.css';
import FileDropZone from "../Components/FileDropZone";
import { Stack } from "@mui/material";
function Upload(props) {

  const fileChooserRef = useRef();
  const handleDropItems = (items) => {

    if (items.length > 0) {

      //setOpenImportModal(true);
      //setDroppedItems(items);
      // console.log("import" + items);
    }
  };

  const handleUpload = (items) => {
    // console.log(props.templateId);

    try {
      props.uploadData(items);

    } catch (e) {
      console.log('Error')
    }



  }


  const handleFileHeader = (fileHeader) => {
    try {
      console.log(fileHeader);
      props.fileHeader(fileHeader);

    } catch (e) {
      console.log('Error')
    }

  }
 

  return (
    <div className='upload'>
      <Stack
       direction="column"
       justifyContent="space-between"
       alignItems="center"
       spacing={2}
      >
        <FileDropZone
          ref={fileChooserRef}
          onFilesDropped={handleDropItems}
          uploadFile={handleUpload}
          fileHeader={handleFileHeader}
          className='fileDropZone'
        />



        <div className='uploadMessage'>You can only upload template provided by Infobuilder</div>
      </Stack>

    </div>
  )
}

export default Upload