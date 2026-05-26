<template>
     <Menu/>
    <Notificaciones/>
     <Router-View/>
</template>
<script setup>
  import Menu from "./components/Menu.vue"
  import Notificaciones from "./components/Notificaciones.vue"
  import { RouterView } from "vue-router"
</script>