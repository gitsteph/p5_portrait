var img;
var barriers;
var manager;


function preload() {
    img = loadImage("baseImage0.jpg");
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    cursor("HAND");
    matter.mouseInteraction(canvas);
    // make barriers
    barriers = new Array();
    barriers.push(matter.makeBarrier(windowWidth / 2, windowHeight + 10, windowWidth, 1)); // floor
    barriers.push(matter.makeBarrier(windowWidth / 2, -10, windowWidth, 1)); // ceiling
    barriers.push(matter.makeBarrier(0, windowHeight / 2, 1, windowHeight)); // leftWall
    barriers.push(matter.makeBarrier(windowWidth, windowHeight / 2, 1, windowHeight)); // rightWall

    matter.zeroGravity();
    manager = new Array();

    img.resize(0, windowHeight - 100);
    img.loadPixels();
    if (img.pixels.length > 0) {
        var pixelValueWidth = pixelDensity() * img.width * 4;
        for (var imgHeightIndex = 0; imgHeightIndex < img.height; imgHeightIndex += 16) {
            for (var pixelValueWidthIndex = 0; pixelValueWidthIndex < pixelValueWidth; pixelValueWidthIndex += 64) {
                var x = pixelValueWidthIndex / 4;
                var y = imgHeightIndex;
                var pixelValueBase = pixelValueWidth * imgHeightIndex + pixelValueWidthIndex;
                var size = 15;  // 15 default,
                var matterBall = matter.makeBall(x, y, size);
                var ellipseProperties = {
                    "r": img.pixels[pixelValueBase],
                    "g": img.pixels[pixelValueBase + 1],
                    "b": img.pixels[pixelValueBase + 2],
                    "a": 200,
                    "s": size,
                    "matterBall": matterBall
                };
                manager.push(ellipseProperties);
            }
        }
    }
}

function draw() {
    var canvas = createCanvas(windowWidth, windowHeight);
    matter.mouseInteraction(canvas);

    for (var ballIndex = 0; ballIndex < manager.length; ballIndex += 1) {
        var targetBall = manager[ballIndex];
        noStroke();
        fill(targetBall.r, targetBall.g, targetBall.b, targetBall.a);
        ellipse(targetBall.matterBall.getPositionX(), targetBall.matterBall.getPositionY(), targetBall.s, targetBall.s);
    }

    stroke(253 - 50, 95 - 50, 0 - 50);
    textSize(60);
    fill(253, 95, 0, 100);
    text("self-portrait", 10, windowHeight - 50);
    textSize(30);
    fill(255, 0, 153, 100);
    text("(play w/me!)", 10, windowHeight - 20);
}
