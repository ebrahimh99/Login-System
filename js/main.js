// --------------all inputs-------------
var signinEmail = document.querySelector(".signinEmail");
var signinPassword = document.querySelector(".signinPassword");

var signupName = document.querySelector(".signupName");
var signupEmail = document.querySelector(".signupEmail");
var signupPassword = document.querySelector(".signupPassword");

// ------------btns -----------------
var signUpBtn = document.querySelector(".signUpBtn");
var logInBtn = document.querySelector(".logInBtn");
var logoutBtn = document.querySelector('.btn-outline-warning');
// ------------my array -----------------
var allUsersInfo;

if (localStorage.getItem("allUsersInfo") != null) {
    allUsersInfo = JSON.parse(localStorage.getItem("allUsersInfo"));
} else {
    allUsersInfo = [];
}

// ----------------------start signUp steps------------------------
function getValues() {
    var userName = signupName.value;
    var userEmail = signupEmail.value;
    var userPassword = signupPassword.value;

    if (!validateUserName(userName)) {
        errorMessage.textContent = "Please enter a valid User Name (consists of at least 3 characters)";
        errorMessage.style.color = "red";
        return;
    } else if (!validateUserEmail(userEmail)) {
        errorMessage.textContent = "Please enter a valid Email";
        errorMessage.style.color = "red";
        return;
    } else if (!validateUserPassword(userPassword)) {
        errorMessage.textContent = "Please enter a valid Password (consists of at least five characters)";
        errorMessage.style.color = "red";
        return;
    }

    // Check if the email already exists
    if (emailExists(userEmail)) {
        errorMessage.textContent = "Email already exists. Please try with another email.";
        errorMessage.style.color = "red";
        return;
    }

    errorMessage.textContent = "";

    var singleUserInfo = {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword
    };

    allUsersInfo.push(singleUserInfo);
    localStorage.setItem("allUsersInfo", JSON.stringify(allUsersInfo));
    goToLoginPage();
    clearInput();
}

function emailExists(email) {
    for (var i = 0; i < allUsersInfo.length; i++) {
        if (allUsersInfo[i].userEmail === email) {
            return true; // Email exists
        }
    }
    return false; // Email does not exist
}
function validateUserName(userName) {
    var pattern = /^[a-zA-Z ]{3,25}$/gm;
    return pattern.test(userName);
}

function validateUserEmail(userEmail) {
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    return pattern.test(userEmail);
}

function validateUserPassword(userPassword) {
    var pattern = /^.{5,}$/;
    return pattern.test(userPassword);
}

function clearInput() {
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
}

function goToLoginPage() {
    window.location.href = "./index.html";
}

// ----------------------end signUp steps------------------------

// ----------------------start logIn steps------------------------
function checkLogin() {
    var isUserFound = false;

    for (var i = 0; i < allUsersInfo.length; i++) {
        if (allUsersInfo[i].userEmail.toLowerCase() == signinEmail.value.toLowerCase() && allUsersInfo[i].userPassword.toLowerCase() == signinPassword.value.toLowerCase()) {
            localStorage.setItem("loggedInUser", allUsersInfo[i].userName);
            goToHomePage();
            isUserFound = true;
            break;
        }
    }

    if (!isUserFound) {
        var incorrect = document.querySelector("#incorrect");
        incorrect.innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>';
    }
}

function goToHomePage() {
    window.location.href = "./home.html";
}


var username = localStorage.getItem("loggedInUser");
if (username) {
    var h1Element = document.querySelector("#username");
    if (h1Element) {
        h1Element.textContent = "Welcome " + username;
    }
}

// ----------------------end logIn steps------------------------


// Function to log out the user
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "./index.html";
}


// ---------------------set events -----------------------------------------



document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission
            checkLogin(); // Call your login function
        });
    }

    if (signUpBtn) {
        signUpBtn.addEventListener("click", getValues);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link behavior
            logout();
        });
    }
});


