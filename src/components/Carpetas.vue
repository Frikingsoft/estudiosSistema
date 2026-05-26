<template>
  <div class="carousel-container">
    <div class="carousel-wrapper" :style="{ transform: `rotate(${currentAngle}deg)` }">
      <button
        v-for="(folder, index) in folders"
        :key="index"
        class="folder-button"
        :style="getButtonStyle(index)"
        @click="selectFolder(folder.ruta)"
      >
        <span class="folder-icon">{{ folder.icon }}</span>
        <span class="folder-name">{{ folder.name }}</span>
      </button>
    </div>
    <!-- Controles opcionales -->
    <div class="controls">
      <button @click="rotateLeft">◀ Girar izquierda</button>
      <button @click="rotateRight">Girar derecha ▶</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter} from "vue-router"
const router = useRouter()
// Lista de carpetas
const folders = ref([
  { name: 'Documentos', icon: '📄' ,ruta:"/documentos"},
  { name: 'Descargas', icon: '⬇️',ruta:"/descarga" },
  { name: 'Imágenes', icon: '🖼️' ,ruta:"/imagenes"},
  { name: 'Música', icon: '🎵' ,ruta:"/Musica"},
  { name: 'Vídeos', icon: '🎬' ,ruta:"/videos"},
  { name: 'Escritorio', icon: '🖥️' ,ruta:"/escritorio"}
])

// Ángulo actual de rotación del carrusel (en grados)
const currentAngle = ref(0)

// Radio del círculo (distancia desde el centro)
const radius = 180 // pixeles

// Calcula el ángulo de cada botón en el círculo
const getButtonStyle = (index) => {
  const angleStep = 360 / folders.value.length
  const angle = index * angleStep
  return {
    transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
  }
}

// Rotar manualmente
const rotateLeft = () => {
  currentAngle.value -= 60
}

const rotateRight = () => {
  currentAngle.value += 60
}

// Auto rotación
let intervalId = null

const startAutoRotate = (delay = 2000) => {
  stopAutoRotate()
  intervalId = setInterval(() => {
    currentAngle.value += 60
  }, delay)
}

const stopAutoRotate = () => {
  if (intervalId) clearInterval(intervalId)
}

// Click en carpeta
const selectFolder = (ruta) => {
  router.push(ruta)
}

onMounted(() => {
  startAutoRotate(2500)
})

onUnmounted(() => {
  stopAutoRotate()
})
</script>

<style scoped>
.carousel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  perspective: 800px;
}

.carousel-wrapper {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 20px auto;
  transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.2, 1);
  transform-style: preserve-3d;
}

.folder-button {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  margin-left: -50px;
  margin-top: -50px;
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 16px;
  padding: 12px;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(4px);
}

.folder-button:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 24px rgba(0,0,0,0.3);
}

.folder-icon {
  font-size: 2rem;
  margin-bottom: 6px;
}

.folder-name {
  font-size: 0.8rem;
  font-weight: bold;
  color: #333;
}

.controls {
  margin-top: 40px;
  display: flex;
  gap: 20px;
}

.controls button {
  background: #2c3e50;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
}

.controls button:hover {
  background: #1e2b36;
}
</style>