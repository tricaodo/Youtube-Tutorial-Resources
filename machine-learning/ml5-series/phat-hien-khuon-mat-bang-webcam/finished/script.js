let faceApi;
let video;
// Khi file được load, p5 sẽ tự chạy hàm setup.
function setup() {
  // 1. Tạo canvas để vẽ.
  createCanvas(640, 480);
  // 2. Tạo video webcam.
  video = createCapture(VIDEO, () => console.log("Video is ready."));
  video.hide();
  // 3. Truy cập thư viện library.
  faceApi = ml5.faceApi(video, modelLoaded);
}

function modelLoaded() {
  console.log("Model is ready.");
  faceApi.detect(video, response);
}

function response(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Check nếu array is empty. Nếu không sẽ bị lỗi khi truy cập index 0.
  for (let result of results) {
    // Vẽ video lên canvas.
    image(video, 0, 0, width, height);
    // Vẽ cái box xung quanh khuôn mặt.
    drawBox(result.alignedRect);
  }
  // Gọi lại function này để cập nhật khuôn mặt.
  faceApi.detect(video, response);
}

function drawBox(alignedRect) {
  const _box = alignedRect._box;
  const _x = _box._x;
  const _y = _box._y;
  const _width = _box._width;
  const _height = _box._height;

  noFill(); // Không bôi đen bên trong rect.
  stroke("red"); // Vẽ viền đỏ.
  rect(_x, _y, _width, _height); // Vẽ hình chữ nhật.
}
