// colour-converter.js

const inputsContainer = document.querySelector(".colour-inputs");

// For each of the list elements that contain an input
for (var i = 0; i < inputsContainer.children.length; i++) {
    const li = inputsContainer.children[i];

    // And an event listener to detect change in the input.
    li.children[1].addEventListener('input', function (evt) {

        // If the HEX length is valid or anohter input is changed, send the colour to the server to convert.
        if (this.id == "hex" && this.value.length == 7 || this.id == "hex" && this.value.length == 4 || this.id != "hex") {
            // prettier-ignore
            fetch("/convert-colour", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({
                        focusedInputValue: this.value,
                        focusedInputType: this.id
                }),
            }).then((res) => res.json()).then((res) => {
                    // HTTP 301 response
                    const types = ["hex", "rgb", "hsl", "hwb"]

                    // Check each type and append any relevent styling.
                    for (var type in types) {
                        if (document.activeElement.id != types[type]) {
                        
                            if (types[type] == "hex") {
                                document.getElementById("hex").value = "#" + res.colourObj[types[type].toString()]
                            }
                            else if (types[type] == "rgb") {
                                document.getElementById("rgb").value = "rgb(" + res.colourObj[types[type].toString()] + ")"
                            }
                            else if (types[type] == "hsl") {
                                document.getElementById("hsl").value = "hsl(" + res.colourObj[types[type].toString()] + ")"
                            }
                            else if (types[type] == "hwb") {
                                document.getElementById("hwb").value = "hwb(" + res.colourObj[types[type].toString()] + ")"
                            }
                        }
                    }       
                    
                    // Update the colour block.
                    const colourBlock = document.querySelector(".colour-block");
                    colourBlock.style.backgroundColor = "#" + res.colourObj.hex
                })
                .catch(function (err) {
                    // console.log(err + " url: " + url);
                });
        } 
    })
}

// Copy text to clipboard
function copyText(btnObj) {
    const text = btnObj.parentNode.children[1].value;
    navigator.clipboard.writeText(text);

    // Displays text `Copied!` for 2 seconds
    const popupText = btnObj.children[1]
    popupText.style.opacity = 1;
    setTimeout(function() {
        popupText.style.opacity = 0
    }, 2000)
}