//Layers-to-spritesheet. Create a spritesheet from a layered PSD.

// Copyright 2019
// September 13, 2019 
// Written by Roxanne Albutt
// http://www.roxannealbutt.org
// e-mail: roxanne.albutt@gmail.com

//==================================== GLOBALS ============================================
var doc = app.activeDocument;
var spriteWidth = doc.width.value;
var spriteHeight = doc.height.value;
var rootFileName = app.activeDocument.name.slice(0, app.activeDocument.name.lastIndexOf('.'));

var PNGSaveFormat = new PNGSaveOptions();
PNGSaveFormat.PNG8 = false;
PNGSaveFormat.transparency = true;

//==================================== MAIN ============================================
// enable double clicking from the
// Macintosh Finder or the Windows Explorer
#target photoshop

// Make Photoshop the frontmost application
app.bringToFront();

// Save the user's layout
var startRulerUnits = app.preferences.rulerUnits;
var startDisplayDialogs = app.displayDialogs;

// Set the units to pixels and set no dialogs
app.preferences.rulerUnits = Units.PIXELS;
app.displayDialogs = DialogModes.NO;

Main();

// Restore the user's preferences
app.preferences.rulerUnits = startRulerUnits;
app.displayDialogs = startDisplayDialogs;

//====
function Main() {
    
    // Duplicate active document so that we are editing the original.
    var newDocument = doc.duplicate(rootFileName + "_spritesheet.psd");
    app.activeDocument = newDocument;
    app.bringToFront();    
    
    var spriteLayers;  
    if (IsLayerSets) { spriteLayers = newDocument.layerSets; } else { spriteLayers = newDocument.layers; }
    
    // Try make the height and width of the spritesheet as close as possible. If the number odd, make the image wider rather than taller.
    var spriteXCount = Math.ceil(Math.sqrt(spriteLayers.length));
    var spriteYCount = Math.floor(Math.sqrt(spriteLayers.length));  
    
    // Resize the new document
    newDocument.resizeCanvas(spriteWidth * spriteXCount , spriteHeight * spriteYCount, AnchorPosition.TOPLEFT);
    
    // Move each sprite to their correct position.
    var i = 0;        
    for (var y = 0; y < spriteYCount; y++) {
        for (var x = 0; x < spriteXCount; x++) {
            spriteLayers[i].translate(x * spriteWidth , y * spriteHeight);
            i++;
        }    
    } 

    // Save spritesheet
    //newDocument.saveAs(new File(rootOutputFolder + "/" + newDocument.name), PNGSaveFormat);  
    
    // Close out the duplicate document and return to original
    //newDocument.close(SaveOptions.DONOTSAVECHANGES);
    //app.activeDocument = doc;    
}

//==================================== FUNCTIONS ============================================


//===================================== HELPERS =============================================

function IsLayerSets() {
    if (doc.layerSets.length > 0 ) { return true; } else { return false; }
}
