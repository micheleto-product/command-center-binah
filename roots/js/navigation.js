/* ==========================================================
   BINAH COMMAND CENTER
   NAVIGATION MANAGER
========================================================== */

const Navigation = {

    currentModule: "dashboard",

    routes: {

        dashboard: "../dashboard/index.html",

        security: "../security/index.html",

        intelligence: "../intelligence/index.html",

        users: "../users/index.html",

        logs: "../logs/index.html",

        settings: "../settings/index.html"

    },

    titles: {

        dashboard: {

            title: "Dashboard",

            description: "Mission Control initialized successfully."

        },

        security: {

            title: "Security",

            description: "Monitor protection and system integrity."

        },

        intelligence: {

            title: "Intelligence",

            description: "Artificial Intelligence monitoring center."

        },

        users: {

            title: "Users",

            description: "Manage system users and permissions."

        },

        logs: {

            title: "Logs",

            description: "Monitor events, activities and history."

        },

        settings: {

            title: "Settings",

            description: "Configure the Command Center."

        }

},

    go(module){

        const route = this.routes[module];

        if(!route){

            console.error(

                "Unknown module:",

                module

            );

            return;

        }

        this.currentModule = module;

        sessionStorage.setItem(

            "binah-current-module",

            module

        );

        window.location.href = route;

    }

};   // <-- FALTAVA ISTO

/* ==========================================================
   GET CURRENT MODULE
========================================================== */

function getCurrentModule(){

    return Navigation.currentModule;

}

/* ==========================================================
   LOAD CURRENT MODULE
========================================================== */

function loadCurrentModule(){

    const module = sessionStorage.getItem(

        "binah-current-module"

    );

    if(module){

        Navigation.currentModule = module;

    }

}

/* ==========================================================
   RESTORE SIDEBAR
========================================================== */

function restoreSidebar(){

    const button = document.querySelector(

        `[data-module="${Navigation.currentModule}"]`

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

}

/* ==========================================================
   INITIALIZE NAVIGATION
========================================================== */

function initializeNavigation(){

    loadCurrentModule();

    restoreSidebar();

    updateHeader();

}