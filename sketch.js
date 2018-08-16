var img;


function preload() {
    img = loadImage("test.jpg");
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    img.resize(0, windowHeight);
    img.loadPixels();
    if (img.pixels.length > 0) {
        var pixelValueWidth = pixelDensity() * img.width * 4;
        for (var imgHeightIndex = 0; imgHeightIndex < img.height; imgHeightIndex += 16) {
            for (var pixelValueWidthIndex = 0; pixelValueWidthIndex < pixelValueWidth; pixelValueWidthIndex += 64) {
                var x = pixelValueWidthIndex / 4;
                var y = imgHeightIndex;
                var pixelValueBase = pixelValueWidth * imgHeightIndex + pixelValueWidthIndex;
                noStroke();
                fill(img.pixels[pixelValueBase], img.pixels[pixelValueBase + 1], img.pixels[pixelValueBase + 2], 200);
                ellipse(x, y, 15, 15); // 15 default
            }
        }
    }
}

function draw() {
    
}
