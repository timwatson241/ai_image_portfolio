// Importing constants from the "cloudinaryConfig" file
import { cloudName, uploadPreset } from "./cloudinaryConfig";

// Defining a constant for the base URL of the Cloudinary API
const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`;

// Defining a function that makes a request to upload a file
export const makeUploadRequest = ({
  file, // The file to be uploaded
  fieldName, // The name of the field that the file should be uploaded under
  progressCallback, // A callback function that will be called with progress information during the upload process
  successCallback, // A callback function that will be called if the upload is successful
  errorCallback, // A callback function that will be called if the upload fails
}) => {

  // The URL for the upload endpoint
  const url = `${baseUrl}/image/upload`;

  // Creating a new FormData object to send with the request
  const formData = new FormData();
  // Appending the file and upload_preset constants to the FormData object
  formData.append(fieldName, file);
  formData.append("upload_preset", uploadPreset);

  // Creating a new XMLHttpRequest object
  const request = new XMLHttpRequest();
  // Setting the request method to "POST" and the URL to the upload endpoint
  request.open("POST", url);

  // Setting up an event listener for the "upload" event, which will be called periodically during the upload process
  request.upload.onprogress = (e) => {
    // Calling the progressCallback function with progress information
    progressCallback(e.lengthComputable, e.loaded, e.total);
  };

  // Setting up an event listener for the "load" event, which will be called when the request completes
  request.onload = () => {
    // If the status code is in the 200-299 range, the request was successful
    if (request.status >= 200 && request.status < 300) {
      // Parsing the response as JSON and extracting the delete_token property
      const { delete_token: deleteToken } = JSON.parse(request.response);
      // Calling the successCallback function with the deleteToken
      successCallback(deleteToken);
    } else {
      // If the status code is outside the 200-299 range, the request failed
      // Calling the errorCallback function with the response text
      errorCallback(request.responseText);
    }
  };

  // Sending the request with the FormData object as the request body
  request.send(formData);
  
  // Returning a function that can be called to abort the request
  return () => {
    request.abort();
  };
};

// Defining a function that makes a request to delete a resource using a delete token
export const makeDeleteRequest = ({
  token, // The delete token to be used to delete the resource
  successCallback, // A callback function that will be called if the deletion is successful
  errorCallback, // A callback function that will be called if the deletion fails
}) => {

  // The URL for the delete endpoint
  const url = `${baseUrl}/delete_by_token`;

  // Creating a new XMLHttpRequest object
  const request = new XMLHttpRequest();
  // Setting the request method to "POST" and the URL to the delete endpoint
  request.open("POST", url);

  // Setting the Content-Type header to "application/json"
  request.setRequestHeader("Content-Type", "application/json");

  // Setting up an event listener for the "load" event, which will be called when the request completes
  request.onload = () => {
// If the status code is in the 200-299 range, the request was successful
if (request.status >= 200 && request.status < 300) {
    // Calling the successCallback function
    successCallback();
  } else {
    // If the status code is outside the 200-299 range, the request failed
    // Calling the errorCallback function with the response text
    errorCallback(request.responseText);
  }
};
// Sending the request with the delete token as the request body
request.send(JSON.stringify({ token }));
};
