/* ==========================================================
   BINAH COMMAND CENTER
   LOGIN CONTROLLER
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-form");

    if (!form) return;

    createMessageContainer();

    form.addEventListener("submit", login);

    document.getElementById("username").focus();

});

/* ==========================================================
   LOGIN
========================================================== */

function login(event){

    event.preventDefault();

    const username = document.getElementById("username");

    const password = document.getElementById("password");

    const button = document.getElementById("access-button");

    const result = Authentication.validate(
        username.value,
        password.value
    );

    clearMessage();

    if(!result.success){

        showMessage(result.message, "error");

        return;

    }

    startLoading(button, username.value);

}

/* ==========================================================
   LOADING
========================================================== */

function startLoading(button, username){

    button.disabled = true;

    button.innerText = "AUTHENTICATING...";

    setTimeout(() => {

        Authentication.login(username);

        button.innerText = "ACCESS GRANTED";

        showMessage(
            "Authentication successful.",
            "success"
        );

        // evento único e limpo para F04
        window.dispatchEvent(
            new Event("binah:authenticated")
        );

    }, 1500);

}

/* ==========================================================
   MESSAGE SYSTEM
========================================================== */

function createMessageContainer(){

    const div = document.createElement("div");

    div.id = "login-message";

    document.querySelector(".login-card").appendChild(div);

}

function showMessage(text, type){

    const div = document.getElementById("login-message");

    div.innerText = text;

    div.className = "";

    div.classList.add(type);

}

function clearMessage(){

    const div = document.getElementById("login-message");

    div.innerText = "";

    div.className = "";

}