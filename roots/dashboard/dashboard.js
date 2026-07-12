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

        initializeEventBus();

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

    initializeEventBus();

    registerDashboardState();

    console.table(

        DashboardState

    );

    console.table(

        DashboardPanels

    );

    publishDashboardEvent(

        "Dashboard initialized."

    );

    console.table(

        StateManager.get(

            "dashboard"

        )

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

        DashboardState[key] = value;

        syncDashboardState();

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

        DashboardPanels[key] = value;

        StateManager.set(

            "dashboard-panels",

            DashboardPanels

        );

    }

    DashboardController.refresh();

}



/* ==========================================================
   REFRESH DASHBOARD
========================================================== */

function refreshDashboard(){

    initializeCards();

    initializePanels();

    publishDashboardEvent(

        "Dashboard refreshed."

    );

}

/* ==========================================================
   EVENT PUBLISHERS
========================================================== */

function publishDashboardEvent(message){

    EventBus.publish(

        "DASHBOARD_EVENT",

        {

            message,

            timestamp: new Date()

        }

    );

}

/************************************************************
 EVENT BUS
************************************************************/

function initializeEventBus(){

    // Reserved for future events

}

function publishModuleEvent(message){

    EventBus.publish(

        "MODULE_EVENT",

        {

            module: "dashboard",

            message,

            timestamp: new Date()

        }

    );

}

/* ==========================================================
   REGISTER GLOBAL STATE
========================================================== */

function registerDashboardState(){

    syncDashboardState();

}

/* ==========================================================
   SYNC DASHBOARD STATE
========================================================== */

function syncDashboardState(){

    StateManager.set(

        "dashboard",

        DashboardState

    );

    StateManager.set(

        "dashboard-panels",

        DashboardPanels

    );

}