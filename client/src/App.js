import React, { useState } from "react";

import { FilePond, registerPlugin } from "react-filepond"; // import FilePond and registerPlugin from the react-filepond library
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"; // import plugin for handling image orientation
import FilePondPluginImagePreview from "filepond-plugin-image-preview"; // import plugin for image preview

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"; // import styles for image preview plugin
import "filepond/dist/filepond.min.css"; // import default styles for FilePond

import { process, revert } from "./utils/FilePond";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview); // register plugins with FilePond

function App() {
  const [files, setFiles] = useState([]); // create state for the files that have been selected

  return (
    <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
      <FilePond
        files={files} // pass the files state to FilePond
        acceptedFileTypes="image/*" // only accept image files
        onupdatefiles={setFiles} // update the files state when new files are added
        allowMultiple={true} // allow multiple files to be uploaded
        server={{ process, revert }} // specify the server to handle the upload and revert requests
        name="file" // the name of the input field that will contain the file(s)
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>' // the label to display when there are no files
      />
    </div>
  );
}
export default App; // export the App component as the default export for the file.
