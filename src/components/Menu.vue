<template>
     <div class="menu">
      <nav class="botones_menu">
        <button class="botones" @click="inicio">
          🏠
        </button>

        <button class="botones">
          🌐
        </button>

        <button class="botones">
          📁
        </button>

        <button class="botones">
          ⚙️
        </button>
        </nav>
    </div>
</template>
<script setup>
  import { useRouter } from "vue-router"
  const router = useRouter()
  const inicio =()=>{
    router.push("/")
  } 
</script>

<style scoped>
    .escritorio {
  width: 100%;
  height: 100vh;
}

/* ========================= */
/* MENU INFERIOR */
/* ========================= */

.menu {
  position: absolute;
  bottom: 20px;

  width: 100%;
  height: 48px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* CONTENEDOR DE BOTONES */

.botones_menu {
  height: 100%;

  width: 25%;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 12px;

  padding: 8px 14px;

  border-radius: 18px;

  background: rgba(55, 6, 77, 0.25);

  backdrop-filter: blur(12px);

  box-shadow:
    1px 1px 20px rgba(0, 0, 0, 0.35);
}



.botones {
  position: relative;

  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;
  color: white;

  background: transparent;

  border: none;

  cursor: pointer;

  overflow: hidden;


}
.botones:hover{
  transition: .8s;
  transform: scale(1.5);
  animation: animar_boton .5s infinite;

  border-radius: 50%;
  
  
}
@keyframes animar_boton {
   0%{
      transform:  translateY(1) ;
     
   }
   10%{
      transform:  translateY(4px) ;
   
   }
    20%{
      transform:  translateY(8px) ;
       
   }
   40%{
      transform:  translateY(16px) rotateX(-45deg);
      
      
   }
   50%{
    transform:  translateY(-4px) ;
     
   }
   60%{
    transform:  translateY(-8px) ;
  
   }
   100%{
    transform:  translateY(-16)rotateX(45deg);
    
   }
}
</style>