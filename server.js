// server.js
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Main dependencies
const express = require("express");
const app = express();
const server = require("http").Server(app);
const convert = require("xml-js");
const colourConvert = require("color-convert");
const bodyparser = require("body-parser");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { NONAME } = require("dns");

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

// Use body parser
app.use(bodyparser.urlencoded({ extended: true }));
  
// Define storage as buffer for multer image uploads
const storage = multer.memoryStorage();
const upload = multer({storage: storage})

// Home
app.get("/", (req, res) => {
    // Render the page with given paramaters.
    res.render("index", {
        title: "Home",
    });
})
app.get("/code-formatter", (req, res) => {
  // Render the page with given paramaters.
  res.render("formatters/code-formatter", {
    title: "Code Formatter",
  });
});
app.get("/hex-to-filter", (req, res) => {
  // Render the page with given paramaters.
  res.render("converters/hex-to-filter", {
    title: "Hex to Filter",
  });
});
app.get("/image-converter", (req, res) => {
  // Render the page with given paramaters.
  res.render("converters/image-converter", {
    title: "Image Converter",
  });
});
app.post("/image-converter/upload", upload.single('image'), (req, res) => {
    const dir = "public/uploads"

    // deletes the previous converted files
    fs.readdir(dir, (err, files) => {
        if (err) console.error(err);
        
        for (const file of files) {
            fs.unlink(path.join(dir, file), err => {
                if (err) console.error(err);
            })
        }
    })

    // verfies that image is uploaded, format is not none and selected format is not same as image
    const valid = req.file && !(req.body.format === "none") && !(req.body.format === req.file.mimetype.slice(6))

    // if all above requirements are satisfied, image is converted and saved to public/uploads
    if (valid) {
        (async ()=> {
            try {
                const {data, info} = await sharp(req.file.buffer)
                .toFile("public/uploads/converted."+req.body.format, (err, info) => {
                    // console.log(req.body.format, info)
                });
            } catch(err) {
                console.error(err);
            }
        })()
    }   
})

// downloads the converted image
app.get("/image-converter/download", (req, res) => {
    const dir = "public/uploads"
    fs.readdir(dir, (err, files) => {
        if (err) console.error(err);
        const img = files[0];
        res.download(`${__dirname}/public/uploads/`+img);
    })
})
app.get("/lorem-ipsum-generator", (req, res) => {
  // Render the page with given paramaters.
  res.render("text/lorem-ipsum-generator", {
    title: "Lorem Ipsum Generator",
  });
});
app.get("/word-counter", (req, res) => {
  // Render the page with given paramaters.
  res.render("text/word-counter", {
    title: "Word Counter",
  });
});
app.get("/colour-converter", (req, res) => {
  // Render the page with given paramaters.
  res.render("converters/colour-converter", {
    title: "Colour Converter",
  });
});
app.get("/color-converter", (req, res) => {
  // Render the page with given paramaters.
  res.redirect("/colour-converter");
});
app.get("/json-xml-converter", (req, res) => {
  // Render the page with given paramaters.
  res.render("converters/json-xml-converter", {
    title: "Json to XML Converter",
  });
});
app.get("/epoch-time-converter", (req, res) => {
  // Render the page with given paramaters.
  res.render("converters/epoch-time-converter", {
    title: "Epoch to Standard Date Time Converter",
  });
});

/* POST Requests */
app.post("/convert-colour", (req, res) => {
  // Get the colour and the input value, minus any non numbers.
  var colour = "";
  const inputValue = req.body.focusedInputValue.replace(/[^\d,-]/g, "");

  // Depending on the colour type, convert it to hex to use later.
  if (req.body.focusedInputType == "hex") {
    colour = req.body.focusedInputValue.substring(1);
  } else if (req.body.focusedInputType == "rgb") {
    const splitArray = inputValue.split(",");
    console.log(splitArray);
    colour = colourConvert.rgb.hex(
      parseInt(splitArray[0]),
      parseInt(splitArray[1]),
      parseInt(splitArray[2])
    );
  } else if (req.body.focusedInputType == "hsl") {
    const splitArray = inputValue.split(",");
    colour = colourConvert.hsl.hex(
      parseInt(splitArray[0]),
      parseInt(splitArray[1]),
      parseInt(splitArray[2])
    );
  } else if (req.body.focusedInputType == "hwb") {
    const splitArray = inputValue.split(",");
    colour = colourConvert.hwb.hex(
      parseInt(splitArray[0]),
      parseInt(splitArray[1]),
      parseInt(splitArray[2])
    );
  }

  // Put all of the converted colours in an object.
  const colourObj = {};
  colourObj.hex = colour;
  colourObj.rgb = colourConvert.hex.rgb(colour);
  colourObj.hsl = colourConvert.hex.hsl(colour);
  colourObj.hwb = colourConvert.hex.hwb(colour);

  // Send the converted colours back to the client.
  res.status(200).json({ colourObj: colourObj });
});
app.post("/convert-json-data", (req, res) => {
  // Get the conversion type and code, while initialisng the result
  const conversionType = req.body.conversionType;
  const toConvertCode = req.body.toConvertCode;
  var result = "";

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
    result = convert.xml2json(toConvertCode, {
      compact: true,
      ignoreComment: true,
      textFn: removeJsonTextAttribute,
      spaces: 4,
    });
  } else if (conversionType == "xml") {
    result = convert.json2xml(toConvertCode, {
      compact: true,
      ignoreComment: true,
      spaces: 4,
    });
  }

  // Send the converted code back to the client.
  res.status(200).json({ result: result });
});

// Initialise the server on port 3000.
const PORT = process.env.PORT || 3000;
server.listen(PORT);
