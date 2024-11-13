let form = document.querySelector(".form-container");
let tempPassword = "";

(function opening(){
    setTimeout(() => {
        document.querySelector(".lazy-loading").className = "d-none";
        document.querySelector("#show").className = "";
    }, 4000)
})()



form.addEventListener("submit", (event) => {
  event.preventDefault();
  let userName = event.target["username"].value;
  let fullName = event.target["name"].value;
  let mail = event.target["mail"].value;
  let phoneNumber = event.target["phone"].value;
  let password = event.target["password"].value;
  tempPassword = password;
  let confirmPassword = event.target["confirmpassword"].value;

  if (userNameFn(userName)) {
    alert(`Username: ${userName} can't be less than 4 characters`);
  } else if (fullNameFn(fullName)) {
    alert("Name can't be numbers");
  } else if (emailFn(mail).mailLength || emailFn(mail).mailChar) {
    if (emailFn(mail).mailLength) {
      alert("Email must be at least 6 characters");
    } else if (emailFn(mail).mailChar) {
      alert("Email must contain the symbol @");
    }
  } else if (
    phoneNumberFunction(phoneNumber).notNumbered ||
    phoneNumberFunction(phoneNumber).phoneLength
  ) {
    if (phoneNumberFunction(phoneNumber).notNumbered) {
      alert("Phone number can olny be number");
    } else if (phoneNumberFunction(phoneNumber).phoneLength) {
      alert("Length of phone number can't be less than 7");
    }
  } else if (passwordFn(confirmPassword)) {
    alert("Password and confirm password must be same.");
  } else {
    alert(`User added successfully` + `${"✅"}`);
    location.reload();
  }
});

function userNameFn(username) {
  return username.length < 4;
}

function fullNameFn(name) {
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
  if (mail.length < 6) {
    obj.mailLength = true;
  } else if (!mail.includes("@")) {
    obj.mailChar = true;
  }
  return obj;
}

function phoneNumberFunction(phoneNumber) {
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
