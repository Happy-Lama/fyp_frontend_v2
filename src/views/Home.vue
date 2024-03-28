<template>
  <LoadingScreen v-if="isLoading"></LoadingScreen>
  <MapComponent :transformers="transformers"/>
</template>

<script setup>
import MapComponent from '@/components/MapComponent.vue';
import { useTransformerDataStore } from '@/store/app';
import { onMounted, onUnmounted } from 'vue';
import { ref } from 'vue';
import { get_latest_transformer_data } from '@/httpservice';
import { watch } from 'vue';
import LoadingScreen from '@/components/LoadingScreen.vue'
const transformerDataStore = useTransformerDataStore()

const transformers = ref([]);
const isLoading = ref(null);

function updateLatestValues(newVal){
  console.log(newVal)
  if(newVal){}
  let transformers_data = []
  // let transformer_devUIDs = []
  newVal.forEach((transformer) => {
    let formatted_data = {
      devUID: transformer['transformer_id'],
      data: {
        // output_current: transformer['output_current'],
        // output_voltage: transformer['output_voltage'],
        loading: transformer['percentage_loading'],
      },
      location: {
        position: [
          transformer['latitude'],
          transformer['longitude']
        ],
        operational: transformer['status'] == 'ON'
      }
    }

    // for( let i = 0; i < transformerDataStore.transformer_latest_data.length; i++){
    //   if(transformer['devUID'] === transformerDataStore.transformer_latest_data[i]['devUID']){
    //     formatted_data.location = {
    //       position: [transformerDataStore.transformer_latest_data[i]['latitude'], transformerDataStore.transformer_latest_data[i]['longitude']],
    //       operational: transformerDataStore.transformer_latest_data[i]['operational']
    //     }
    //   }
    // }

    transformers_data.push(formatted_data)
    // console.log(transformers_data)
    // transformer_devUIDs.push(transformer['devUID'])
    
  })

  // for( let i = 0; i < transformerDataStore.transformer_latest_data.length; i++){
  //   if(!transformer_devUIDs.includes(transformerDataStore.transformer_latest_data[i]['devUID'])){
  //     let transformer = {
  //       devUID: transformerDataStore.transformer_latest_data[i]['devUID'],
  //       data: {
  //         output_current: 0,
  //         output_voltage: 0,
  //         output_power: 0,
  //       },
  //       location : {
  //         position: [transformerDataStore.transformer_latest_data[i]['latitude'], transformerDataStore.transformer_latest_data[i]['longitude']],
  //         operational: false
  //       }
  //     }

  //     transformers_data.push(transformer)
  //   }
  // }
  
  console.log(transformers_data)
  transformers.value = transformers_data
  console.log("Transformers", transformers.value)
}


const intervalID = ref(null)

watch(() => transformerDataStore.transformer_latest_data, (newVal, oldVal) => {
  updateLatestValues(newVal)
})




//lifecycle hooks
onMounted(() => {
    if(transformerDataStore.transformer_latest_data == null){
        isLoading.value = true;
        get_latest_transformer_data('/dashboard/transformers/latest/', transformerDataStore)
        // get_latest_transformer_data('https://fyp-backend-ot0p.onrender.com/data/transformers/latest/', appStore)
        setTimeout(() => {
          isLoading.value = false
        }, 3000)
        
    } else {
        updateLatestValues(transformerDataStore.transformer_latest_data)
        // intervalID.value = setInterval(()=>{
        //   // get_latest_transformer_data('http://localhost:8000/data/transformers/latest/', appStore)
        //   // get_latest_transformer_data('https://fyp-backend-ot0p.onrender.com/data/transformers/latest/', appStore)
        // }, 30000)
    }
})

// onUnmounted(() => {
//     clearInterval(intervalID.value)
// })

</script>
