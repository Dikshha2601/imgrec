Webcam.set({
  width: 360,
  height: 250,
  image_format: "png",
  png_quality: 90,
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
  Webcam.snap(function (data_uri) {
    console.log(data_uri);
    document.getElementById("result").innerHTML =
      "<img id='capture' src='" + data_uri + "'/>";
  });
}

console.log("ml5 version: " + ml5.version);

classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/bUHyOKiqB/model.json",
  model_loaded
);

function model_loaded() {
  console.log("Model loaded");
}

function identify() {
  img = document.getElementById("capture");
  classifier.classify(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("object_name").innerHTML = results[0].label;
    document.getElementById("object_accuracy").innerHTML =
      results[0].confidence.toFixed(4) * 100 + "%";
  }
}
