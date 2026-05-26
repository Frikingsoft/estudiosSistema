<template>
  <div class="escritorios" @contextmenu.prevent="showContextMenu" @click="closeMenuIfOpen">
    <div class="titulo">
      <!-- Aquí puedes poner contenido del título si quieres -->
    </div>

    <!-- Tus iconos del escritorio (ejemplo) -->
    <div class="iconos">
      <div v-if="carpetas.length === 0" class="mensaje-vacio">
        No hay carpetas. Haz clic derecho → Nuevo → Carpeta
      </div>
      <div 
        v-for="(carpeta, idx) in carpetas" 
        :key="idx"
        class="icono"
        @click="abrirCarpeta(carpeta)"
      >
        <span class="icono-imagen">📁</span>
        <span class="icono-nombre">{{ carpeta }}</span>
      </div>
    </div>

    <!-- Menú contextual (componente externo) -->
    <ContextMenu
      :visible="menuVisible"
      :x="menuX"
      :y="menuY"
      :targetType="targetType"
      @close="menuVisible = false"
      @action="handleMenuAction"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ContextMenu from '../components/ContextMenu.vue'

// Estado local
const carpetas = ref([])
const menuVisible = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const targetType = ref('desktop')

// Menú contextual
const showContextMenu = (event) => {
  const icono = event.target.closest('.icono')

  if (icono) {
    targetType.value = 'file'
    console.log('Clic derecho sobre carpeta:', icono.querySelector('.icono-nombre')?.innerText)
  } else {
    targetType.value = 'desktop'
  }

  menuX.value = event.clientX
  menuY.value = event.clientY
  menuVisible.value = true
}

const closeMenuIfOpen = () => {
  if (menuVisible.value) menuVisible.value = false
}

// Acciones del menú
const handleMenuAction = async (action) => {
  console.log('Acción recibida:', action)

  switch (action) {
    case 'nuevaCarpeta':
      const nombre = prompt('Nombre de la nueva carpeta:')
      if (nombre && nombre.trim()) {
        carpetas.value.push(nombre.trim())
      }
      break

    case 'actualizar':
      console.log('Actualizando...')
      break

    case 'ver_iconos_grandes':
    case 'ver_iconos_medianos':
    case 'ver_iconos_pequenos':
    case 'ver_lista':
    case 'ver_detalles':
      console.log('Cambiar vista:', action)
      break

    case 'ordenar_nombre':
    case 'ordenar_tamano':
    case 'ordenar_tipo':
    case 'ordenar_fecha':
      console.log('Ordenar por:', action)
      break

    case 'deshacer':
      console.log('Deshacer acción')
      break

    case 'nuevoDocumento':
      const docName = prompt('Nombre del documento:')
      if (docName) console.log('Crear documento:', docName)
      break

    case 'configuracionPantalla':
      console.log('Configuración pantalla')
      break

    case 'personalizar':
      console.log('Personalizar')
      break

    case 'amdSoftware':
      console.log('AMD Software')
      break

    case 'abrirTerminal':
      console.log('Abrir terminal')
      break

    case 'abrirCode':
      console.log('Abrir VS Code')
      break

    case 'mostrarMasOpciones':
      console.log('Más opciones')
      break

    default:
      console.log('Acción no manejada:', action)
  }
}

// Abrir carpeta
const abrirCarpeta = (nombre) => {
  console.log(`Abrir carpeta: ${nombre}`)
}
</script>

<style scoped>
.escritorios {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/fondo.png');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: auto;
}

.titulo {
  width: 100%;
  height: 64px;
  border-radius: 18px;
  background: rgba(55, 6, 77, 0.25);
  backdrop-filter: blur(12px);
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.35);
}

.iconos {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 40px;
}

.icono {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  cursor: pointer;
  transition: transform 0.1s;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 12px 8px;
}

.icono:hover {
  transform: scale(1.05);
  background: rgba(255,255,255,0.2);
}

.icono-imagen {
  font-size: 48px;
}

.icono-nombre {
  font-size: 12px;
  text-align: center;
  color: white;
  margin-top: 8px;
  word-break: break-word;
}

.mensaje-vacio {
  color: white;
  font-size: 18px;
  padding: 40px;
  text-align: center;
  width: 100%;
}
</style>