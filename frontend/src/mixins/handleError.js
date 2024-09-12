//import { useAlertStore } from '@/stores/alert'
//import { useAuthStore } from '@/stores/auth'
import { router } from '../router';

export const handleError = {
    
    methods: {

        handleError(error, route = null) {
            
            switch(error.response.status) {
        
                case 401:
                    //const authStore = useAuthStore();
                    //authStore.clearAuthData();
                    
                    console.log('401 error')
                    //this.sendAlert(error.response.data.title, error.response.data.msg, 'warning', 6000)
                    router.push({ name: 'logout' })         
        
                    break;
        
                case 403:                      
                    sendAlert('Acesso negado', 'Conteúdo indísponivel para seu usuário. Verifique suas permissões de acesso.', 'warning', 6000)
                    router.push({ name: 'home' }) 

                    break;
                case 404:
                    router.push({ name: 'erro404'});
                    break;
                case 500:
                    break;
                case 502:
                    break;
                case 504:
                    break;
        
                default:
                    //this.sendAlert('Erro!', error.response.data.error, 'danger', 6000)
        
            }
        
            if(route) {
                router.push({ name: route })
            }
        },

        /*
        sendAlert (title, message, type, timeout = 4000) {
            let alertStore = useAlertStore()
            const alert = {
                title: title,
                message: message,
                timeout: timeout,
                type: type
            }
            alertStore.alerts.push({ ...alert })
        }
        */
    },
}
