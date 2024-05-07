const input = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');

// Event listener for file upload button
uploadButton.addEventListener('click', () => {
    let file = input.files[0];
    

    // Check if file is present
    if (!file) {
        return;
    }

    // see the file properties on console
    console.log(file)

});
