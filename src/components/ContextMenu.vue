<template>
  <Teleport to="body">
    <div 
      v-if="visible"
      class="context-menu"
      :style="{ top: y + 'px', left: x + 'px' }"
      @click.stop
    >
      <template v-for="(item, idx) in menuItems" :key="idx">
        <hr v-if="item === 'hr'" />
        <div v-else-if="item.submenu" 
             class="menu-item has-submenu"
             @mouseenter="openSubmenu(item.name)"
             @mouseleave="closeSubmenu"
        >
          <span>{{ item.label }}</span>
          <span class="arrow">▶</span>
          <div v-if="activeSubmenu === item.name" class="submenu">
            <div 
              v-for="(sub, subIdx) in item.submenu" 
              :key="subIdx"
              class="menu-item"
              @click="handleAction(sub.action)"
            >
              {{ sub.label }}
            </div>
          </div>
        </div>
        <div v-else class="menu-item" @click="handleAction(item.action)">
          {{ item.label }}
        </div>
      </template>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  visible: Boolean,
  x: Number,
  y: Number,
  targetType: String
})

const emit = defineEmits(['close', 'action'])

const menuItems = ref([
  {
    name: 'ver',
    label: 'Ver',
    submenu: [
      { label: 'Iconos grandes', action: 'ver_iconos_grandes' },
      { label: 'Iconos medianos', action: 'ver_iconos_medianos' },
      { label: 'Iconos pequeños', action: 'ver_iconos_pequenos' },
      { label: 'Lista', action: 'ver_lista' },
      { label: 'Detalles', action: 'ver_detalles' }
    ]
  },
  {
    name: 'ordenar',
    label: 'Ordenar por',
    submenu: [
      { label: 'Nombre', action: 'ordenar_nombre' },
      { label: 'Tamaño', action: 'ordenar_tamano' },
      { label: 'Tipo', action: 'ordenar_tipo' },
      { label: 'Fecha de modificación', action: 'ordenar_fecha' }
    ]
  },
  { label: 'Actualizar', action: 'actualizar' },
  'hr',
  { label: 'Deshacer (Ctrl+Z)', action: 'deshacer' },
  'hr',
  {
    name: 'nuevo',
    label: 'Nuevo',
    submenu: [
      { label: '📁 Carpeta', action: 'nuevaCarpeta' },
      { label: '📄 Documento de texto', action: 'nuevoDocumento' }
    ]
  },
  'hr',
  { label: 'Configuración de pantalla', action: 'configuracionPantalla' },
  { label: 'Personalizar', action: 'personalizar' },
  { label: 'AMD Software: Adrenalin Edition', action: 'amdSoftware' },
  { label: 'Abrir en Terminal', action: 'abrirTerminal' },
  { label: 'Abrir con Code', action: 'abrirCode' },
  'hr',
  { label: 'Mostrar más opciones', action: 'mostrarMasOpciones' }
])

const activeSubmenu = ref(null)
let submenuTimeout = null

const openSubmenu = (name) => {
  if (submenuTimeout) clearTimeout(submenuTimeout)
  activeSubmenu.value = name
}

const closeSubmenu = () => {
  submenuTimeout = setTimeout(() => {
    activeSubmenu.value = null
  }, 200)
}

const handleAction = (action) => {
  if (action) emit('action', action)
  emit('close')
}
</script>

<style scoped>
.context-menu {
  position: fixed;
  background: rgba(40,40,40,0.96);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  z-index: 0;
  min-width: 220px;
  color: #f0f0f0;
  font-size: 13px;
  backdrop-filter: blur(8px);
  border: 1px solid #4a4a4a;
}

.menu-item {
  padding: 6px 30px 6px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.1s;
  white-space: nowrap;
}

.menu-item:hover {
  background: #3a6ea5;
}

.has-submenu {
  padding-right: 24px;
}

.arrow {
  font-size: 10px;
  color: #ccc;
  margin-left: auto;
}

hr {
  margin: 4px 0;
  border: 0;
  height: 1px;
  background: #555;
}

.submenu {
  position: absolute;
  left: 100%;
  top: 0;
  background: #2e2e2e;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  min-width: 180px;
  border: 1px solid #4a4a4a;
}
</style>