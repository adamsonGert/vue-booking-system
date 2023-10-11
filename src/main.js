import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import '@vuepic/vue-datepicker/dist/main.css';

const auth = getAuth();

let appInstance;

onAuthStateChanged(auth, () => {
    if (!appInstance) {
        const app = createApp(App);
        app.use(router);
        
        const metaManager = createMetaManager();
        app.use(metaManager);

        appInstance = app.mount('#app');
    }
});
