
const img = document.querySelector('#img')
const MAX_FRAMES = 151
let currentFrame = 0

console.log(document.querySelector('#img'))
// Evita que el navegador restaure la posición del scroll al recargar
window.history.scrollRestoration = 'manual';

// Siempre inicia la experiencia desde el frame 0
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});


const preloadImages = () => {
  // Precarga todos los frames para evitar parpadeos durante el scroll
  for (let index = 0; index < MAX_FRAMES; index++) {
    const id = `${( index + 1 ).toString().padStart( 3, '0')}`
    const src = `images/frames/moto-${id}.webp`

    const img = new Image()
    img.src = src
  }
}

preloadImages()

const updateImage = (frame = 0) => {
  // Convierte el número de frame al formato esperado (001, 002, 003...)
  const id = String(frame + 1).padStart(3, '0')

  const src = `images/frames/moto-${id}.webp`

  // Actualiza la imagen visible según el frame actual
  img.style.backgroundImage = `url('${src}')`
}
updateImage(currentFrame)

// Distancia máxima que puede recorrer el scroll
let maxScroll = document.documentElement.scrollHeight - window.innerHeight;

// Recalcular si cambia el tamaño de la ventana
window.addEventListener('resize', () => {
  maxScroll = document.documentElement.scrollHeight - window.innerHeight;
});

let lastFrameUpdate = 0

window.addEventListener('scroll', () => {

  // Convierte la posición del scroll en un porcentaje (0 → 1)
  const scrollPosition = window.scrollY
  const scrollFraction = scrollPosition / maxScroll;

  // Mapea el porcentaje al frame correspondiente
  const frame = Math.floor(scrollFraction * ( MAX_FRAMES - 1))

  // Evita renderizar el mismo frame repetidamente
  if (currentFrame !== frame) {
    updateImage(frame)
    currentFrame = frame
  }
});
