/* ==========================================================
   BINAH COMMAND CENTER
   LOGS MODULE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeLogs

);

/* ==========================================================
   LOGS STATE
========================================================== */

const LogsState = [

    {

        time:"00:00:00",

        level:"INFO",

        message:"System initialized."

    },

    {

        time:"00:00:01",

        level:"OK",

        message:"Authentication service ready."

    },

    {

        time:"00:00:02",

        level:"WARN",

        message:"Waiting for new events..."

    }

];

/* ==========================================================
   LOGS CONFIG
========================================================== */

const LogsConfig = {

    maxLogs: 100,

    autoScroll: true,

    version: "1.0"

};

/* ==========================================================
   INIT
========================================================== */

function initializeLogs(){

    renderLogs();

    applicationReady();

    initializeEventBus();

    registerLogsState();

    console.table(

    StateManager.get(

        "logs"

    )

);

}

/* ==========================================================
   RENDER LOGS
========================================================== */

function renderLogs(){

    const panel = document.getElementById(

        "logs-panel"

    );

    if(!panel){

        return;

    }

    panel.innerHTML = "";

    LogsState.forEach(log=>{

        panel.appendChild(

            createLogRow(log)

        );

    });

}

/* ==========================================================
   CLEAR LOGS
========================================================== */

function clearLogs(){

    LogsState.length = 0;

    renderLogs();

}

/* ==========================================================
   CREATE LOG ROW
========================================================== */

function createLogRow(log){

    const row = document.createElement(

        "div"

    );

    row.className = "log-row";

    row.innerHTML = `

        <span class="log-time">

            ${log.time}

        </span>

        <span class="log-level ${getLevelClass(log.level)}">

            ${log.level}

        </span>

        <span class="log-message">

            ${log.message}

        </span>

    `;

    return row;

}

/* ==========================================================
   LEVEL CLASS
========================================================== */

function getLevelClass(level){

    switch(level){

        case "INFO":

            return "info";

        case "OK":

            return "success";

        case "WARN":

            return "warning";

        case "ERROR":

            return "error";

        default:

            return "info";

    }

}

/* ==========================================================
   ADD LOG
========================================================== */

function addLog(level,message){

    const now = new Date();

    const time = now.toLocaleTimeString();

    LogsState.unshift({

        time,

        level,

        message

    });

    StateManager.set(

        "logs",

        LogsState

    );

    if(

        LogsState.length >

        LogsConfig.maxLogs

    ){

        LogsState.pop();

    }

    StateManager.set(

        "logs",

        LogsState

    );

    renderLogs();

}

/* ==========================================================
   APPLICATION READY
========================================================== */

function applicationReady(){

    console.table(

        LogsState

    );

    console.table(

        LogsConfig

    );

    console.log(

        "Logs Module Ready"

    );

}

/* ==========================================================
   SAMPLE EVENTS
========================================================== */

function generateSampleLogs(){

    addLog(

        "INFO",

        "Logs Module initialized."

    );

    addLog(

        "OK",

        "Event system connected."

    );

}

/* ==========================================================
   EVENT BUS
========================================================== */

function initializeEventBus(){

    EventBus.subscribe(

        "DASHBOARD_EVENT",

        receiveDashboardEvent

    );

}

/* ==========================================================
   RECEIVE DASHBOARD EVENT
========================================================== */

function receiveDashboardEvent(payload){

    addLog(

        "INFO",

        payload.message

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

            module: "logs",

            message,

            timestamp: new Date()

        }

    );

}

/* ==========================================================
   REGISTER GLOBAL STATE
========================================================== */

function registerLogsState(){

    StateManager.set(

        "logs",

        LogsState

    );

}