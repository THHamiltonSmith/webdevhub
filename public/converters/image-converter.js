const fileInput = document.getElementById("loadfile");
const previewImage = document.getElementById("preview-image");
const previewDefaultText = document.getElementById("preview-text");
let currImgFormat = "";
let upload = false;
let conversion = false;

// preview Image
fileInput.addEventListener("change", function(){
    const file = this.files[0];
    currImgFormat = file.type.slice(6);

    if (file) {
        upload = true;
        const reader = new FileReader();

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        reader.readAsDataURL(file);

        // when load file is completed
        reader.addEventListener("load", function(){
            previewImage.setAttribute("src", this.result);
        })


    } else {
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("src", "");
    }
})


const submit = document.getElementById("submit");
const format = document.getElementById("format");
const error = document.getElementById("error");
const errorText = document.getElementById("error-text");
const success = document.getElementById("success");
const successText = document.getElementById("success-text");
const download = document.getElementById("download");

// convert format
submit.addEventListener("click", function(){

    // file not uploaded
    if (!upload) {
        errorText.innerHTML = "Upload an image to continue";
        error.style.display = "flex";
        success.style.display = null;
        download.style.display = null;
        return;

    // no format selected
    } else if (format.value == "none") {
        errorText.innerHTML = "Please select a format";
        error.style.display = "flex";
        success.style.display = null;
        download.style.display = null;
        return;

    // selected same format as uploaded image
    } else if (format.value == currImgFormat) {
        errorText.innerHTML = "Selected format should not be same as original";
        error.style.display = "flex";
        success.style.display = null;
        download.style.display = null;
        return;

    } else {
        errorText.innerHTML = null;
        error.style.display = null;

        // set flag after conversion
        conversion = true;

        // after successful conversion
        if (conversion) {
            successText.innerHTML = `Successfully converted to .${format.value}`;
            success.style.display = "flex";
            download.style.display = "block";
            download.setAttribute("href", "dataURL of converted image here");
        }
    }
})