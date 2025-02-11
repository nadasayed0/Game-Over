const btnLogin = document.getElementById("login");
const btnRegister = document.getElementById("btnRegister");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let age = document.getElementById("age");
let exist = document.getElementById("exist");
let success = document.getElementById("success");
let allRequired = document.getElementById("required");
const formData = document.querySelector("form");
const btnMode = document.getElementById("mode");

let isValid = false;

btnLogin.addEventListener("click", function () {
  window.location = "./index.html";
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

formData.addEventListener("submit", function (e) {
  e.preventDefault();

  if (emptyInput() == false) {
    allRequired.classList.remove("d-none");

    return false;
  } else {
    allRequired.classList.add("d-none");
  }

  if (isValid === true) {
    register();
  }
});
formData.addEventListener("input", function () {
  if (
    validationName(firstName) &&
    validationName(lastName) &&
    validationEmail() &&
    validationPassword() &&
    validationAge()
  ) {
    isValid = true;
  } else {
    isValid = false;
  }
});

function emptyInput() {
  if (
    firstName.value == "" ||
    lastName.value == "" ||
    email.value == "" ||
    password.value == "" ||
    age.value == ""
  ) {
    return false;
  }
}

let userLists = [];

if (localStorage.getItem("userpackage") !== null) {
  userLists = JSON.parse(localStorage.getItem("userpackage"));
}

function existEmail() {
  for (var i = 0; i < userLists.length; i++) {
    if (userLists[i].email == email.value) {
      return false;
    }
  }
}

function register() {
  let user = {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value,
    age: age.value,
  };

  if (userLists.length == 0) {
    userLists.push(user);

    localStorage.setItem("userpackage", JSON.stringify(userLists));

    success.classList.remove("d-none");

    required.classList.add("d-none");

    return true;
  }

  if (existEmail() == false) {
    exist.classList.remove("d-none");

    success.classList.add("d-none");
  } else {
    userLists.push(user);

    localStorage.setItem("userpackage", JSON.stringify(userLists));

    success.classList.remove("d-none");

    exist.classList.add("d-none");
  }
}

function validationName(input) {
  const nameRegex =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

  if (nameRegex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");

    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");

    return false;
  }
}

function validationEmail() {
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (emailRegex.test(email.value)) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    return true;
  } else {
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    return false;
  }
}

function validationPassword() {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (passwordRegex.test(password.value)) {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
    return true;
  } else {
    password.classList.add("is-invalid");
    password.classList.remove("is-valid");
    return false;
  }
}

function validationAge() {
  const ageRegex = /^(1[8-9]|[2-5][0-9]|6[0-5])$/;

  if (ageRegex.test(age.value)) {
    age.classList.remove("is-invalid");
    age.classList.add("is-valid");
    return true;
  } else {
    age.classList.add("is-invalid");
    age.classList.remove("is-valid");
    return false;
  }
}