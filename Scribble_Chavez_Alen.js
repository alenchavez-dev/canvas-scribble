/**
 * JS for the Scribble Web App
 * Copyright Dan Mazzola and ABOR
 */

"use strict";              // best practice to use this directive

// Global variables and Constants

var canvas;                 // the canvas element
var context;                // the drawing context

var coordinateLabel;        // information div labels
var mouseInOutLabel;        
var mouseUpDownLabel;
var drawColorLabel;
var lineWidthLabel

var insideCanvas = false;   // pointer inside canvas?
var drawingMode = false;    // drawing or moving?
var currX = 0, currY = 0;   // Where the mouse is
var prevX = 0, prevY = 0;   // Where the mouse was

const inactiveCanvasBorder = "2px solid #c3c3c3";
const activeCanvasBorder   = "2px solid #000000";

function initialize() {

    // Initialize our labels
    coordinateLabel    = document.getElementById("coordinatesId");
    mouseInOutLabel    = document.getElementById("mouseInOutId");
    mouseUpDownLabel   = document.getElementById("mouseUpDownId"); 
    drawColorLabel     = document.getElementById("drawColorId"); 
    lineWidthLabel     = document.getElementById("lineWidthId");

    // Get the canvas and set the 2d drawing context
    canvas = document.getElementById('drawingCanvasId');
    context = canvas.getContext('2d');
    context.lineCap = "round"

    // set initial canvas state, drawing color and linewidth
    clearCanvas();
    setColor('black');
    setLineWidth('1');
}

function clearCanvas() {
    if (confirm("Are you sure you want to clear the canvas?")) {
        // The following hard coded values are dependent on the size of canvas
        context.clearRect(0, 0, 500, 500);
        context.fillText("Copyright Dan Mazzola & ABOR", 350, 495);
    }
}

// (1) set the line drawing color (strokeStyle)
function setColor(color) {
    context.strokeStyle = color;
    drawColorLabel.textContent = "Draw Color: " + color;
}

// (2) set the line width
function setLineWidth(width) {
    context.lineWidth = width;
    lineWidthLabel.textContent = "Line Width: " + width;
}

// (3) handle mouse move events
function mouseMoved(event) {
    if (drawingMode && insideCanvas) {
        prevX = currX;
        prevY = currY;
        currX = event.offsetX;
        currY = event.offsetY;
        drawLine();
    }
    coordinateLabel.textContent = "Coordinates: (" + event.offsetX + ", " + event.offsetY + ")";
}

// (4) draw the line when appropriate
function drawLine() {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.stroke();
    context.closePath();
}

// (5) handle the mouse entered event
function mouseEnteredCanvas(event) {
    insideCanvas = true;
    mouseInOutLabel.textContent = "Mouse Status: Inside Canvas";
    canvas.style.border = activeCanvasBorder;
}

// (6) handle the mouse left event
function mouseLeftCanvas(event) {
    insideCanvas = false;
    mouseInOutLabel.textContent = "Mouse Status: Outside Canvas";
    canvas.style.border = inactiveCanvasBorder;
}

// (7) Handle the mouse down event
function startDrawing(event) {
    drawingMode = true;
    mouseUpDownLabel.textContent = "Mouse Status: Drawing";
    currX = event.offsetX;
    currY = event.offsetY;
}

// (8) Handle the mouse up event
function stopDrawing(event) {
    drawingMode = false;
    mouseUpDownLabel.textContent = "Mouse Status: Not Drawing";
}

// (9) Set gradient as the stroke style
function setGradient() {
    var gradient = context.createLinearGradient(0, 0, 500, 0);
    gradient.addColorStop(0, '#1D1160');  // Purple
    gradient.addColorStop(0.5, '#E56020'); // Orange
    gradient.addColorStop(1, '#000000');   // Black
    context.strokeStyle = gradient;
    drawColorLabel.textContent = "Draw Color: Gradient";
}
