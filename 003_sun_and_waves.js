let angle = 0;
let font;
let capturer;
let isRecording = false;

// preload font
//function preload() {
//  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceSansPro-Semibold.otf');
//}

function setup() {
  createCanvas(400, 400);
  textFont(font);
  textSize(32);
  textAlign(CENTER, CENTER);
  
  // create CCapture object 
  capturer = new CCapture({
    format: 'webm',
    framerate: 30,
    quality: 100,
    verbose: true
  });
  
  // create starting record button 
  let startButton = createButton('녹화 시작');
  startButton.position(10, height + 10);
  startButton.mousePressed(startRecording);
  
  // create ending record button
  let stopButton = createButton('녹화 종료');
  stopButton.position(100, height + 10);
  stopButton.mousePressed(stopRecording);
}

function draw() {
  if (isRecording) {
    capturer.capture(document.getElementById('defaultCanvas0'));
  }
  
  background(200, 230, 255);
  
  // draw sun
  noStroke();
  fill(255, 200, 50, 150);
  circle(width/2, height/2, 150);
  
  // draw waves
  stroke(100, 200, 255);
  strokeWeight(2);
  noFill();
  
  for (let i = 0; i < 5; i++) {
    beginShape();
    for (let x = 0; x <= width; x += 20) {
      let y = height/2 + 50 + i*30 + sin(x * 0.03 + angle) * 15;
      curveVertex(x, y);
    }
    endShape();
  }
  
  // texts
  fill(50, 100, 150);
  noStroke();
  //text("text1", width/2, height/4);
  //text("text2", width/4, height/2);
  //text("text3", 3*width/4, height/2);
  //text("text4", width/2, 3*height/4);
  
  angle += 0.02;
}

function startRecording() {
  isRecording = true;
  capturer.start();
}

function stopRecording() {
  isRecording = false;
  capturer.stop();
  capturer.save();
}
