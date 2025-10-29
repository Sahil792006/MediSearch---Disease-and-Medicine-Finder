// ------------------------------------
// --- CONTACT.HTML SCRIPT ---
// (This code ONLY runs on contact.html)
// ------------------------------------

// -------------------------
// Contact Form Logic (UPDATED)
// -------------------------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  // Make the function async to use await
  contactForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalButtonText = submitButton.textContent;
    
    // Disable button and show loading text
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // 1. Get all form data
    const formData = new FormData(contactForm);
    const messageData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      timestamp: new Date().toISOString() // Good to add a timestamp
    };

    try {
      // 2. THIS IS THE REST API CALL
      const res = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
      });

      // 3. Check if the message was sent successfully
      if (res.ok) {
        alert("✅ Thank you! Your message has been sent.");
        this.reset(); // Clear the form
      } else {
        alert("❌ Error: Could not send message. Please try again.");
      }

    } catch (error) {
      console.error("Contact form API error:", error);
      alert("❌ Error: Could not connect to the API. Please try again later.");
    } finally {
      // Re-enable the button and restore text, whether it failed or not
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
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

