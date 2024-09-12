import { useAlertStore } from '@/stores/alert'

export const alert = {    
    methods: {
        sendAlert(title, message, type, timeout = 4000) {
            let alertStore = useAlertStore()
            const alert = {
              title: title,
              message: message,
              timeout: timeout,
              type: type
            }
            alertStore.alerts.push({ ...alert })            
        },
    },
}
