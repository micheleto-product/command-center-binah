/* ==========================================================
   BINAH COMMAND CENTER
   TRANSITION ENGINE
========================================================== */

/* ==========================================================
   EVENTS
========================================================== */

window.addEventListener(

    "binah:authenticated",

    startTransition

);

/* ==========================================================
   START TRANSITION
========================================================== */

function startTransition(){

    const login = document.getElementById(

        "login-screen"

    );

    const transition = document.getElementById(

        "transition-screen"

    );

    if(login){

        login.style.display = "none";

    }

    if(transition){

        transition.classList.remove(

            "hidden"

        );

        transition.classList.add(

            "active"

        );

    }

    initializeMission();

}

/* ==========================================================
   MISSION INITIALIZATION
========================================================== */

function initializeMission(){

    const message = document.getElementById(

        "transition-message"

    );

    const progress = document.getElementById(

        "loading-progress"

    );

    const steps = [

        {

            text: "Loading Modules...",

            progress: 20

        },

        {

            text: "Checking Security...",

            progress: 40

        },

        {

            text: "Loading Interface...",

            progress: 65

        },

        {

            text: "Connecting Services...",

            progress: 85

        },

        {

            text: "Command Center Ready",

            progress: 100

        }

    ];

    let index = 0;

    function nextStep(){

        if(index >= steps.length){

            console.log(

                "Mission Initialization Finished"

            );

            finishTransition();

            return;

        }

        if(message){

            message.innerText =

                steps[index].text;

        }

        if(progress){

            progress.style.width =

                steps[index].progress + "%";

        }

        index++;

        setTimeout(

            nextStep,

            900

        );

    }

    nextStep();

}

/* ==========================================================
   FINISH TRANSITION
========================================================== */

function finishTransition(){

    const transition = document.getElementById(

        "transition-screen"

    );

    if(transition){

        transition.classList.add(

            "fade-out"

        );

    }

    setTimeout(() => {

        window.location.href =

            "roots/dashboard/index.html";

    },800);

}