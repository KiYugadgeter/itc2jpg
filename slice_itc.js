var body = document.getElementsByTagName("body")[0];
var filecounter = 0;
var readerarray = [];

function loadfile(listnum) {
    function nu_sliced(eve) {
        var data = eve.target.result;
        var sliced_data = data.slice(492);
        var b = new Blob([sliced_data], {"type": "image/jpeg"});
        u = window.URL.createObjectURL(b);
        console.log("listnum = " + String(listnum) + ", filecounter = " + String(filecounter) + ", flen = " + String(flen)); 
        console.log("listnum + filecounter - flen = " + String(listnum + filecounter - flen));
        var image_ele = document.getElementById("img" + String(listnum + filecounter - flen));
        var link_ele = document.getElementById("a" + String(listnum + filecounter - flen));
        link_ele.href = u;
        image_ele.src = u;
        image_ele.style.height = "300px";
        image_ele.style.width = "300px";
    }
    return nu_sliced;
}

function setpic(listnum, flist, table) {
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
    pic_link.id = "a" + String(listnum + filecounter);
    var pic = document.createElement("img");
    pic.id = "img" + String(listnum + filecounter);
    pic_link.download = "";
    pic_link.appendChild(pic);
    table.rows[rownum].cells[w].appendChild(pic_link);
    freader.readAsArrayBuffer(flist[listnum]);
    listnum += 1
    if (filecounter + listnum > filecounter + flist.length - 1) {
        filecounter += flist.length; //?
        var base_of_table = document.createElement("div");
        base_of_table.className = "base_of_table";
        base_of_table.style.height = String(300 * table.rows.length + 22) + "px";
        base_of_table.appendChild(table);
        body.appendChild(base_of_table);
        return ""
    }
    else {
        setpic(listnum, flist, table);
    }
}

function createTable(flist) {
    var pic_table = document.createElement("table");
    flen = flist.length;
    uy = Math.ceil(flist.length / 3);
    for (var nu = 0; nu < uy; nu++) {
        var row = pic_table.insertRow(-1);
        for (o = 0; o < 3; o++) {
            row.insertCell(-1);
        }
    }
    readerarray = [];
    for (fa = 0; fa < flist.length; fa++) {
        var r = new FileReader();
        readerarray.push(r);
    }
    setpic(0, flist, pic_table);
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
    createTable(fileslist);
}

function getFile() {
    fileslist = this.files;
    createTable(fileslist);
}

input = document.getElementById("upload");
input.onchange = getFile;
var d = document.getElementById("dropzone");
d.addEventListener("dragover", dragover);
d.addEventListener("drop", fileselect);
