import { CREATED, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } from "http-status-codes";
import { Request, Response } from "express";
import { Datastore, party, guest } from "./database";

export function getSingleGuest(req: Request, res: Response): void {
    const guestID = parseInt(req.params.guestID);
    if (guestID) {
        const store = <Datastore>req.app.locals;
        let guest = store.guests.get(guestID);
        if (guest) {
            res.send(guest);
        } else {
            res.status(NOT_FOUND).send();
        }
    } else {
        res.status(BAD_REQUEST).send('ID must be a number');
    }
}

export function getGuestsByParty(req: Request, res: Response): void {
    const guests: guest[] = (<Datastore>req.app.locals).guests.find();
    let specificGuests: guest[] = [];
    guests.forEach(element => {
        if (element.partyID === parseInt(req.params.id)) {
            specificGuests.push(element);
        }
    });
    res.send(specificGuests);
}

export function getGuests(req: Request, res: Response): void {
    res.send((<Datastore>req.app.locals).guests.find());
}

export function getSingleParty(req: Request, res: Response): void {
    const partyID = parseInt(req.params.partyID);
    if (partyID) {
        const store = <Datastore>req.app.locals;
        let party = store.party.get(partyID);
        if (party) {
            res.send(party);
        } else {
            res.status(NOT_FOUND).send();
        }
    } else {
        res.status(BAD_REQUEST).send('ID must be a number');
    }
}

export function getParty(req: Request, res: Response): void {
    res.send((<Datastore>req.app.locals).party.find());
}

export function postRegister(req: Request, res: Response): void {
    if (!req.body.firstName || !req.body.lastName || !req.body.partyID) {
        res.status(BAD_REQUEST).send("Some neccassary fields were empty!");
    } else {
        const data = <Datastore>req.app.locals;
        const count = data.guests.count();
        if (count < 10) {
            const newDoc = data.guests.insert({ partyID: req.body.partyID, firstName: req.body.firstName, lastName: req.body.lastName });
            res.status(CREATED).send(newDoc);
        } else {
            res.status(UNAUTHORIZED).send("Maximum number of guests has already been reached!");
        }
    }
}
