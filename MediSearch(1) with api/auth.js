// -------------------------
// This file handles all Login/Signup Modals and API calls
// Include this file on EVERY page of your site.
// -------------------------

// -------------------------
// Modal UI Controls
// -------------------------
// We must check if the elements exist before adding listeners
// This prevents errors on pages that might not have them
const loginModal = document.getElementById("loginModal");
const signUpModal = document.getElementById("signUpModal");
const logBtn = document.getElementById("log-btn");
const loginCloseBtn = loginModal ? loginModal.querySelector(".close-btn") : null;
const signUpCloseBtn = signUpModal ? signUpModal.querySelector(".close-btn") : null;
const showSignUp = document.getElementById("showSignUp");
const showLogin = document.getElementById("showLogin");
const logoutBtn = document.getElementById("logout-btn");

if (logBtn) {
  logBtn.onclick = function () {
    if (loginModal) loginModal.style.display = "flex";
  };
}

if (showSignUp) {
  showSignUp.onclick = function (e) {
    e.preventDefault();
    if (loginModal) loginModal.style.display = "none";
    if (signUpModal) signUpModal.style.display = "flex";
  };
}

if (showLogin) {
  showLogin.onclick = function (e) {
    e.preventDefault();
    if (signUpModal) signUpModal.style.display = "none";
    if (loginModal) loginModal.style.display = "flex";
  };
}

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

// Close modal on outside click
window.onclick = function (event) {
  if (event.target == loginModal) loginModal.style.display = "none";
  if (event.target == signUpModal) signUpModal.style.display = "none";
};

// -------------------------
// Auth API Calls
// -------------------------

// Signup API (local json-server)
if (signUpModal) {
  document.querySelector("#signUpModal form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.querySelector("input[placeholder='Username']").value;
    const email = e.target.querySelector("input[placeholder='Email Address']").value;
    const password = e.target.querySelector("input[placeholder='Password']").value;

    const mockAvatarUrl = `https://placehold.co/40x40/3182ce/FFFFFF?text=${username.charAt(0).toUpperCase()}`;

    try {
      const check = await fetch(`http://localhost:5000/users?username=${username}`);
      const exists = await check.json();
      if (exists.length > 0) {
        alert("Username already taken!");
        return;
      }

      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, avatarUrl: mockAvatarUrl }),
      });

      if (res.ok) {
        alert("User created successfully!");
        signUpModal.style.display = "none";
        localStorage.setItem("currentUser", username);
        localStorage.setItem("userAvatar", mockAvatarUrl);
        showUser(username, mockAvatarUrl);
      } else {
        alert("Signup failed.");
      }
    } catch (error) {
      alert("Error connecting to local API");
      console.error("Signup error:", error);
    }
  });
}

// Login API (local json-server)
if (loginModal) {
  document.querySelector("#loginModal form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.querySelector("input[placeholder='Username']").value;
    const password = e.target.querySelector("input[placeholder='Password']").value;

    console.log(`Auth.js: Attempting login for user: ${username}`);

    try {
      const apiUrl = `http://localhost:5000/users?username=${username}&password=${password}`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0];
        console.log("Auth.js: Login successful. User data:", user);
        alert(`Welcome back, ${user.username}!`);
        loginModal.style.display = "none";
        
        localStorage.setItem("currentUser", user.username);
        localStorage.setItem("userAvatar", user.avatarUrl); // Save avatar
        showUser(user.username, user.avatarUrl); // Pass avatar
      } else {
        console.warn("Auth.js: Login failed: Invalid username or password.");
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Auth.js: Login fetch error:", error);
      alert("Error connecting to local API. Is your json-server running?");
    }
  });
}

// -------------------------
// UI Update Functions
// -------------------------

// Show current user avatar in nav bar
function showUser(username, avatarUrl) {
  const logBtn = document.getElementById("log-btn");
  const userAvatar = document.getElementById("user-avatar");
  const logoutBtn = document.getElementById("logout-btn"); // Get logout button here

  if (logBtn) logBtn.style.display = "none";

  if (userAvatar) {
    userAvatar.src = avatarUrl || `https://placehold.co/40x40/3182ce/FFFFFF?text=${username.charAt(0).toUpperCase()}`;
    userAvatar.alt = username;
    userAvatar.style.display = "inline-block";
  } else {
    console.error("Auth.js: Could not find #user-avatar element!");
  }
  
  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
    console.log("Auth.js: Logout button set to display: inline-block");
  } else {
    console.error("Auth.js: Could not find #logout-btn element!");
  }
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userAvatar");

    const userAvatar = document.getElementById("user-avatar");
    if (userAvatar) userAvatar.style.display = "none";

    const logBtn = document.getElementById("log-btn");
    if(logBtn) logBtn.style.display = "inline-block";
    
    logoutBtn.style.display = "none";
    alert("Logged out successfully!");
  });
}

// Keep user shown after reload
// This runs on every page that includes this script
window.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  const currentAvatar = localStorage.getItem("userAvatar");
  
  console.log(`Auth.js: Page loaded. User: ${currentUser}`);

  if (currentUser) {
    showUser(currentUser, currentAvatar);
  }
});

