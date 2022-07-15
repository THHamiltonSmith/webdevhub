// json-xml-converter.js

// References
const codeEditorObj = document.getElementById("code-editor");
const formattedCodeObj = document.getElementById("code-formatted");
const formatSlector = document.getElementById("format-selector");
const popupText = document.getElementById("popup-text");

// Get the code editors and the active code type.
var codeEditor;
var codeFormatted;
var activeCodeType = "xml";

// On page load initialise the text areas.
window.addEventListener("load", () => {

    // Initialise text areas.
    codeEditor = CodeMirror.fromTextArea(codeEditorObj, {
        mode: "text/javascript",
        theme: "lesser-dark",
        scrollbarStyle: "simple",
        lineNumbers: true,
    });
    codeFormatted = CodeMirror.fromTextArea(formattedCodeObj, {
        mode: "text/xml",
        theme: "lesser-dark",
        scrollbarStyle: "simple",
        lineNumbers: true,
    });
});

// Format the code and append it to the textbox.
function convertData() {
    // Get the code to format
    const toConvertCode = codeEditor.getDoc().getValue();

    // prettier-ignore
    fetch("/convert-json-data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify({
                toConvertCode: toConvertCode,
                conversionType: activeCodeType,
        }),
    }).then((res) => res.json()).then((res) => {
            // HTTP 301 response
            // If the referral code exists, reset the page, if node, show an error
            document.getElementById("error-message-container").style.display = "none";
            codeFormatted.getDoc().setValue(res.result);
        })
        .catch(function (err) {
            document.getElementById("error-message-container").style.display = "block";
            // console.log(err + " url: " + url);
        });
}

// Change the format modes of the code inputs when a different convert type is selected.
function changeModes() {
    const newMode = formatSlector.value;

    // Depending on what conversion type was selected, change the format type of the code editors.
    if (newMode == "javascript") {
        codeEditor.setOption("mode", "text/xml");
        codeFormatted.setOption("mode", "text/javascript");

        document.querySelector(".code-formatter-header").children[0].innerHTML = "XML";
        document.querySelector(".code-formatter-header").children[1].innerHTML = "JSON";
    } else if (newMode == "xml") {
        codeEditor.setOption("mode", "text/javascript");
        codeFormatted.setOption("mode", "text/xml");

        document.querySelector(".code-formatter-header").children[0].innerHTML = "JSON";
        document.querySelector(".code-formatter-header").children[1].innerHTML = "XML";
    }

    // Set the active code type.
    activeCodeType = newMode;
}

// Copy text to clipboard
function copyText() {
    const text = codeFormatted.getDoc().getValue();
    navigator.clipboard.writeText(text);

    // Displays text `Copied!` for 2 seconds
    popupText.style.opacity = 1;
    setTimeout(function() {
        popupText.style.opacity = 0
    }, 2000)
}