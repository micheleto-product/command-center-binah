/* ==========================================================
   BINAH COMMAND CENTER
   INTELLIGENCE MODULE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeIntelligence

);

/* ==========================================================
   INTELLIGENCE STATE
========================================================== */

const IntelligenceState = {

    aiEngine: "ONLINE",

    processing: "IDLE",

    connectedModels: "0",

    queue: "EMPTY"

};

/* ==========================================================
   INTELLIGENCE CONFIG
========================================================== */

const IntelligenceConfig = {

    autoRefresh: false,

    refreshInterval: 5000,

    version: "1.0"

};

/* ==========================================================
   INIT
========================================================== */

function initializeIntelligence(){

    initializeNavigation();
    
    initializeCards();

    applicationReady();

    initializeEventBus();

}

/* ==========================================================
   INTELLIGENCE CARDS
========================================================== */

function initializeCards(){

    updateCard(

        0,

        IntelligenceState.aiEngine

    );

    updateCard(

        1,

        IntelligenceState.processing

    );

    updateCard(

        2,

        IntelligenceState.connectedModels

    );

    updateCard(

        3,

        IntelligenceState.queue

    );

}

/* ==========================================================
   UPDATE CARD
========================================================== */

function updateCard(index,value){

    const cards = document.querySelectorAll(

        ".intelligence-value"

    );

    if(

        !cards[index]

    ){

        return;

    }

    cards[index].innerText = value;

}

/* ==========================================================
   INTELLIGENCE EVENTS
========================================================== */

const IntelligenceEvents = {

    refresh: "binah:intelligence-refresh",

    update: "binah:intelligence-update"

};

/* ==========================================================
   REFRESH MODULE
========================================================== */

function refreshIntelligence(){

    initializeCards();

    console.log(

        "Intelligence Module Refreshed"

    );

}

/* ==========================================================
   APPLICATION READY
========================================================== */

function applicationReady(){

    console.table(

        IntelligenceState

    );

    console.table(

        IntelligenceConfig

    );

    startServices();

    console.log(

        "Intelligence Module Ready"

    );

}

/* ==========================================================
   START SERVICES
========================================================== */

function startServices(){

    if(

        !IntelligenceConfig.autoRefresh

    ){

        return;

    }

    setInterval(() => {

        refreshIntelligence();

    },

    IntelligenceConfig.refreshInterval);

}

/* ==========================================================
   EVENT LISTENERS
========================================================== */

window.addEventListener(

    IntelligenceEvents.refresh,

    refreshIntelligence

);

/* ==========================================================
   FUTURE API
========================================================== */

function updateIntelligence(data){

    Object.assign(

        IntelligenceState,

        data

    );

    refreshIntelligence();

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

            module: "intelligence",

            message,

            timestamp: new Date()

        }

    );

}