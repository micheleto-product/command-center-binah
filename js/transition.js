/* ==========================================================
   BINAH COMMAND CENTER
   TRANSITION ENGINE (BASE)
========================================================== */

window.addEventListener("binah:auto-enter", (event) => {

    const session = event.detail;

    console.log("[BINAH] Transition starting for:", session.username);

    // F04 vai assumir daqui

    startTransition(session);

});

/* ==========================================================
   PLACEHOLDER
========================================================== */

function startTransition(session){

    console.log("[BINAH] F04 not implemented yet.");

    // por enquanto só simula entrada
    setTimeout(() => {

        document.body.classList.add("system-active");

        console.log("[BINAH] System ready");

    }, 800);

}