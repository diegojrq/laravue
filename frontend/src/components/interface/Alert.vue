<template>
  <div v-if="currentAlert" class="alert-fixed-div">
    <div :class="['alert-card', 'alert-card-' + currentAlert.type]">
      <div :aria-label="[currentAlert.title, ' ', currentAlert.message]" role="alert">
        <h3 v-if="currentAlert.title !== ''">{{ currentAlert.title }}</h3>
        <span v-if="currentAlert.message !== ''">&nbsp;{{ currentAlert.message }}</span>
      </div>
    </div>
  </div>  
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useAlertStore } from '@/stores/alert'

export default defineComponent({
  id: 'alert',

  setup() {
    const alertStore = useAlertStore()
    const currentAlert = ref(null)

    function getAlert() {
      currentAlert.value = alertStore.alerts.shift()
      if (currentAlert.value) {
        setTimeout(() => {
          getAlert()
        }, currentAlert.value.timeout)
      }
    }

    function closeAlert() {
      console.log('closing alert')
      currentAlert.value = alertStore.alerts.shift()

    }

    watch(
      () => alertStore.alerts.length,
      () => {
        if (!currentAlert.value) {
          getAlert()
        }
      },
      { immediate: true }
    )

    return {
      currentAlert,
      closeAlert,
      getAlert,
    }
  },
})
</script>

<style scoped>

.alert-fixed-div {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.alert-card {
  background-color: #fff;
  color: #333;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.alert-card-warning {
  background-color: #fffae6; /* Light yellow background */
  color: #665c00; /* Dark yellow text */
  border-left: 5px solid #ffcc00; /* Solid yellow border on the left */
}

.alert-card-success {
  background-color: #e6f9f0; /* Light green background */
  color: #00633d; /* Dark green text */
  border-left: 5px solid #33cc99; /* Solid green border on the left */
}

.alert-card-danger {
  background-color: #ffe6e6; /* Light red background */
  color: #660000; /* Dark red text */
  border-left: 5px solid #ff3333; /* Solid red border on the left */
}

.alert-card h3 {
  margin: 0;
  font-size: 1.1em;
}

@keyframes loading {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}

</style>