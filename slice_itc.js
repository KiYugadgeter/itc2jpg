var body = document.getElementsByTagName("body")[0];
var div = document.createElement("div")
div.id = "rector";
var atag = document.createElement("a");
atag.id = "a";
var image2 = document.getElementById("image");
div.appendChild(atag);
body.appendChild(div);

function sliced(eve) {
    image2.style.display = "block";
    var data = eve.target.result;
    var sliced_data = data.slice(492);
    var b = new Blob([sliced_data], {"type": "image/jpeg"});
    var u = window.URL.createObjectURL(b);
    atag.href = u;
    atag.innerHTML = "Download";
    atag.download = "";
    image2.src = u;
    div.style.display = "block";
}

function dragover(eve) {
    eve.stopPropagation();
    eve.preventDefault();
    eve.dataTransfer.dropEffect = 'copy';
}

function fileselect(eve) {
    eve.stopPropagation();
    eve.preventDefault();
    var fileslist = eve.dataTransfer.files;
    var file = fileslist[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        console.log("onloading file");
        sliced(e);
    }
    var buffer = reader.readAsArrayBuffer(file);
}

function getFile() {
    var fileslist = this.files;
    var file = fileslist[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        console.log("onloading file");
        sliced(e);
    }
    var buffer = reader.readAsArrayBuffer(file);
}

input = document.getElementById("upload");
input.onchange = getFile;
var d = document.getElementById("dropzone");
d.addEventListener("dragover", dragover);
d.addEventListener("drop", fileselect);
