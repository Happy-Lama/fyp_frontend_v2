// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useAppStore = defineStore('app', ()=>{
  // const user = ref(null)
  // const csrfToken = ref(null)
  // const logged_in = ref(null)
  
  const notifications = ref([])
  return notifications
})

const useTransformerDataStore = defineStore('transformerData', () => {
  const transformer_data = ref(null)
  const transformer_latest_data = ref(null)
  const moving_average_values = ref(null)
  const average_values = ref(null)

  return transformer_data, transformer_latest_data, moving_average_values, average_values
})

export { useAppStore, useTransformerDataStore }