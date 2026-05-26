<template>
    <div class="notificaciones">
        <div class="contenido">

        </div>
    </div>
</template>
<script setup>
    
</script>

<style scoped>
    
    .notificaciones{
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 30%;
        height: 30vh;
        
        z-index: 0;
    border-radius: 20%/90%;

  background: rgba(55, 6, 77, 0.25);
  box-shadow: 1px 1px 5px blueviolet;  
  backdrop-filter: blur(12px);
    animation: notificaciones .5s ;

    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
   
    }
    .notificaciones::before{
        content: " ";
        width: 30%;
        height: 5%;
        background-color: rgba(137, 43, 226, 0.5);
        box-shadow: 1px 1px 5px rgba(137, 43, 226, 0.5);  
        border-radius: 20%/90%;
        margin-bottom: 2%;
    }
    .contenido{
        height: 90%;
        width: 90%;
        
    }
    .notificaciones::after{
        content: " ";
        margin-top: 2%;
        width: 30%;
        height: 5%;
        background-color: rgba(137, 43, 226, 0.5);
        box-shadow: 1px 1px 5px rgba(137, 43, 226, 0.5);  
         border-radius: 20%/90%;
    }
    @keyframes notificaciones {
        from{
            height: 0vh;
        }
        to{
            height: 30vh;
        }
    }
</style>