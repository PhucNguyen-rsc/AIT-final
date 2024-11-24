import './config.mjs';
import './db.mjs';
import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';

import express from 'express';
import session from 'express-session';
import path from 'path';
import url from 'url';
import * as auth from './auth.mjs';
import cors from 'cors';

const app = express();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
secret: 'secret',
resave: false,
saveUninitialized: true,
}));

app.use(cors());

const loginMessages = {"PASSWORDS DO NOT MATCH": 'Incorrect password', "USER NOT FOUND": 'User doesn\'t exist'};
const registrationMessages = {"USERNAME ALREADY EXISTS": "Username already exists", "USERNAME PASSWORD TOO SHORT": "Username or password is too short"};


app.post('/register', async (req, res) => {
try {
    const newUser = await auth.register(
    sanitize(req.body.username), 
    sanitize(req.body.email), 
    req.body.password
    );
    await auth.startAuthenticatedSession(req, newUser);
    res.json({name: req.body.username, courses: req.body.courses, errMessage: null}); //successful
} catch(err) {
    console.log(err);
    res.json({ errMessage: registrationMessages[err.message] ?? 'Register unsuccessful'}); //unsuccessful
}
});

app.post('/login', async (req, res) => {
try {
    const user = await auth.login(
    sanitize(req.body.username), 
    req.body.password
    );
    await auth.startAuthenticatedSession(req, user);
    res.json({ name: req.body.username, courses: req.body.courses, errMessage: null });
} catch(err) {
    console.log("Error message:" , err);
    res.json({errMessage: loginMessages[err.message] ?? 'Login unsuccessful'});
}
});

app.listen(process.env.PORT || 5000);
