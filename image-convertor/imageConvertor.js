const fileInput = document.getElementById("loadfile");
const previewImage = document.getElementById("preview-image");
const previewDefaultText = document.getElementById("preview-text");
let upload = false;
let currImgFormat = "";

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

        reader.addEventListener("load", function(){
            previewImage.setAttribute("src", this.result);
        })


    } else {
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("src", "");
    }
})


const convert = document.getElementById("convert");
const format = document.getElementById("format")
const error = document.getElementById("error")

// convert format
convert.addEventListener("click", function(){
    if (!upload) {
        error.innerHTML = "Upload an image to continue";
        return;
    } else if (format.value == "none") {
        error.innerHTML = "Please select a format";
        return;
    } else if (format.value == currImgFormat) {
        error.innerHTML = "Selected format should not be same as original";
        return;
    } else {
        error.innerHTML = null;
    }
})