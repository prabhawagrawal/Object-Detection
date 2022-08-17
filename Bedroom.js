status1 = "";
objects = [];
img = "";

function preload(){
    img = loadImage("Bedroom.jpg");
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
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(img, 0, 0, 500, 380);
    if(status1 != ""){
        for(i = 0; i <= objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects detected!";
            
            fill(0, 0, 255);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label, objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(0, 0, 255);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}