let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width")
let eraserWidthElem = document.querySelector(".eraser-width")
let download = document.querySelector(".download")
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let penColor = "red";
let eraserColor = "  rgb(222, 202, 202)"
let pencilWidth = pencilWidthElem.value
let eraserWidth = eraserWidthElem.value

let undoRedoTracker = [];   // Data
let track = 0;  // Represent which action from tracker


let mouseDown = false;

//  API 
let tool = canvas.getContext("2d");

tool.strockStyle = penColor;
tool.lineWidth = pencilWidth;

// mouseDown -> start new path, mouseMove -> path fill (graph)
canvas.addEventListener("mousedown", (e) =>{
    mouseDown = true;
    beginPath({
        x: e.clientX,
        y: e.clientY
    })
    // let data = {
    //     x: e.clientX,
    //     y: e.clientY
    // }
    // socket.emit("beginPath", data)
    
})
canvas.addEventListener("mousemove", (e) =>{
    if(mouseDown) drawStroke({
        // let data  = {
            x: e.clientX,
            y: e.clientY,
            color: eraserFlag ? eraserColor : penColor,
            wdth: eraserFlag ? eraserWidth : pencilWidth
        // }
        // socket.emit("drawStroke", data)
    })
  
})

canvas.addEventListener("mouseup", (e) =>{
    mouseDown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;
})

undo.addEventListener("click", (e) =>{
    if(track > 0) track--;
    // track action 
   
    let trackObj = {
        trackValue: track,
        undoRedoTracker
    }
    // socket.emit("redoUndo", data);
})
redo.addEventListener("click", (e) =>{
    if(track < undoRedoTracker.length-1) track++;
    // track action
    let trackObj
     = {
        trackValue: track,
        undoRedoTracker
    }
    // socket.emit("redoUndo", data);
    undoRedoCanvas(trackObj)
})

function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    let url = undoRedoTracker[track];
    let img = new Image(); // new image reference element
    img.src =  url; 
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();

}

pencilColor.forEach((colorElem) =>{
    colorElem.addEventListener("click" ,(e) =>{
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    })
})

pencilWidthElem.addEventListener("change", (e) =>{
    penWidth = pencilWidthElem.value
    tool.lineWidth = penWidth
})

eraserWidthElem.addEventListener("change", (e) =>{
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = penWidth;
})

eraser.addEventListener("eraser", (e) =>{
    if(eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }
    else{
        tool.strokeStyle = penColor;
        tool.lineWidth = lineWidth;
    }
})

download.addEventListener('click', (e) =>{

    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})

// socket.on("beginPath",  (data)=>{
//     beginPath(data)
// })

// socket.on("drawStroke", (data) => {
//     drawStroke(data);
// })

// socket.on("reduUndo", (data) =>{
//     undoRedoCanvas(data )
// })