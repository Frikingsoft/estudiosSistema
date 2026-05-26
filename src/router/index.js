import { createRouter, createWebHistory } from "vue-router"
import Layout from "../Layout.vue"
import Inicio from "../paginas/Inicio.vue"
import App from "../App.vue"
import Escritorio from "../paginas/Escritorio.vue"
const routes =[
    { 
        path:"/",
        component:Layout,
        children:[
            
            {path:"", component:Inicio}
        ]
    },
    { 
        path:"/escritorio",
        component:Layout,
        children:[
            
            {path:"", component:Escritorio}
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router