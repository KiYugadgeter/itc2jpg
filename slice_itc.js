var body = document.getElementsByTagName("body")[0];
var div = document.createElement("div")
div.id = "rector";
var atag = document.createElement("a");
atag.id = "a";
var readerarray = [];
var image2 = document.getElementById("image");
var filereader = new FileReader();

function loadfile(listnum) {
    function nu_sliced(eve) {
        var data = eve.target.result;
        var sliced_data = data.slice(492);
        var b = new Blob([sliced_data], {"type": "image/jpeg"});
        u = window.URL.createObjectURL(b);
        console.log("listnum", listnum);
        var image_ele = document.getElementById("img" + String(listnum));
        var link_ele = document.getElementById("a" + String(listnum));
        link_ele.href = u;
        image_ele.src = u;
        image_ele.style.height = "300px";
        image_ele.style.width = "300px";
        console.log("finished");
        //div.style.display = "block";
    }
    return nu_sliced;
}


function setpic(listnum, flist) {
    var freader = readerarray[listnum];
    freader.onload = loadfile(listnum);
    var elenum = listnum + 1;
    var rownum = Math.ceil(elenum / 3);
    var indexnum = Math.floor(listnum / 3);
    var s = indexnum * 3;
    var w = elenum - s;
    rownum -= 1;
    w -= 1;
    var pic_link = document.createElement("a");
    pic_link.id = "a" + String(listnum);
    var pic = document.createElement("img");
    pic.id = "img" + String(listnum);
    pic_link.download = "";
    pic_link.appendChild(pic);
    console.log(rownum, w);
    table.rows[rownum].cells[w].appendChild(pic_link);
    freader.readAsArrayBuffer(flist[listnum]);
    listnum += 1
    if (listnum > flist.length - 1) {
        body.appendChild(table);
        return ""
    }
    else {
        console.log(listnum);
        setpic(listnum, flist);
    }
}

function createTable(flist) {
    table = document.createElement("table");
    flen = flist.length;
    uy = Math.ceil(flist.length / 3);
    for (var nu = 0; nu < uy; nu++) {
        row = table.insertRow(-1);
        for (o = 0; o < 3; o++) {
            row.insertCell(-1);
        }
    }

    for (fa = 0; fa < flist.length; fa++) {
        var r = new FileReader();
        readerarray.push(r);
    }
    setpic(0, flist);
}


function sliced(eve) {
    image2.style.display = "block";
    var data = eve.target.result;
    var sliced_data = data.slice(492);
    var b = new Blob([sliced_data], {"type": "image/jpeg"});
    u = window.URL.createObjectURL(b);
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
    fileslist = eve.dataTransfer.files;
    if (fileslist.length === 1) {
        var file = fileslist[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            sliced(e);
        }
        var buffer = reader.readAsArrayBuffer(file);
    }
    else {
        createTable(fileslist);
    }
}

function getFile() {
    fileslist = this.files;
    if (fileslist.length === 1) {
        var file = fileslist[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            sliced(e);
        }
        var buffer = reader.readAsArrayBuffer(file);
    }
    else {
        createTable(fileslist);
    }
}

input = document.getElementById("upload");
input.onchange = getFile;
var d = document.getElementById("dropzone");
d.addEventListener("dragover", dragover);
d.addEventListener("drop", fileselect);
div.appendChild(atag);
body.appendChild(div);
