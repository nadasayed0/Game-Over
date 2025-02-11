const btnCreate = document.getElementById("create-Account");
let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");
let btnLogin = document.getElementById("login");
let allRequired = document.getElementById("required");
let incorrect = document.getElementById("incorrect");
const btnMode = document.getElementById("mode");

btnCreate.addEventListener("click", function () {
  window.location = "./register.html";
});

btnLogin.addEventListener("click", function () {
  login();
});

if (localStorage.getItem("theme") !== null) {
  const themeData = localStorage.getItem("theme");

  if (themeData === "light") {
    mode.classList.replace("fa-sun", "fa-moon");
  } else {
    mode.classList.replace("fa-moon", "fa-sun");
  }
  document.querySelector("html").setAttribute("data-theme", themeData);
}

btnMode.addEventListener("click", function (e) {
  if (mode.classList.contains("fa-sun")) {
    document.querySelector("html").setAttribute("data-theme", "light");
    mode.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    mode.classList.replace("fa-moon", "fa-sun");
    document.querySelector("html").setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});

let userLists = [];

if (localStorage.getItem("userpackage") !== null) {
  userLists = JSON.parse(localStorage.getItem("userpackage"));
}

function emptyInput() {
  if (userEmail.value == "" || userPassword.value == "") {
    return false;
  }
}

function login() {
  if (emptyInput() == false) {
    allRequired.classList.remove("d-none");

    return false;
  } else {
    allRequired.classList.add("d-none");
  }

  let check = {
    email: userEmail.value,
    password: userPassword.value,
  };

  for (let i = 0; i < userLists.length; i++) {
    if (
      userLists[i].email == check.email &&
      userLists[i].password == check.password
    ) {
      window.location = "./main.html";
    } else {
      console.log("eror");
      incorrect.classList.remove("d-none");
    }
  }
}