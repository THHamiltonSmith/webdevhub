// server.js
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

// Main dependencies
const express = require("express");
const app = express();
const server = require("http").Server(app);
const convert = require("xml-js");

// Handle 'sitemap.xml' and 'robots.txt' functionality so crawl bots can access them.
app.get("/robots.txt", function (req, res) {
    res.sendFile(__dirname + "/robots.txt");
});
app.get("/sitemap.xml", function (req, res) {
    res.sendFile(__dirname + "/sitemap.xml");
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.get("/json-xml-converter", (req, res) => {
    // Render the page with given paramaters.
    res.render("json-xml-converter", {
        title: "Json to XML Converter",
    });
});
app.post("/convert-json-data", (req, res) => {
    var result = "";
    const conversionType = req.body.conversionType;
    const toConvertCode = req.body.toConvertCode;

    // Remove the "_text" key that the 'xml2json' function creates
    var removeJsonTextAttribute = function (value, parentElement) {
        try {
            var keyNo = Object.keys(parentElement._parent).length;
            var keyName = Object.keys(parentElement._parent)[keyNo - 1];
            parentElement._parent[keyName] = nativeType(value);
        } catch (e) {}
    };

    // Check for native type.
    function nativeType(value) {
        var nValue = Number(value);
        if (!isNaN(nValue)) {
            return nValue;
        }
        var bValue = value.toLowerCase();
        if (bValue === "true") {
            return true;
        } else if (bValue === "false") {
            return false;
        }
        return value;
    }

    // Check for the conversion type and convert the correct code.
    if (conversionType == "javascript") {
        result = convert.xml2json(toConvertCode, { compact: true, ignoreComment: true, textFn: removeJsonTextAttribute, spaces: 4 });
    } else if (conversionType == "xml") {
        result = convert.json2xml(toConvertCode, { compact: true, ignoreComment: true, spaces: 4 });
    }

    // Send the converted code back to the client.
    res.status(200).json({ result: result });
});

// Initialise the server on port 3000.
const PORT = process.env.PORT || 3000;
server.listen(PORT);
