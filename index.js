let form = document.querySelector(".form-container");
let tempPassword = "";

(function opening() {
  setTimeout(() => {
    document.querySelector(".lazy-loading").className = "d-none";
    document.querySelector("#show").className = "";
  }, 4000);
})();

document.querySelector("#username").addEventListener("input", (event) => {
  usernameFn(event.target.value) && event.target.value?.length
    ? (document.getElementById(
        "usernameLabel"
      ).innerText = `Username: ${event.target.value} can't be less than 4 characters`)
    : (document.getElementById("usernameLabel").innerText = "");
});

document.querySelector("#name").addEventListener("input", (event) => {
  nameFn(event.target.value) && event.target.value?.length
    ? (document.getElementById("nameLabel").innerText = `Name can't be numbers`)
    : (document.getElementById("nameLabel").innerText = "");
});

document.querySelector("#mail").addEventListener("input", (event) => {
  if (
    (emailFn(event.target.value).mailLength && event.target.value?.length) ||
    (emailFn(event.target.value).mailChar && event.target.value?.length)
  ) {
    if (emailFn(event.target.value).mailChar) {
      return (document.getElementById("mailLabel").innerText =
        "Email must contain the symbol @");
    } else if (emailFn(event.target.value).mailLength) {
      return (document.getElementById("mailLabel").innerText =
        "Email must be at least 6 characters");
    }
  } else {
    return (document.getElementById("mailLabel").innerText = "");
  }
});

document.querySelector("#phone").addEventListener("input", (event) => {
  if (
    (phoneFn(event.target.value).notNumbered && event.target.value?.length) ||
    (phoneFn(event.target.value).phoneLength && event.target.value?.length)
  ) {
    if (phoneFn(event.target.value).notNumbered) {
      return (document.getElementById("phoneLabel").innerText =
        "Phone number can olny be number");
    } else if (phoneFn(event.target.value).phoneLength) {
      return (document.getElementById("phoneLabel").innerText =
        "Length of phone number can't be less than 7");
    }
  } else {
    return (document.getElementById("phoneLabel").innerText = "");
  }
});

document
  .querySelector("#confirmpassword")
  .addEventListener("input", (event) => {
    tempPassword = document.querySelector("#password").value;
    passwordFn(event.target.value) && event.target.value?.length
      ? (document.getElementById(
          "confirmpasswordLabel"
        ).innerText = `Password and confirm password must be same.`)
      : (document.getElementById("confirmpasswordLabel").innerText = "");
  });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let userName = event.target["username"].value;
  let fullName = event.target["name"].value;
  let mail = event.target["mail"].value;
  let phoneNumber = event.target["phone"].value;
  let password = event.target["password"].value;
  tempPassword = password;
  let confirmPassword = event.target["confirmpassword"].value;

  if (
    usernameFn(userName) ||
    nameFn(fullName) ||
    emailFn(mail).mailLength ||
    emailFn(mail).mailChar ||
    phoneFn(phoneNumber).notNumbered ||
    phoneFn(phoneNumber).phoneLength ||
    passwordFn(confirmPassword)
  ) {
    alert("Invalid credentials");
  } else {
    alert(`User added successfully` + `${"✅"}`);
    location.reload();
  }
});

function usernameFn(username) {
  return username.length < 4;
}

function nameFn(name) {
  for (let i = 0; i < name.length; i++) {
    if (name[i] >= "0" && name[i] <= "9") {
      return true;
    }
  }
  return false;
}

function emailFn(mail) {
  let obj = {
    mailLength: false,
    mailChar: false,
  };
  if (!mail.includes("@")) {
    obj.mailChar = true;
  } else if (mail.length < 6) {
    obj.mailLength = true;
  }
  return obj;
}

function phoneFn(phoneNumber) {
  let phoneObj = {
    phoneLength: false,
    notNumbered: false,
  };
  if (phoneNumber.length < 7) {
    phoneObj.phoneLength = true;
  } else {
    for (let i = 0; i < phoneNumber.length; i++) {
      if (phoneNumber[i] >= "a" && phoneNumber[i] <= "b") {
        phoneObj.notNumbered = true;
      }
    }
  }
  return phoneObj;
}

function passwordFn(password) {
  return password !== tempPassword;
}
