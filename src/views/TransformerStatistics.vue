<template>
    <RouterLink to="/">
        <v-btn  variant="flat">
            Back to Home
        </v-btn>
    </RouterLink>
    <v-container>
        <v-card class="mb-8">
            <v-row align="center" justify="center" style="height: 100vh; max-height: max-content;">
                    <v-card align="center" style="height: 100vh;" justify="center" variant="flat">
                        <v-card-title>
                            Summary of Statistics
                        </v-card-title>
                        <v-row style="height: 95%;" align="center" justify="center">
                            <v-col cols="12" md="6">
                                <v-card variant="flat">
                                    <v-card-title class="text-h4">
                                        {{ average_power.toFixed(4) }}
                                    </v-card-title>
                                    <v-card-text>
                                        Output Power (kW)
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-card variant="flat">
                                    <v-card-title class="text-h4">
                                        {{ average_voltage }}    
                                    </v-card-title>
                                    <v-card-text>
                                        Output Voltage (V)
                                    </v-card-text>
                                    
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6" align-self="start">
                                <v-card variant="flat">
                                    <v-card-title class="text-h4">
                                        {{ average_transformer_loading }}
                                    </v-card-title>
                                    <v-card-text>
                                        Transformer Loading (%)
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6" align-self="start">
                                <v-card variant="flat" >
                                    <v-card-title class="text-h4">
                                        {{ average_frequency }}
                                    </v-card-title>
                                    <v-card-text>
                                        Output Frequency (Hz)
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                <!-- </v-col> -->
            </v-row>
        </v-card>
        
        <v-row>

            <!-- Average Loading Chart -->
            <v-col cols="12" md="6">
                <ChartComponent :chart-data="loadingChartData" chart-title="Current Loading" data-type="loading_percentage"/>
            </v-col>

            <!-- Average Power Chart -->
            <v-col cols="12" md="6">
                <ChartComponent :chart-data="powerChartData" chart-title="Output Power" data-type="power"/>
            </v-col>

            <!-- Average Voltage Chart -->
            <v-col cols="12" md="6">
                <ChartComponent :chart-data="voltageChartData" chart-title="Output Voltage" data-type="voltage"/>
            </v-col>

            <!-- Average Reactive Power Chart -->
            <v-col cols="12" md="6">
                <ChartComponent :chart-data="reactivePowerChartData" chart-title="Output Reactive Power" data-type="reactive_power"/>
            </v-col>

            <!-- Average Current Chart -->
            <v-col cols="12" md="6">
                <ChartComponent :chart-data="currentChartData" chart-title="Output Current" data-type="current"/>
            </v-col>

            <!-- Average Frequency Chart  -->
            <v-col cols="12" md="6">
                <ChartComponent :chart-data="frequencyChartData" chart-title="Output Frequency" data-type="frequency"/>
            </v-col>

        </v-row>
    </v-container>

</template>

<script setup>

import { ref, watch } from 'vue';
import ChartComponent from '@/components/ChartComponent.vue';
// import CircularChartComponent from '@/components/CircularChartComponent.vue';
import { useAppStore } from '@/store/app';
import { onMounted } from 'vue';
import { get_average_values, get_latest_transformer_data } from '@/httpservice';
import { onUnmounted } from 'vue';

const appStore = useAppStore();
const average_power = ref(0.0);
const average_voltage = ref(0.0);
const average_transformer_loading = ref(0.0);
const average_frequency = ref(0.0);

const circhartData = ref({
  online: 0,
  offline: 0,
});

const powerChartData = ref({
    label: 'Power',
    data: {
        x: [],
        y: []
    }
});
const reactivePowerChartData = ref({
    label: 'Reactive Power',
    data: {
        x: [],
        y: []
    }
});
const voltageChartData = ref({
    label: 'Voltage',
    data: {
        x: [],
        y: []
    }
})
const currentChartData = ref({
    label: 'Current',
    data: {
        x: [],
        y: []
    }
})
const frequencyChartData = ref({
    label: 'Frequency',
    data: {
        x: [],
        y: []
    }
})
const loadingChartData = ref({
    label: 'Average Loading',
    data: {
        x: [],
        y: []
    }
})

