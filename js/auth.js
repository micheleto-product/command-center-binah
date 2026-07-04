/* ==========================================================
   BINAH COMMAND CENTER
   AUTHENTICATION ENGINE
========================================================== */

const Authentication = {

    SESSION_KEY: "binah-session",

    validate(username, password) {

        username = username.trim();
        password = password.trim();

        if (!username) {

            return {
                success: false,
                message: "Username is required."
            };

        }

        if (!password) {

            return {
                success: false,
                message: "Password is required."
            };

        }

        return {

            success: true,
            message: "Authentication successful."

        };

    },

    login(username) {

        const session = {

            username,
            loginTime: new Date().toISOString(),
            authenticated: true

        };

        sessionStorage.setItem(

            this.SESSION_KEY,

            JSON.stringify(session)

        );

        return session;

    },

    logout() {

        sessionStorage.removeItem(

            this.SESSION_KEY

        );

    },

    getSession() {

        const session = sessionStorage.getItem(

            this.SESSION_KEY

        );

        if (!session) {

            return null;

        }

        return JSON.parse(session);

    },

    isAuthenticated() {

        return this.getSession() !== null;

    }

};