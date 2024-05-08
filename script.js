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
       const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        // Extract headers from the data
        const headers = Object.keys(jsonData[0]);

        // Create a table with headers and data
        const table = createTableWithData(headers, jsonData);

        // Append the table to the table container
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
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
    reader.readAsText(file);
}


// Function to create a table with headers and data
function createTableWithData(headers, data) {
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');
    
    // Create header row
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    // Create data rows
    data.forEach(rowData => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = rowData[header] || ''; // Use empty string if data is undefined
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    return table;
}
