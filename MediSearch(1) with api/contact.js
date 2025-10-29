// ------------------------------------
// --- CONTACT.HTML SCRIPT ---
// (This code ONLY runs on contact.html)
// ------------------------------------

// -------------------------
// Contact Form Logic
// -------------------------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // In a real app, you would send this data to an API
    
    alert("✅ Thank you! Your message has been sent.");
    this.reset();
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
