status1 = "";
objects = [];
img = "";

function preload(){
    img = loadImage("Living Room.jpg");
}

function setup(){
    canvas = createCanvas(500, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelReady);
    document.getElementById("status").innerHTML = "Status: Detecting objects...";
}

function modelReady(){
    console.log("Model Loaded!");
    status1 = true;
}

function draw() {
    image(img, 0, 0, 480, 380);

    if(status1 != ""){
        objectDetector.detect(img, gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected!";
            document.getElementById("obj_count").innerHTML = "There are 6 objects in this image, out of which 2 images have been detected";

            fill(0, 0, 255);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(0, 0, 255);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        console.log("Results Loaded!");
        objects = results;
    }
}