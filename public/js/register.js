
function loginValidation() {
    let password = document.getElementById("inputPassword");
    let passwordrepeat = document.getElementById("repeatPasswordInput");
    let flag = 0;

    return passwordRepeatCheck(password) && passwordStrength(passwordrepeat);
};


function passwordStrength(field) {
    let passwordError = document.getElementById('passwordError')
    var password = field.value;
    var errors = [];
    if (password.length < 8) {
        errors.push("Your password must be at least 8 characters");
    }
    if (password.search(/[a-z]/) < 0) {
        errors.push("Your password must contain at least one lowercase letter.");
    }
    if (password.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one uppercase letter.");
    }
    if (password.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one number.");
    }
    if (errors.length > 0) {
        passwordError.innerText = (errors.join("\n"));
        passwordError.style.fontSize = "12px";
        passwordError.removeAttribute("hidden", true);
        inputPassword.style.border = "5px solid #DC3545";
        return false;
    }
    else {
        passwordError.innerText = "";
        passwordError.setAttribute("hidden", true);
        inputPassword.style.border = "";
        if (password.length >= 8 && password.length < 10) {
            inputPassword.style.border = "5px solid #FFC107";
        }
        else {
            inputPassword.style.border = "5px solid #28A745";
        }
    }

    return true;
}

function passwordRepeatCheck(element) {
    let passwordError = document.getElementById('passwordError');
    let password = document.getElementById("inputPassword").value;
    let repeatPassword = element.value;
    if (password == repeatPassword) {
        passwordError.setAttribute("hidden", true);
        element.style.border = "1px solid #ced4da";
        return true;
    }
    else {
        passwordError.innerText = "Passwords don't match!";
        passwordError.style.fontSize = "12px";
        passwordError.removeAttribute("hidden", true);
        element.style.border = "5px solid #DC3545";
        return false;
    }
}