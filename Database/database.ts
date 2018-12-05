import * as loki from "lokijs";

export class Datastore {
    constructor(public db: loki, public guests: loki.Collection<guest>, public party: loki.Collection<party>) { }
}

export function init(): Datastore {
    const db = new loki(__dirname + "/data.db", { autoload: true, autosave: true });

    let guests: loki.Collection<guest> = db.getCollection("guests");
    if (!guests) {
        guests = db.addCollection("guests");
    }
    let party: loki.Collection<party> = db.getCollection("party");
    if (!party) {
        party = db.addCollection("party");
    }
    party.insert({partyID: 1, title: "Grill and Chill", location: "Bad Kreuzen", date: new Date(2019, 6, 12) });
    party.insert({partyID: 2, title: "Sun & Fun", location: "Münzbach", date: new Date(2019, 6, 24) });

    return new Datastore(db, guests, party);
}

export interface guest{
    partyID: number;
    firstName: string;
    lastName: string
}

export interface party{
    partyID: number;
    title: string;
    location: string;
    date: Date;
}