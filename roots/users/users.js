/* ==========================================================
   BINAH COMMAND CENTER
   USERS MODULE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeUsers

);

/* ==========================================================
   USERS STATE
========================================================== */

const UsersState = {

    totalUsers: "0",

    activeSessions: "0",

    administrators: "1",

    lastLogin: "--"

};

/* ==========================================================
   USERS CONFIG
========================================================== */

const UsersConfig = {

    autoRefresh: false,

    refreshInterval: 5000,

    version: "1.0"

};

/* ==========================================================
   INIT
========================================================== */

function initializeUsers(){

    initializeNavigation();
    
    initializeCards();

    applicationReady();

    initializeEventBus();

}

/* ==========================================================
   USERS CARDS
========================================================== */

function initializeCards(){

    updateCard(

        0,

        UsersState.totalUsers

    );

    updateCard(

        1,

        UsersState.activeSessions

    );

    updateCard(

        2,

        UsersState.administrators

    );

    updateCard(

        3,

        UsersState.lastLogin

    );

}

/* ==========================================================
   UPDATE CARD
========================================================== */

function updateCard(index,value){

    const cards = document.querySelectorAll(

        ".users-value"

    );

    if(

        !cards[index]

    ){

        return;

    }

    cards[index].innerText = value;

}

/* ==========================================================
   USERS EVENTS
========================================================== */

const UsersEvents = {

    refresh: "binah:users-refresh",

    update: "binah:users-update"

};

/* ==========================================================
   REFRESH MODULE
========================================================== */

function refreshUsers(){

    initializeCards();

    console.log(

        "Users Module Refreshed"

    );

}

/* ==========================================================
   APPLICATION READY
========================================================== */

function applicationReady(){

    console.table(

        UsersState

    );

    console.table(

        UsersConfig

    );

    startServices();

    console.log(

        "Users Module Ready"

    );

}

/* ==========================================================
   START SERVICES
========================================================== */

function startServices(){

    if(

        !UsersConfig.autoRefresh

    ){

        return;

    }

    setInterval(() => {

        refreshUsers();

    },

    UsersConfig.refreshInterval);

}

/* ==========================================================
   EVENT LISTENERS
========================================================== */

window.addEventListener(

    UsersEvents.refresh,

    refreshUsers

);

/* ==========================================================
   UPDATE USERS
========================================================== */

function updateUsers(data){

    Object.assign(

        UsersState,

        data

    );

    refreshUsers();

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

            module: "users",

            message,

            timestamp: new Date()

        }

    );

}