// ------------------------------------
// --- THEME TOGGLE SCRIPT ---
// (This code runs on EVERY page)
// ------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Function to apply the saved theme on page load
  const applySavedTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
      themeToggle.textContent = "☀️"; // Sun icon
    } else {
      body.classList.remove("dark-mode");
      themeToggle.textContent = "🌙"; // Moon icon
    }
  };

  // Function to toggle the theme
  const toggleTheme = () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    } else {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    }
  };

  // Apply the theme when the page loads
  applySavedTheme();

  // Add click event to the toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
});
