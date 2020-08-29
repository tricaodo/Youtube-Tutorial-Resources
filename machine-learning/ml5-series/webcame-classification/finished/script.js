let mobilenet;
let video;
let label = "";
// Khi file được load, p5 sẽ tự chạy hàm setup.
function setup() {
  // 1. Tạo canvas để vẽ.
  createCanvas(640, 550);
  // 2. Tạo video webcam.
  video = createCapture(VIDEO, () => console.log("Video is ready."));
  video.hide();
  // 3. Truy cập thư viện library.
  mobilenet = ml5.imageClassifier("MobileNet", video, modelLoaded);
}

function draw() {
  background(0);
  image(video, 0, 0, 640, 480)
  fill(255);
  textSize(32)
  text(label,10, height -  30)
}

function modelLoaded() {
  console.log("Model is ready.");
  mobilenet.predict(response);
}

function response(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  mobilenet.predict(response)
}

