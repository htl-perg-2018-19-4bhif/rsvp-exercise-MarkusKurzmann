import { CREATED, BAD_REQUEST, UNAUTHORIZED } from "http-status-codes";
import { Request, Response } from "express";
import { Datastore } from "./database";

export function getGuests(req: Request, res: Response): void {
    res.send((<Datastore>req.app.locals).guests.find());
}

export function getParty(req: Request, res: Response): void {
    res.send((<Datastore>req.app.locals).party.find());
}

export function postRegister(req: Request, res: Response): void {
    if (!req.body.firstName || !req.body.lastName) {
        res.status(BAD_REQUEST).send("Some neccassary fields were empty!");
    } else {
        const data = <Datastore>req.app.locals;
        const count = data.guests.count();
        if (count < 10) {
            const newDoc = data.guests.insert({ firstName: req.body.firstName, lastName: req.body.lastName });
            res.status(CREATED).send(newDoc);
        } else {
            res.status(UNAUTHORIZED).send("Maximum number of guests has already been reached!");
        }
    }
}
