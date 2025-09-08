// Role Selection Modal
function selectRole(role) {
    if (role === 'patient') {
        document.getElementById('roleModal').style.display = 'none';
        // This content area doesn't exist, but leaving the logic in case it's added later
        // document.getElementById('patientContent').style.display = 'block'; 
    } else if (role === 'doctor') {
        window.location.href = 'doctor.html';
    }
}

const loginModal = document.getElementById("loginModal");
const signUpModal = document.getElementById("signUpModal");
const logBtn = document.getElementById("log-btn");
const loginCloseBtn = document.querySelector("#loginModal .close-btn");
const signUpCloseBtn = document.querySelector("#signUpModal .close-btn");
const showSignUp = document.getElementById("showSignUp");
const showLogin = document.getElementById("showLogin");

if (logBtn) {
    logBtn.onclick = function() {
        loginModal.style.display = "flex";
    }
}

if (showSignUp) {
    showSignUp.onclick = function(e) {
        e.preventDefault();
        loginModal.style.display = "none";
        signUpModal.style.display = "flex";
    }
}

if (showLogin) {
    showLogin.onclick = function(e) {
        e.preventDefault();
        signUpModal.style.display = "none";
        loginModal.style.display = "flex";
    }
}

if (loginCloseBtn) {
    loginCloseBtn.onclick = function() {
        loginModal.style.display = "none";
    }
}

if (signUpCloseBtn) {
    signUpCloseBtn.onclick = function() {
        signUpModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target == signUpModal) {
        signUpModal.style.display = "none";
    }
}

// Hamburger Menu Toggle
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-link');

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

