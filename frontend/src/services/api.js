import axios from 'axios';
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'

const baseURL = config.CONFIG_ENV_API_PATH;

const api = axios.create({
    baseURL: baseURL,
    timeout: 300000, 
    headers: {
         "Content-Type": "application/json",
    },
    showLoader: true
});

// Interceptor for requests
const requestInterceptor = (request) => {
    
    if (request.showLoader) {
        let loadingStore = useLoadingStore()
        loadingStore.showLoading();
    }

    const authStore = useAuthStore()
    request.headers['Authorization'] = 'Bearer ' + authStore.getUserAccessToken() || '';

    return request;
}

const errorInterceptor = error => {
    
    if (error.response.config.showLoader) {
        let loadingStore = useLoadingStore()        
        loadingStore.hideLoading();
    }

    switch(error.response.status) {
        
        // não autorizado
        case 401:
            
            console.log(error.response)
            if (error.response.config.url !== 'login') {
                sendAlert('Unauthorized!', ['Something went wrong with your browser data. Please, login again.'], 'warning', 6000)
                router.push({ name: 'logout' });
            }

            break;
        case 403:
              sendAlert('Access Denied!', ['You do not have permission to access this page.'], 'warning')
              router.push({ name: 'index' }) 
            break;
        case 404:
            // router.push({ name: 'erro404'});
            break;
        case 500:
            break;
        case 502:
            break;
        case 504:
            break;

        default:
            console.error(error.response.status, error.message);

    }

    return Promise.reject(error);
}

// Interceptor for responses
const responseInterceptor = response => {
    
    if (response.config.showLoader) {
        let loadingStore = useLoadingStore()        
        loadingStore.hideLoading();
    }

    switch(response.status) {
        case 200:
            // yay!
            break;
        // any other cases
        default:
        // default case
    }

    return response;
}

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);

function sendAlert (title, message, type, timeout = 4000) {
    let alertStore = useAlertStore()
    const alert = {
        title: title,
        message: message,
        timeout: timeout,
        type: type
    }
    alertStore.alerts.push({ ...alert })
}

export default api;
