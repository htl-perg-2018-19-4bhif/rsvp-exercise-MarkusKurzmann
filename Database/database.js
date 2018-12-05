"use strict";
exports.__esModule = true;
var loki = require("lokijs");
var Datastore = /** @class */ (function () {
    function Datastore(db, guests, party) {
        this.db = db;
        this.guests = guests;
        this.party = party;
    }
    return Datastore;
}());
exports.Datastore = Datastore;
function init() {
    var db = new loki(__dirname + "/data.db", { autoload: true, autosave: true });
    var guests = db.getCollection("guests");
    if (!guests) {
        guests = db.addCollection("guests");
    }
    var party = db.getCollection("party");
    if (!party) {
        party = db.addCollection("party");
    }
    party.insert({ partyID: 1, title: "Grill and Chill", location: "Bad Kreuzen", date: new Date(2019, 6, 12) });
    party.insert({ partyID: 2, title: "Sun & Fun", location: "Münzbach", date: new Date(2019, 6, 24) });
    return new Datastore(db, guests, party);
}
exports.init = init;
