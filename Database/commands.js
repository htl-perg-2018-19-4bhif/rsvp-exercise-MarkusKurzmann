"use strict";
exports.__esModule = true;
var http_status_codes_1 = require("http-status-codes");
function getGuests(req, res) {
    res.send(req.app.locals.guests.find());
}
exports.getGuests = getGuests;
function getParty(req, res) {
    res.send(req.app.locals.party.find());
}
exports.getParty = getParty;
function postRegister(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.partyID) {
        res.status(http_status_codes_1.BAD_REQUEST).send("Some neccassary fields were empty!");
    }
    else {
        var data = req.app.locals;
        var count = data.guests.count();
        if (count < 10) {
            var newDoc = data.guests.insert({ partyID: req.body.partyID, firstName: req.body.firstName, lastName: req.body.lastName });
            console.log(req.body.partyID);
            res.status(http_status_codes_1.CREATED).send(newDoc);
        }
        else {
            res.status(http_status_codes_1.UNAUTHORIZED).send("Maximum number of guests has already been reached!");
        }
    }
}
exports.postRegister = postRegister;
