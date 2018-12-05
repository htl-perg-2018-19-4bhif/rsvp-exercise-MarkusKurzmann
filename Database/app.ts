import * as loki from 'lokijs';
import * as cors from 'cors';
import * as express from 'express';
import * as basic from 'express-basic-auth';
import { init } from "./database";
import { getParty, getGuests, postRegister, getSingleParty, getSingleGuest, getGuestsByParty } from "./commands";
import {CREATED, BAD_REQUEST, UNAUTHORIZED} from 'http-status-codes';

const app = express();
app.use(express.json());
app.use(cors());
app.locals = init();

const adminFilter = basic({ users: { admin: 'P@ssw0rd!' } });

// Add routes
app.get("/parties", getParty);
app.get("/parties/:partyID",getSingleParty);
app.get("/guests", adminFilter, getGuests);
app.get("/guests/:guestID", getSingleGuest);
app.get("/guestsAtParty/:id", getGuestsByParty);
app.post("/register", postRegister);



app.listen(8080, () => console.log('API is listening'));
