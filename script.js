const input = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const tableContainer = document.getElementById('tableContainer')

// Event listener for file upload button
uploadButton.addEventListener('click', () => {
    let file = input.files[0];
    

    // Check if file is present
    if (!file) {
        return;
    }

    // see the file properties on console
    console.log(file)

    //new instance of FileReader to read the file content
    const reader = new FileReader();

    // When the file is loaded successfully
    reader.onload = (e) => {
        // Get the file data as a Uint8Array and log the Uint8Array data to the console
        const data = new Uint8Array(e.target.result);
        console.log(data);
        };
        
    // Start reading the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);


});
