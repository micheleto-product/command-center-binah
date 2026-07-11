/* ==========================================================
   BINAH COMMAND CENTER
   SETTINGS MODULE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeSettings

);

/* ==========================================================
   SETTINGS STATE
========================================================== */

const SettingsState = {

    theme: "Dark Mode",

    language: "English",

    security: "Standard",

    updates: "Automatic"

};

/* ==========================================================
   SETTINGS CONFIG
========================================================== */

const SettingsConfig = {

    version: "1.0",

    autoSave: false,

    editable: true

};

/* ==========================================================
   INIT
========================================================== */

function initializeSettings(){

    renderSettings();

    applicationReady();

}

/* ==========================================================
   RENDER SETTINGS
========================================================== */

function renderSettings(){

    updateCard(

        "theme-card",

        SettingsState.theme

    );

    updateCard(

        "language-card",

        SettingsState.language

    );

    updateCard(

        "security-card",

        SettingsState.security

    );

    updateCard(

        "updates-card",

        SettingsState.updates

    );

}

/* ==========================================================
   UPDATE CARD
========================================================== */

function updateCard(id,value){

    const card = document.getElementById(id);

    if(!card){

        return;

    }

    const field = card.querySelector("p");

    if(field){

        field.innerText = value;

    }

}

/* ==========================================================
   UPDATE SETTING
========================================================== */

function updateSetting(key,value){

    if(!(key in SettingsState)){

        return;

    }

    SettingsState[key] = value;

    renderSettings();

}

/* ==========================================================
   RESET SETTINGS
========================================================== */

function resetSettings(){

    SettingsState.theme = "Dark Mode";

    SettingsState.language = "English";

    SettingsState.security = "Standard";

    SettingsState.updates = "Automatic";

    renderSettings();

}

/* ==========================================================
   SAVE SETTINGS
========================================================== */

function saveSettings(){

    console.log(

        "Settings Saved"

    );

}

/* ==========================================================
   APPLICATION READY
========================================================== */

function applicationReady(){

    console.table(

        SettingsState

    );

    console.table(

        SettingsConfig

    );

    console.log(

        "Settings Module Ready"

    );

}

/* ==========================================================
   SAMPLE TESTS
========================================================== */

// updateSetting(
//     "theme",
//     "Light Mode"
// );

// saveSettings();

// resetSettings();