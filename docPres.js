document.getElementById("imageUploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fileInput = document.getElementById("prescriptionImage");
    const outputMessage = document.getElementById("outputMessage");

    if (fileInput.files.length === 0) {
        outputMessage.textContent = "Please select an image first!";
        outputMessage.style.color = "red";
    } else {
        outputMessage.textContent = "Sorry, we are working on it...";
        outputMessage.style.color = "#FF6F61";
    }
});


