const express = require('express');
const router = express.Router();

// This is where we add middleware
const {createProxyMiddleware } = require('http-proxy-middleware');

router.use("/api", createProxyMiddleware({
    target: "http://localhost:5050",
    headers: {
        accept: "application/json, application/x-www-form-urlencoded"
    },
    changeOrigin: true
}))

router.use("/ums", createProxyMiddleware({
    target: "http://localhost:5050",
    headers: {
        accept: "application/json, application/x-www-form-urlencoded"
    },
    changeOrigin: true
}))


router.get("/", (req, res) => {
    res.render("index", { message: "Hello from handlebars!"})
})

// router.get("/portfolio", (req, res) => {
//     res.render("artwork", { anothermessage: "You're on the portfolio page"});
// })

// other routes you might use
// this function means: 
// if no routes are matched, this will trigger
router.use((req, res) => {
    res.status(404);
    // res.send("Page doesn't exist");
    res.render("error", {
        layout: "errorLayout.hbs", errormessage: `You Lost Your Way! "${req.url}" doesn't exist.`
    });
})

module.exports = router;