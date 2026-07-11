/* ==========================================================
   BINAH COMMAND CENTER
   DASHBOARD
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeDashboard

);

/* ==========================================================
   SYSTEM STATE
========================================================== */

const DashboardState = {

    version: "v0.1.0",

    status: "ONLINE",

    username: "UNKNOWN",

    system: "ONLINE",

    security: "SECURE",

    ai: "IDLE",

    logs: "0 ALERTS"

};

/* ==========================================================
   INIT
========================================================== */

function initializeDashboard(){

    loadUser();

    startClock();

    initializeSidebar();

    initializeCards();

    console.table(

        DashboardState

    );

    // Future Modules

}


/* ==========================================================
   DASHBOARD CARDS
========================================================== */

function initializeCards(){

    updateCard(

        "card-system",

        DashboardState.system

    );

    updateCard(

        "card-security",

        DashboardState.security

    );

    updateCard(

        "card-ai",

        DashboardState.ai

    );

    updateCard(

        "card-logs",

        DashboardState.logs

    );

}

function updateCard(id,value){

    const card = document.getElementById(id);

    if(!card){

        return;

    }

    const field = card.querySelector(".card-value");

    if(field){

        field.innerText = value;

    }

}

/* ==========================================================
   USER
========================================================== */

function loadUser(){

    const data = sessionStorage.getItem(

        "binah-session"

    );

    if(!data){

        return;

    }

    const session = JSON.parse(data);

    const user = document.getElementById(

        "current-user"

    );

    if(user){

        DashboardState.username =

    session.username.toUpperCase();

    user.innerText =

    DashboardState.username;

    }

}

/* ==========================================================
   CLOCK
========================================================== */

function startClock(){

    updateClock();

    setInterval(updateClock,1000);

}

function updateClock(){

    const clock = document.getElementById(

        "system-clock"

    );

    if(!clock){

        return;

    }

    clock.innerText =

        new Date().toLocaleTimeString();

}

/* ==========================================================
   SIDEBAR
========================================================== */

function initializeSidebar(){

    const buttons = document.querySelectorAll(

        ".menu-item"

    );

    buttons.forEach(button=>{

        button.addEventListener(

            "click",

            changeModule

        );

    });

}

function changeModule(event){

    document.querySelectorAll(

        ".menu-item"

    ).forEach(button=>{

        button.classList.remove(

            "active"

        );

    });

    event.currentTarget.classList.add(

        "active"

    );

    const module =

        event.currentTarget.dataset.module;

    NavigationState.currentModule =

        module;

    updateContent(module);

    console.table({

        Module: module,

        Route: getModuleRoute(module)

    });

}

function updateContent(module){

    document.getElementById(

        "module-title"

    ).innerText = capitalize(module);

    document.getElementById(

        "module-description"

    ).innerText =

        "Module ready for initialization.";

}

function capitalize(text){

    return text.charAt(0).toUpperCase()

        + text.slice(1);

}

/* ==========================================================
   GET MODULE ROUTE
========================================================== */

function getModuleRoute(module){

    return ModuleRoutes[module] || null;

}

/* ==========================================================
   GET CURRENT MODULE
========================================================== */

function getCurrentModule(){

    return NavigationState.currentModule;

}

/* ==========================================================
   MODULE ROUTES
========================================================== */

const ModuleRoutes = {

    dashboard: "../dashboard/index.html",

    security: "../security/index.html",

    intelligence: "../intelligence/index.html",

    users: "../users/index.html",

    logs: "../logs/index.html",

    settings: "../settings/index.html"

};

/* ==========================================================
   NAVIGATION STATE
========================================================== */

const NavigationState = {

    currentModule: "dashboard"

};

/* ==========================================================
   GET MODULE ROUTE
========================================================== */

function getModuleRoute(module){

    return ModuleRoutes[module] || null;

}

