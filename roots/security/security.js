/* ==========================================================
   BINAH COMMAND CENTER
   SECURITY MODULE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeSecurity

);

/* ==========================================================
   SECURITY STATE
========================================================== */

const SecurityState = {

    firewall: "ACTIVE",

    intrusion: "ENABLED",

    encryption: "AES-256",

    threat: "LOW"

};

/* ==========================================================
   SECURITY EVENTS
========================================================== */

const SecurityEvents = {

    refresh: "binah:security-refresh",

    update: "binah:security-update"

};

/* ==========================================================
   INIT
========================================================== */

function initializeSecurity(){

    initializeNavigation();
    
    initializeCards();

    console.table(

        SecurityState

    );

    initializeEventBus();

}

/* ==========================================================
   SECURITY CARDS
========================================================== */

function initializeCards(){

    updateCard(

        0,

        SecurityState.firewall

    );

    updateCard(

        1,

        SecurityState.intrusion

    );

    updateCard(

        2,

        SecurityState.encryption

    );

    updateCard(

        3,

        SecurityState.threat

    );

}

/* ==========================================================
   UPDATE CARD
========================================================== */

function updateCard(index,value){

    const cards = document.querySelectorAll(

        ".security-value"

    );

    if(

        !cards[index]

    ){

        return;

    }

    cards[index].innerText = value;

}

/* ==========================================================
   REFRESH MODULE
========================================================== */

function refreshSecurity(){

    initializeCards();

    console.log(

        "Security Module Refreshed"

    );

}

/* ==========================================================
   EVENT LISTENERS
========================================================== */

window.addEventListener(

    SecurityEvents.refresh,

    refreshSecurity

);

/* ==========================================================
   INIT
========================================================== */

function initializeSecurity(){

    initializeCards();

    applicationReady();

}

/* ==========================================================
   APPLICATION READY
========================================================== */

function applicationReady(){

    console.table(

        SecurityState

    );

    console.log(

        "Security Module Ready"

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

            module: "security",

            message,

            timestamp: new Date()

        }

    );

}