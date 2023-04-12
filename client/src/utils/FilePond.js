import {
    makeDeleteRequest,
    makeUploadRequest,
  } from "./cloudinaryHelper"; 
  
export const revert = (token, successCallback, errorCallback) => { // create a function to revert (delete) an uploaded file
    makeDeleteRequest({ // call the makeDeleteRequest function with the specified arguments
      token, // the token for the file that was uploaded
      successCallback, // the success callback function
      errorCallback, // the error callback function
    });
  };

export const process = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => { // create a function to handle the file upload process
    const abortRequest = makeUploadRequest({ // call the makeUploadRequest function with the specified arguments
      file, // the file that is being uploaded
      fieldName, // the name of the field the file belongs to
      successCallback: load, // the success callback function
      errorCallback: error, // the error callback function
      progressCallback: progress, // the progress callback function
    });

    return { // return an object with the abort method
      abort: () => { // define the abort method
        abortRequest(); // call the abortRequest function
        abort(); // call the abort function
      },
    };
  };