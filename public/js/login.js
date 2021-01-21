// Simple login validation
function formValidate() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    if (username.value.length != "" && password.value.length >= 5) {
        return true;
    }
    return false;
}