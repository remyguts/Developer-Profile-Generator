'use strict';


var PDFDocument, doc;
var fs = require('fs');
PDFDocument = require('pdfkit');
doc = new PDFDocument;
doc.pipe(fs.createWriteStream('output.pdf'));
// PDF Creation logic goes here
doc.end();

//Set a title and pass the X and Y coordinates
doc.fontSize(15).text('Wally Gator !', 50, 50);
// Set the paragraph width and align direction
doc.text('Wally Gator is a swinging alligator in the swamp. He\'s the greatest percolator when he really starts to romp. There has never been a greater operator in the swamp. See ya later, Wally Gator.', {
    width: 410,
    align: 'left'
});




