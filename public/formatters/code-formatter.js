// code-formatter.js

// References
const codeEditorObj = document.getElementById("code-editor");
const formattedCodeObj = document.getElementById("code-formatted");
const formatSlector = document.getElementById("format-selector");
const popupText = document.getElementById("popup-text");

// Get the code editors and the active code type.
var codeEditor;
var codeFormatted;
var activeCodeType = "javascript";

// On page load initialise the text areas.
window.addEventListener("load", () => {
    // Check if the URL contains a '#' (means that they clicked on a specific language on home page)
    // Then set the modes of the code editors and language to be that language.
    if (window.location.href.includes("#")) {
        const lastHash = window.location.href.lastIndexOf("#");
        const result = window.location.href.substring(lastHash + 1);

        formatSlector.value = result;
        activeCodeType = result;
    }

    const newMode = "text/" + activeCodeType;

    // Initialise text areas.
    codeEditor = CodeMirror.fromTextArea(codeEditorObj, {
        mode: newMode,
        theme: "lesser-dark",
        scrollbarStyle: "simple",
        lineNumbers: true,
    });
    codeFormatted = CodeMirror.fromTextArea(formattedCodeObj, {
        mode: newMode,
        theme: "lesser-dark",
        scrollbarStyle: "simple",
        lineNumbers: true,
    });
});

// Format the code and append it to the textbox.
function formatCode() {
    // Get the code to format
    const toFormatCode = codeEditor.getDoc().getValue();
    var formattedCode = "";

    // Format the code depending on the language and set it to the formatted box.
    if (activeCodeType == "html") {
        formattedCode = html_beautify(toFormatCode);
    } else if (activeCodeType == "css") {
        formattedCode = css_beautify(toFormatCode);
    } else if (activeCodeType == "javascript") {
        formattedCode = js_beautify(toFormatCode);
    }

    // Set the formatted value to the formatted code.
    codeFormatted.getDoc().setValue(formattedCode);
}

// Change the format modes of the code.
function changeModes() {
    const newMode = formatSlector.value;

    // Set the format type of the code editors to the new mode.
    codeEditor.setOption("mode", "text/" + newMode);
    codeFormatted.setOption("mode", "text/" + newMode);

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