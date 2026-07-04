/* ==========================================================
   BINAH COMMAND CENTER
   CORE CONTROLLER
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    bootSystem();

});

/* ==========================================================
   BOOT SYSTEM
========================================================== */

function bootSystem(){

    const session = Authentication.getSession();

    if(session){

        console.log("[BINAH] Auto-login detected:", session.username);

        // Simula entrada direta no sistema
        enterSystem(session);

        return;

    }

    console.log("[BINAH] No session found - showing login");

    showLoginScreen();

}

/* ==========================================================
   SHOW LOGIN
========================================================== */

function showLoginScreen(){

    const login = document.getElementById("login-screen");

    if(login){

        login.classList.remove("hidden");

    }

}

/* ==========================================================
   ENTER SYSTEM
========================================================== */

function enterSystem(session){

    console.log("[BINAH] Entering Command Center:", session.username);

    // Aqui será o F04 (Transition Engine)

    window.dispatchEvent(
        new CustomEvent("binah:auto-enter", {
            detail: session
        })
    );

}

/* ==========================================================
   LISTENER - LOGIN SUCCESS
========================================================== */

window.addEventListener("binah:authenticated", () => {

    const session = Authentication.getSession();

    enterSystem(session);

});