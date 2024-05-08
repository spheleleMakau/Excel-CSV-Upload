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

   // Get the file extension of the selected file
   const fileExtension = getFileExtension(file.name);

   // Check the file type and parse accordingly
   if (fileExtension === 'xlsx') {
       parseExcelFile(file); // Call function to parse Excel file
   } else if (fileExtension === 'csv') {
       parseCsvFile(file); // Call function to parse CSV file
   } else {
       console.error('Unsupported file type'); 
   }
});

// Function to extract the file extension from the file name
function getFileExtension(fileName) {
   return fileName.split('.').pop().toLowerCase(); // Extract and return the file extension in lowercase
}

// Function to parse Excel file
function parseExcelFile(file) {
   // a new instance of FileReader
   const reader = new FileReader();

   // When the file is loaded successfully
   reader.onload = (e) => {
       // Get the file data as a Uint8Array
       const data = new Uint8Array(e.target.result);
       
       // Use SheetJS to read the workbook data
       const workbook = XLSX.read(data, { type: 'array' });

       // Log the Excel workbook to the console
       console.log('Excel Workbook:', workbook);
   };

   // Start reading the file as an ArrayBuffer
   reader.readAsArrayBuffer(file);
}

// Function to parse CSV file
function parseCsvFile(file) {
   // a new instance of FileReader
   const reader = new FileReader();

   // When the file is loaded successfully
   reader.onload = (e) => {
        // Get the CSV data as a string
       const csvData = e.target.result;
       
       // Use PapaParse to parse the CSV data
       Papa.parse(csvData, {
           complete: (result) => {
               // Log the parsed CSV data to the console
               console.log('CSV Data:', result);
           }
       });
   };

   // Start reading the file as text
   reader.readAsText(file);}