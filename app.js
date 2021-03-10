const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 5000;

// Set routing for views 
app.set("views", path.join(__dirname, "views"));

// Using HBS engine to render views
app.set("view engine", "hbs");

// Set public as static directory
app.use(express.static(path.join(__dirname, "public")));

// Use index.js as our index/primary view
app.use("/", require("./routes/index"));

// Listen on variable port (set above)
// Print in terminal console where the app is running
app.listen(port, () => {
    console.log(`app is running on ${port}`);
})