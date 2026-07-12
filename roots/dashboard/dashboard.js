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

    users: "12 ACTIVE",

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
   DASHBOARD DATA
========================================================== */

const DashboardData = {

    activity: [],

    events: [],

    logs: []

};

/* ==========================================================
   DASHBOARD CONTROLLER
========================================================== */

const DashboardController = {

    refresh(){

        initializeCards();

        initializePanels();

    }

};

/* ==========================================================
   ADD ACTIVITY
========================================================== */

function addActivity(message){

    DashboardData.activity.unshift(message);

    if(DashboardData.activity.length > 5){

        DashboardData.activity.pop();

    }

    DashboardPanels.activity =

        DashboardData.activity.join("\n");

    DashboardController.refresh();

}

/* ==========================================================
   ADD EVENT
========================================================== */

function addEvent(message){

    DashboardData.events.unshift(message);

    if(DashboardData.events.length > 5){

        DashboardData.events.pop();

    }

    DashboardPanels.events =

        DashboardData.events.join("\n");

    DashboardController.refresh();

}

/* ==========================================================
   ADD LOG
========================================================== */

function addDashboardLog(message){

    DashboardData.logs.unshift(message);

    if(DashboardData.logs.length > 5){

        DashboardData.logs.pop();

    }

    DashboardPanels.logs =

        DashboardData.logs.join("\n");

    DashboardController.refresh();

}

/* ==========================================================
   INIT
========================================================== */

function initializeDashboard(){

    initializeNavigation();
    
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

        DashboardState.users

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

    openModule(module);

}



function capitalize(text){

    return text.charAt(0).toUpperCase()

        + text.slice(1);

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

    Navigation.go(module);

}

/* ==========================================================
   UPDATE DASHBOARD STATE
========================================================== */

function updateDashboardState(key,value){

    if(

        DashboardState.hasOwnProperty(key)

    ){

        DashboardState[key]=value;

    }

    DashboardController.refresh();

}

/* ==========================================================
   UPDATE PANEL STATE
========================================================== */

function updatePanelState(key,value){

    if(

        DashboardPanels.hasOwnProperty(key)

    ){

        DashboardPanels[key]=value;

    }

    DashboardController.refresh();

}