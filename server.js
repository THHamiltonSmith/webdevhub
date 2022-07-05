// Main dependencies
const express = require("express");
const app = express();
const server = require("http").Server(app);

// Handle 'sitemap.xml' and 'robots.txt' functionality so crawl bots can access them.
app.get('/robots.txt', function (req, res) {
    res.sendFile(__dirname + '/robots.txt');
});
app.get('/sitemap.xml', function(req, res) {
    res.sendFile(__dirname + '/sitemap.xml');
});

// If the user has a trailing '/' at the end of a URL, remove it and refresh.
app.use((req, res, next) => {
    if (req.path.charAt(req.path.length - 1) === "/" && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        const safepath = req.path.slice(0, -1).replace(/\/+/g, "/");
        res.redirect(301, safepath + query);
    } else {
        next();
    }
});

// Declare ejs, JSON formatting and set static files folder.
app.set("view engine", "ejs");
app.set("json spaces", 2);
app.use(express.static("public"));

// Home
app.get("/", (req, res) => {
    // Render the page with given paramaters.
    res.render("index", {
        title: "Home",
    });
});
app.get("/code-formatter", (req, res) => {
    // Render the page with given paramaters.
    res.render("code-formatter", {
        title: "Code Formatter",
    });
});
app.get("/hex-to-filter", (req, res) => {
    // Render the page with given paramaters.
    res.render("hex-to-filter", {
        title: "Hex to Filter",
    });
});
app.get("/image-converter", (req, res) => {
    // Render the page with given paramaters.
    res.render("image-converter", {
        title: "Image Converter",
    });
});
app.get("/lorem-ipsum-generator", (req, res) => {
    // Render the page with given paramaters.
    res.render("lorem-ipsum-generator", {
        title: "Lorem Ipsum Generator",
    });
});
app.get("/word-counter", (req, res) => {
    // Render the page with given paramaters.
    res.render("word-counter", {
        title: "Word Counter",
    });
});

// Initialise the server on port 3000.
server.listen(3000);
