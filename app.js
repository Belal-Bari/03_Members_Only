require('dotenv').config();
const express = require('express');
const path = require('node:path');
const blogRouter = require('./routes/blogRouter')
const { passport, session } = require('./db/auth');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: 'bats', resave: false, saveUninitialized: false}));
app.use(passport.session());

app.use('/', blogRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})