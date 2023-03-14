document.querySelector(".img-btn").addEventListener("click", function () {
  document.querySelector(".cont").classList.toggle("s-signup");
});
//SignUp function
const logAndReg = document.querySelector(".cont");
const signUpName = document.querySelector(".nameIn");
const signUpEmail = document.querySelector(".emailIn");
const signUpPassword = document.querySelector(".passwordIn");
const signUpConformPassword = document.querySelector(".conformPasswordIn");
const signUpMobileNo = document.querySelector(".MoblieIn");
const validStatus = document.querySelectorAll(".small");
const signUp = document.querySelector("#signUp");
const registerMessage = document.querySelector(".status-message-div");
const continueButton = document.querySelector(".continue");
const fullPage = document.getElementsByTagName("body");
const singInSuccessfullMsg = document.querySelector(".signIn-message-status");




signUp.addEventListener("click", async () => {
  let password1 = signUpPassword.value;
  let password2 = signUpConformPassword.value;
  let value = {
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
    mobileNo: signUpMobileNo.value,
  };
  if (!validateEmail(signUpEmail.value) || signUpEmail.value == null) {
    validStatus[0].style.visibility = "visible";
    validStatus[0].textContent = "Enter valid email";
    validStatus[0].style.color = "red";
  } else {
    validStatus[0].style.visibility = "hidden";
  }
  
 if (password1 == "") {
    validStatus[1].style.visibility = "visible";
    validStatus[1].textContent = "Please enter password";
    validStatus[1].style.color = "red";
  }else if (password2 == "") {
    validStatus[1].style.visibility = "hidden";
    validStatus[2].style.visibility = "visible";
    validStatus[2].textContent = "Please enter conform password";
    validStatus[2].style.color = "red";
  } else if (password1 != password2) {
    validStatus[2].textContent = "Password did not match";
    validStatus[2].style.color = "red";
  }else if (!phonenumber(signUpMobileNo)) {
    validStatus[2].style.visibility = "hidden";
    validStatus[3].style.visibility = "visible";
    validStatus[3].textContent = "Please enter 10-digit mobile number";
    validStatus[3].style.color = "red";
  } else{
    validStatus[3].style.visibility = "hidden";
    const result = await fetch("http://localhost:500/Api/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }).then((response) => response.json());
    console.log(result.message);
    let message = result.message;
    if (message == "Email already register") {
      validStatus[4].style.visibility = "hidden";
      validStatus[0].style.visibility = "visible";
      validStatus[0].textContent = "Enter already register";
      validStatus[0].style.color = "red";
    } else if (message == "Mobile number already register") {
      validStatus[4].style.visibility = "hidden";
      validStatus[3].style.visibility = "visible";
      validStatus[3].textContent = "Mobile number already register";
      validStatus[3].style.color = "red";
    } else {
      validStatus[3].style.visibility = "hidden";
      registerMessage.style.display = "block";
      logAndReg.style.display = "none";
    }
  }
});

continueButton.addEventListener("click", () => {
  registerMessage.style.display = "none";
  logAndReg.style.display = "block";
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpConformPassword.value = "";
  signUpMobileNo.value = "";
});

//SignIn function

const signInEmail = document.querySelector(".signIn-name");
const emailValid = document.querySelector(".signIn-email-status");
const signInPassword = document.querySelector(".signIn-Pass");
const passwordValid = document.querySelector(".signIn-pass-status");
const signInButton = document.querySelector("#signIn");
const okButton = document.querySelector(".signIn-ok-button");

signInButton.addEventListener("click", async () => {
  const email = signInEmail.value;
  const pass = signInPassword.value;
  let value = {
    email: email,
    password: pass,
  };
  if (!validateEmail(email) || email == null) {
    emailValid.style.visibility = "visible";
    emailValid.textContent = "Please enter valid email address";
    emailValid.style.color = "red";
  } else if(signInPassword.value == '') {
    emailValid.style.visibility = "hidden";
    passwordValid.style.visibility = "visible";
    passwordValid.textContent = "Please enter password";
    passwordValid.style.color = "red";
  }else{
    passwordValid.style.visibility = "hidden";
  }
    const result = await fetch("http://localhost:500/Api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }).then((response) => response.json());
    const message = result.message;
    console.log(result.message);
  
   if (message == "Email not registered") {
    emailValid.style.visibility = "visible";
    emailValid.textContent = "Email address not registered";
    emailValid.style.color = "red";
  } else if (message == "Password did not match") {
    emailValid.style.visibility = "hidden";
    passwordValid.style.visibility = "visible";
    passwordValid.textContent = "Password did not match";
    passwordValid.style.color = "red";
  } else{
    emailValid.style.visibility = "hidden";
    passwordValid.style.visibility = "hidden";
    setTimeout(() => {
      emailValid.style.visibility = "hidden";
      passwordValid.style.visibility = "hidden";
      singInSuccessfullMsg.style.display = "flex";
      logAndReg.style.display = "none";
    }, 3000);
  }
});
okButton.addEventListener("click", () => {
  logAndReg.style.display = "block";
  singInSuccessfullMsg.style.display = "none";
  signInEmail.value = "";
  signInPassword.value = "";
});
function phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if((inputtxt.value.match(phoneno)))
        {
      return true;
        }
      else
        {
        return false;
        }
}
const validateEmail = (email) => {
  let result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return result;
};
