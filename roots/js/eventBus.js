/* ==========================================================
   BINAH COMMAND CENTER
   EVENT BUS
========================================================== */

const EventBus = {

    listeners: {}

};

/* ==========================================================
   SUBSCRIBE
========================================================== */

EventBus.subscribe = function(event, callback){

    if(!this.listeners[event]){

        this.listeners[event] = [];

    }

    this.listeners[event].push(callback);

};

/* ==========================================================
   PUBLISH
========================================================== */

EventBus.publish = function(event, payload = {}){

    const callbacks = this.listeners[event];

    if(!callbacks){

        return;

    }

    callbacks.forEach(callback=>{

        callback(payload);

    });

};

/* ==========================================================
   CLEAR
========================================================== */

EventBus.clear = function(){

    this.listeners = {};

};