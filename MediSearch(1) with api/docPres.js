// ------------------------------------
// --- DOCPRES.HTML SCRIPT ---
// (This code ONLY runs on docPres.html)
// ------------------------------------

// -------------------------
// Prescription Form Logic
// -------------------------
const imageUploadForm = document.getElementById("imageUploadForm");
const outputMessage = document.getElementById("outputMessage");

if (imageUploadForm) {
  imageUploadForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const imageFile = document.getElementById("prescriptionImage").files[0];
    const submitButton = this.querySelector("button[type='submit']");

    if (!imageFile) {
      outputMessage.textContent = "Please select an image file to upload.";
      outputMessage.style.display = "block";
      return;
    }

    // Disable button and show loading text
    submitButton.disabled = true;
    submitButton.textContent = "Analyzing...";
    outputMessage.style.display = "block";
    outputMessage.innerHTML = "<strong>Analyzing prescription... Please wait.</strong>";

    //
    // --- THIS IS WHERE YOU WOULD CALL THE GEMINI AI API ---
    //
    
    // For now, we will simulate an AI response after a 2-second delay
    setTimeout(() => {
        // --- Simulated AI Response ---
        const aiResponse = `
            <h3>Analysis Complete:</h3>
            <p><strong>Medicines Found:</strong></p>
            <ul>
                <li><strong>Atorvastatin:</strong> 20mg, 1 tablet daily at night.</li>
                <li><strong>Metformin:</strong> 500mg, 1 tablet twice daily.</li>
                <li><strong>Paracetamol:</strong> 500mg, as needed for fever.</li>
            </ul>
            <p><em>*This is a demo analysis. Always consult your doctor or pharmacist.</em></p>
        `;
        
        outputMessage.innerHTML = aiResponse;
        
        // Re-enable the button
        submitButton.disabled = false;
        submitButton.textContent = "Upload and Analyze";

    }, 2000); // 2-second delay
  });
}

// -------------------------
// Hamburger Menu Toggle
// (This is page-specific UI)
// -------------------------
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-link");

if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    if (navLinks) navLinks.classList.toggle("active");
  });
}
