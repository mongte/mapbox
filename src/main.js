
import { createApp } from 'vue'
import App from './App.vue'
import './register-service-worker'
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";


const app = createApp(App)

app.use(VueMapbox, { mapboxgl: Mapbox })


app.mount('#app')