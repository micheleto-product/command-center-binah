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
   DASHBOARD PANELS
========================================================== */

const DashboardPanels = {

    activity:

        "Waiting for activity...",

    status:

        "Operational",

    events:

        "No recent events.",

    ai:

        "AI Engine Ready.",

    actions:

        "Restart • Backup • Scan",

    logs:

        "System log is empty."

};

/* ==========================================================
   INIT
========================================================== */

function initializeDashboard(){

    loadUser();

    startClock();

    initializeSidebar();

    initializeCards();

    initializePanels();

    console.table(

        DashboardState

    );

    console.table(

        DashboardPanels

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

    updateCard(

        "card-users",

        "12 ACTIVE"

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
   UPDATE PANEL
========================================================== */

function updatePanel(id,value){

    const panel = document.getElementById(

        id

    );

    if(!panel){

        return;

    }

    const content = panel.querySelector(

        ".panel-content"

    );

    if(content){

        content.innerText = value;

    }

}

/* ==========================================================
   DASHBOARD PANELS
========================================================== */

function initializePanels(){

    updatePanel(

        "activity-panel",

        DashboardPanels.activity

    );

    updatePanel(

        "status-panel",

        DashboardPanels.status

    );

    updatePanel(

        "events-panel",

        DashboardPanels.events

    );

    updatePanel(

        "ai-panel",

        DashboardPanels.ai

    );

    updatePanel(

        "actions-panel",

        DashboardPanels.actions

    );

    updatePanel(

        "logs-panel",

        DashboardPanels.logs

    );

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

    const module = event.currentTarget.dataset.module;

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

    updateContent(module);

    openModule(module);

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
   MODULE NAVIGATION
========================================================== */

function navigateToModule(route){

    if(!route){

        return;

    }

    setTimeout(()=>{

        window.location.href = route;

    },250);

}

/* ==========================================================
   SAVE CURRENT MODULE
========================================================== */

function saveCurrentModule(){

    sessionStorage.setItem(

        "binah-current-module",

        NavigationState.currentModule

    );

}

/* ==========================================================
   LOAD CURRENT MODULE
========================================================== */

function loadCurrentModule(){

    const module = sessionStorage.getItem(

        "binah-current-module"

    );

    if(module){

        NavigationState.currentModule = module;

    }

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

/* ==========================================================
   RESTORE MODULE
========================================================== */

function restoreModule(){

    const module = getCurrentModule();

    const button = document.querySelector(

        `[data-module="${module}"]`

    );

    if(!button){

        return;

    }

    document.querySelectorAll(

        ".menu-item"

    ).forEach(item=>{

        item.classList.remove(

            "active"

        );

    });

    button.classList.add(

        "active"

    );

    updateContent(module);

}

/* ==========================================================
   MODULE INITIALIZER
========================================================== */

function initializeModule(){

    restoreModule();

    initializeSidebar();

}

/* ==========================================================
   APPLICATION READY
========================================================== */

function applicationReady(){

    console.log(

        "Binah Command Center Ready"

    );

}

/* ==========================================================
   MODULE NAVIGATION
========================================================== */

function openModule(module){

    switch(module){

        case "dashboard":

            console.log(

                "Dashboard Module"

            );

            break;

        case "security":

            window.location.href =

            "../security/index.html";

            break;

        case "intelligence":

            window.location.href =

            "../intelligence/index.html";

            break;

        case "users":

            window.location.href =

            "../users/index.html";

            break;

        case "logs":

            window.location.href =

            "../logs/index.html";

            break;

        case "settings":

            window.location.href =

            "../settings/index.html";

            break;

        default:

            console.warn(

                "Unknown Module"

            );

    }

}