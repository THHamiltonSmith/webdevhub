// wordCounter.js

// References
const counterInput = document.getElementById("counter-input");
const wordCount = document.getElementsByClassName("word-count");
const wordCountSmall = document.getElementById("word-count-small");
const charCount = document.getElementsByClassName("char-count");
const charCountSmall = document.getElementById("char-count-small");
const sentanceCountObj = document.getElementById("sentance-count");
const paragraphCountObj = document.getElementById("paragraph-count");
const readingTimeObj = document.getElementById("reading-time");
const speakingTimeObj = document.getElementById("speaking-time");

// Variables to store the reading and speaking time.
var readingTimeSeconds;
var speakingTimeSeconds;

// When a key is pressed in the word counter input, run the relevent functions to process the new info.
counterInput.addEventListener("keyup", function (e) {
    wordCounter(e.target.value);
    charCountUpdate(e.target.value);
    readingTime();
    speakingTime();
});

// Get word count of the input.
function wordCounter(text) {
    var text = counterInput.value.split(" ");
    var count = 0;

    // For every individual word/string in the text area, increase the word count.
    for (var i = 0; i < text.length; i++) {
        if (text[i] !== " " && isWord(text[i])) {
            count++;
        }
    }

    // Display the correct grammer for no. of words.
    for (var i = 0; i < wordCount.length; i++) {
        if (count > 1 || count == 0) {
            wordCount[i].innerText = count + " words";
        } else {
            wordCount[i].innerText = count + " word";
        }
    }
    // Set the small word count for the details box
    wordCountSmall.innerText = count;

    // Set the sentance and paragraph count
    sentanceCountObj.innerText = counterInput.value.split(/[.?!]\s/).length;
    paragraphCountObj.innerText = counterInput.value.replace(/\n$/gm, "").split(/\n/).length;

    // Reading time on average is 4.6 words per second, Speaking time is 3 words per second.
    readingTimeSeconds = count / 4.6;
    speakingTimeSeconds = count / 3;
}

// Check if text entered is actually a word.
function isWord(str) {
    var alphaNumericFound = false;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        // prettier-ignore
        if ((code > 47 && code < 58) ||     // Numeric (0-9)
            (code > 64 && code < 91) ||     // Upper alpha (A-Z)
            (code > 96 && code < 123)) {    // Lower alpha (a-z)

                alphaNumericFound = true;
                return alphaNumericFound;
        }
    }
    return alphaNumericFound;
}

// Get the character count of the word counter input box.
function charCountUpdate(str) {
    var count = str.length;

    // Display the correct grammer for no. of characters.
    for (var i = 0; i < wordCount.length; i++) {
        if (count > 1 || count == 0) {
            charCount[i].innerText = count + " characters";
        } else {
            charCount[i].innerText = count + " character";
        }
    }
    charCountSmall.innerText = count;
}

// Get the time taken to read text by dividing the words by the number of words readable per minute.
function readingTime() {
    //
    // Handle adding the seconds, minutes and hours prefixes depending on how long the time is.
    if (readingTimeSeconds < 60) {
        readingTimeObj.innerText = Math.round(readingTimeSeconds) + " sec";
    } else if (readingTimeSeconds > 60) {
        if (readingTimeSeconds > 3600) {
            var hours = Math.floor(readingTimeSeconds / 3600);
            var minutes = Math.round((readingTimeSeconds - hours * 3600) / 60);

            readingTimeObj.innerText = hours + " hrs " + minutes + " mins";
        } else {
            var minutes = Math.floor(readingTimeSeconds / 60);
            var seconds = Math.round(readingTimeSeconds - minutes * 60);

            readingTimeObj.innerText = minutes + " mins " + seconds + " sec";
        }
    }
}

// Get the time taken to speak text by dividing the words by the number of words speakable per minute.
function speakingTime() {
    //
    // Handle adding the seconds, minutes and hours prefixes depending on how long the time is.
    if (speakingTimeSeconds < 60) {
        speakingTimeObj.innerText = Math.round(speakingTimeSeconds) + " sec";
    } else if (speakingTimeSeconds > 60) {
        if (speakingTimeSeconds > 3600) {
            var hours = Math.floor(speakingTimeSeconds / 3600);
            var minutes = Math.round((speakingTimeSeconds - hours * 3600) / 60);

            speakingTimeObj.innerText = hours + " hrs " + minutes + " mins";
        } else {
            var minutes = Math.floor(speakingTimeSeconds / 60);
            var seconds = Math.round(speakingTimeSeconds - minutes * 60);

            speakingTimeObj.innerText = minutes + " mins " + seconds + " sec";
        }
    }
}
