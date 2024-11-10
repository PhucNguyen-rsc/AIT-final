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

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
secret: 'secret',
resave: false,
saveUninitialized: true,
}));
app.use(cors());

const loginMessages = {"PASSWORDS DO NOT MATCH": 'Incorrect password', "USER NOT FOUND": 'User doesn\'t exist'};
const registrationMessages = {"USERNAME ALREADY EXISTS": "Username already exists", "USERNAME PASSWORD TOO SHORT": "Username or password is too short"};

app.get('/', (req, res) => {
res.redirect('/login');
});

app.get('/register', (req, res) => {
res.render('register');
});

app.post('/register', async (req, res) => {
try {
    const newUser = await auth.register(
    sanitize(req.body.username), 
    sanitize(req.body.email), 
    req.body.password
    );
    await auth.startAuthenticatedSession(req, newUser);
    res.redirect('/'); 
} catch(err) {
    console.log(err);
    res.render('register', {message: registrationMessages[err.message] ?? 'Registration error'}); 
}
});
        
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
try {
    const user = await auth.login(
    sanitize(req.body.username), 
    req.body.password
    );
    await auth.startAuthenticatedSession(req, user);
    res.redirect('/courses'); 
} catch(err) {
    console.log("Error message:" , err);
    res.render('login', {message: loginMessages[err.message] ?? 'Login unsuccessful'}); 
}
});

app.get("/courses", (req, res)=>{
    res.send("Courses here!")
})

const items = [{
    name: "A",
    price: 1
},
{
    name: "B",
    price: 2
}]

app.get("/api/items", (req, res) =>{
    res.send(items);
}) 

app.listen(process.env.PORT || 3000);