function updateValues(newVal, oldVal){
    // let empty_val = new Proxy(Object())
    // console.log("New value", newVal['average_transformer_loading'] == null)
    // console.log("Old val", oldVal)
    if(newVal['average_transformer_loading'] && newVal['average_output_voltage'] && newVal['average_output_power'] && newVal['average_output_frequency']){
        average_transformer_loading.value = newVal['average_transformer_loading']
        average_voltage.value = newVal['average_output_voltage']
        average_power.value = newVal['average_output_power']/1000
        average_frequency.value = newVal['average_output_frequency']
        // console.log(average_current.value)
        // average_current.value = 100

        circhartData.value = {
            online: 0,
            offline: 0,
        }

        appStore.transformer_location_data.forEach((location) => {
            // console.log(location)
            

            if(location['operational']){
                circhartData.value = { online: ++circhartData.value.online , offline: circhartData.value.offline }
            } else {
                circhartData.value = { online: circhartData.value.online , offline: ++circhartData.value.offline }
            }
        })

        console.log(circhartData.value)
        let timestamps = []
        let powerdata = []
        let currentdata = []
        let voltagedata = []
        let reactivepowerdata = []
        let frequencydata = []
        let loadingdata = []

        if(appStore.moving_average_values){
            appStore.moving_average_values.forEach((data) => {
                timestamps.push(data['timestamp'])
                powerdata.push(data['average_values']['output_power__avg']/1000)
                currentdata.push(data['average_values']['output_current__avg'])
                voltagedata.push(data['average_values']['output_voltage__avg'])
                reactivepowerdata.push(data['average_values']['output_reactive_power__avg']/1000)
                frequencydata.push(data['average_values']['output_frequency__avg'])
                loadingdata.push(data['average_values']['current_loading_percentage__avg'])
            })
        
            powerChartData.value = {
                label: 'Power',
                data: {
                    x: timestamps,
                    y: powerdata
                }
            }
            

            currentChartData.value = {
                label: 'Current',
                data: {
                    x: timestamps,
                    y: currentdata
                }
            }
            

            voltageChartData.value ={
                label: 'Voltage',
                data: {
                    x: timestamps,
                    y: voltagedata
                }
            }
            
            
            reactivePowerChartData.value = {
                label: 'Reactive Power',
                data: {
                    x: timestamps,
                    y: reactivepowerdata
                }
            }
            

            frequencyChartData.value = {
                label: 'Frequency',
                data: {
                    x: timestamps,
                    y: frequencydata
                }
            }

            loadingChartData.value = {
                label: 'Average Loading',
                data: {
                    x: timestamps,
                    y: loadingdata
                }
            }
        }
    }
}

const intervalID = ref(null)

watch(() => appStore.average_values, (newVal, oldVal) => {
    updateValues(newVal, oldVal)
})

// onMounted(() => {
//     if(appStore.average_values == null){
//         //get_latest_transformer_data('http://localhost:8000/data/transformers/latest/', appStore)
//        // get_average_values('http://localhost:8000/data/transformers/average_values/', appStore)
//         // get_latest_transformer_data('https://fyp-backend-ot0p.onrender.com/data/transformers/latest/', appStore)
//         // get_average_values('https://fyp-backend-ot0p.onrender.com/data/transformers/average_values/', appStore)
        

//         intervalID.value = setInterval(()=>{
//            // get_latest_transformer_data('http://localhost:8000/data/transformers/latest/', appStore)
//            // get_average_values('http://localhost:8000/data/transformers/average_values/', appStore)
//             // get_latest_transformer_data('https://fyp-backend-ot0p.onrender.com/data/transformers/latest/', appStore)
//         // get_average_values('https://fyp-backend-ot0p.onrender.com/data/transformers/average_values/', appStore)
//         }, 30000)
//     } else {
//         updateValues(appStore.average_values)
//         intervalID.value = setInterval(()=>{
//             //get_latest_transformer_data('http://localhost:8000/data/transformers/latest/', appStore)
//            // get_average_values('http://localhost:8000/data/transformers/average_values/', appStore)
//             // get_latest_transformer_data('https://fyp-backend-ot0p.onrender.com/data/transformers/latest/', appStore)
//         // get_average_values('https://fyp-backend-ot0p.onrender.com/data/transformers/average_values/', appStore)
//         }, 30000)
//     }
// })

// onUnmounted(() => {
//     clearInterval(intervalID.value)
// })

</script>