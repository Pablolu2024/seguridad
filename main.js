
const MODEL_URL = './models';




(async () => {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
    await faceapi.loadFaceExpressionModel(MODEL_URL)
})();


// Obtener acceso a la cámara web
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    var video = document.getElementById('video');
    video.srcObject = stream;
    video.play();
  })
  .catch(function(err) {
    console.log("Error: " + err);
  });

// Capturar una foto de la cámara web
document.getElementById('capture').addEventListener('click', function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Comparar la foto con la imagen de la webcam en vivo
document.getElementById('compare').addEventListener('click', function() {
  var referenceImage = document.getElementById('referenceImage'); // Aquí debes proporcionar la imagen de referencia
  var referenceDescriptor;
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var queryDescriptor;

  // Obtener el descriptor de la imagen de referencia
  
 faceapi.detectSingleFace(referenceImage).withFaceLandmarks().withFaceDescriptor()
    .then(function(descriptor) {
      referenceDescriptor = descriptor.descriptor;
    })
    .catch(function(err) {
      console.log("Error: " + err);
    });

  // Obtener el descriptor de la imagen de la webcam en vivo
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  faceapi.detectSingleFace(canvas).withFaceLandmarks().withFaceDescriptor()
    .then(function(descriptor) {
      queryDescriptor = descriptor.descriptor;
      
      // Comparar los descriptores
      var distance = faceapi.euclideanDistance(referenceDescriptor, queryDescriptor);
      console.log("Distancia euclidiana: " + distance);

      // Puedes definir un umbral para determinar si es la misma persona o no
      var threshold = 0.7; // Este valor puede variar según tus necesidades
      if (distance < threshold) {
         alert ("Es la misma persona.");
        
      } else {
               alert ("No es la misma persona.");
      }
    })
    .catch(function(err) {
      console.log("Error: " + err);
    });
});
