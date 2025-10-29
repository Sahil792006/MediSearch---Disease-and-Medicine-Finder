// ------------------------------------
// --- MASTER AUTH SCRIPT ---
// (This code runs on EVERY page)
// ------------------------------------

// -------------------------
// Constants
// -------------------------
// We must check if the elements exist before adding listeners
// This prevents errors on pages that might not have them
const loginModal = document.getElementById("loginModal");
const signUpModal = document.getElementById("signUpModal");
const logBtn = document.getElementById("log-btn");
const logoutBtn = document.getElementById("logout-btn");
const userAvatar = document.getElementById("user-avatar");
const loginCloseBtn = loginModal ? loginModal.querySelector(".close-btn") : null;
const signUpCloseBtn = signUpModal ? signUpModal.querySelector(".close-btn") : null;
const showSignUp = document.getElementById("showSignUp");
const showLogin = document.getElementById("showLogin");

// Get all elements that should be hidden when logged in
const loggedOutItems = document.querySelectorAll(".logged-out-item");
// Get all elements that should be shown when logged in
const loggedInItems = document.querySelectorAll(".logged-in-item");

// -------------------------
// Event Listeners
// -------------------------

// Page Load: Check auth status
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  const avatarUrl = localStorage.getItem("avatarUrl");

  // Robust check for "dirty" or "null" localStorage values
  if (currentUser && currentUser !== "null" && currentUser !== "undefined") {
    console.log("Auth.js: User found in storage, showing user UI");
    showUserUI(currentUser, avatarUrl);
  } else {
    console.log("Auth.js: No user found, showing login UI");
    showLoginUI();
  }
});

// Show Login Modal
if (logBtn) {
  logBtn.onclick = function () {
    if (loginModal) loginModal.style.display = "flex";
  };
}

// Show Signup Modal
if (showSignUp) {
  showSignUp.onclick = function (e) {
    e.preventDefault();
    if (loginModal) loginModal.style.display = "none";
    if (signUpModal) signUpModal.style.display = "flex";
  };
}

// Show Login from Signup
if (showLogin) {
  showLogin.onclick = function (e) {
    e.preventDefault();
    if (signUpModal) signUpModal.style.display = "none";
    if (loginModal) loginModal.style.display = "flex";
  };
}

// Close Modals
if (loginCloseBtn) {
  loginCloseBtn.onclick = function () {
    if (loginModal) loginModal.style.display = "none";
  };
}
if (signUpCloseBtn) {
  signUpCloseBtn.onclick = function () {
    if (signUpModal) signUpModal.style.display = "none";
  };
}

// Close on outside click
window.onclick = function (event) {
  if (event.target == loginModal) loginModal.style.display = "none";
  if (event.target == signUpModal) signUpModal.style.display = "none";
};

// Handle Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", handleLogout);
}

// -------------------------
// API & Auth Functions
// -------------------------

// Signup API (local json-server)
const signUpForm = document.querySelector("#signUpModal form");
if (signUpForm) {
  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.querySelector("input[placeholder='Username']").value;
    const email = e.target.querySelector("input[placeholder='Email Address']").value;
    const password = e.target.querySelector("input[placeholder='Password']").value;

    try {
      // Check if username is taken
      const check = await fetch(`http://localhost:5000/users?username=${username}`);
      const exists = await check.json();
      if (exists.length > 0) {
        alert("Username already taken!");
        return;
      }

      // Create a placeholder avatar
      const avatarUrl = `https://placehold.co/40x40/3182ce/FFFFFF?text=${username.charAt(0).toUpperCase()}`;

      // Create user
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, avatarUrl }),
      });

      if (res.ok) {
        alert("User created successfully! Please log in.");
        if (signUpModal) signUpModal.style.display = "none";
        if (loginModal) loginModal.style.display = "flex";
      }
    } catch (error) {
      alert("Error connecting to local API");
      console.error(error);
    }
  });
}

// Login API (local json-server)
const loginForm = document.querySelector("#loginModal form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.querySelector("input[placeholder='Username']").value;
    const password = e.target.querySelector("input[placeholder='Password']").value;

    try {
      const res = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0];
        alert(`Welcome back, ${user.username}!`);
        if (loginModal) loginModal.style.display = "none";

        // Save data to localStorage
        localStorage.setItem("currentUser", user.username);
        localStorage.setItem("avatarUrl", user.avatarUrl);

        // Show the user UI
        showUserUI(user.username, user.avatarUrl);
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      alert("Error connecting to local API");
      console.error(error);
    }
  });
}

// Logout Function
function handleLogout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("avatarUrl");
  showLoginUI();
  alert("Logged out successfully!");
}

// -------------------------
// UI Helper Functions
// -------------------------

// Show UI for a logged-in user
function showUserUI(username, avatarUrl) {
  // Show logged-in items
  loggedInItems.forEach(item => {
    item.style.display = 'inline-block';
  });
  
  // Hide logged-out items
  loggedOutItems.forEach(item => {
    item.style.display = 'none';
  });

  // Set avatar
  if (userAvatar) {
    userAvatar.src = avatarUrl;
    userAvatar.alt = `${username}'s avatar`;
  }
}

// Show UI for a logged-out user
function showLoginUI() {
  // Hide logged-in items
  loggedInItems.forEach(item => {
    item.style.display = 'none';
  });

  // Show logged-out items
  loggedOutItems.forEach(item => {
    // Use list-item to show them in the nav bar
    item.style.display = 'list-item';
  });
}

