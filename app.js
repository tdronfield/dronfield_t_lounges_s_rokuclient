const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(path.join(__dirname, './views/templates'));
hbs.partials = hbs.templates; // pre-process: this makes Vue work when working with hbs partials


const port = process.env.PORT || 5000;

// Tell HBS where our views content lives,
// Like how we tell routes where to find index
app.set("views", path.join(__dirname, "views"));
// Use the hbs engine to render everything in views
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})