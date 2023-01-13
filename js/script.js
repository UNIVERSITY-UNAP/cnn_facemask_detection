
const model = (async () => {
  console.log("loading model...");
  const mm = await tf.loadLayersModel("https://raw.githubusercontent.com/UNIVERSITY-UNAP/cnn_facemask_detection/main/models/model2.json")
  console.log("model loaded");
  return mm;
})();

const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const take = document.querySelector("#take");
const predict = document.querySelector("#predict");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
    video: true,
  })
    .then(stream => {
      document.querySelector("#cameraData").innerHTML = stream.getVideoTracks()[0].label
      video.srcObject = stream;
    })
    .catch(err => {
      console.log("error papá! " + err);
    });
}

var img;
take.addEventListener('click', () => {
  video.pause();
  const ctx = canvas.getContext("2d");
  canvas.width = 128;
  canvas.height = 128;
  const padd = parseInt((video.clientWidth - video.clientHeight) / 2);
  ctx.drawImage(video, padd * 2, 0, video.clientWidth - padd, video.clientHeight, 0, 0, canvas.width, canvas.height + 128 - canvas.height);
  video.play();

  img = document.querySelector("#imgproc");
  img.src = canvas.toDataURL('image/png');
})

const class_names = ['Mascarilla mal puesta', 'Con mascarilla', 'Sin mascarilla'];

predict.addEventListener('click', () => {
  model.then(m => {
    img = tf.browser.fromPixels(img);
    img = img.expandDims(0)
    // console.log(img.shape)
    const pred = m.predict(img);
    const p = pred.dataSync();
    console.log("predicction: " + p);
    // const ss = pred.softmax();
    pred.softmax().print()
    s = Array.from(pred.softmax().dataSync())
    // console.log(s)
    const classId = tf.argMax(s).dataSync()[0];

    document.querySelector("#info").innerHTML = (class_names[classId] + " con una seguridad del " + (s[classId].toFixed(2) * 100) + "%");
    img.src = canvas.toDataURL();

  }).catch(err => { console.error("modelo: " + err); })

})
