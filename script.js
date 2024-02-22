const currentImage = document.getElementById('currentImage');

function fetchAndDisplayImages() {
  fetch('./images') // Endpoint en tu servidor que devuelve la lista de imágenes
    .then(response => response.json())
    .then(imageList => {
      let currentIndex = 0;
      setInterval(() => {
        if (currentIndex >= imageList.length) {
          currentIndex = 0; // Reiniciar el índice cuando se llega al final de la lista
        }
        currentImage.src = imageList[currentIndex];
        currentIndex++;
      }, 3000); // Intervalo de 3 segundos entre imágenes
    })
    .catch(error => console.error('Error fetching images:', error));
}

fetchAndDisplayImages();