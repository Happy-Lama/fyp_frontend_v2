<template>
    <v-card>
        <v-card-title>
            {{ chartTitle || "Chart Title" }}
        </v-card-title>
        <Line :data="chartData" :options="chartOptions"></Line>
    </v-card>    
</template>

<script setup>
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { ref, watch, onMounted } from 'vue'

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
)

const props = defineProps(['chartData', 'chartTitle', 'dataType'])
const emit = defineEmits(['loaded'])

const chartData = ref({
    labels: [], 
    datasets: [
        {
            label: [], 
            backgroundColor: "#f80000",
            borderColor: "#f80000",
            data: []
        }
    ]
})


watch(() => props.chartData, (newVal) => {
    // console.log('Old Value', chartData.value)
    chartData.value = {
        labels: newVal.timestamps, 
        datasets: [
            {
                label: "Min", 
                backgroundColor: "#0000ff",
                borderColor: "#0000ff",
                data: newVal.min
            },
            {
                label: "Mean", 
                backgroundColor: "#00ff00",
                borderColor: "#00ff00",
                data: newVal.mean
            },
            {
                label: "Max", 
                backgroundColor: "#ff0000",
                borderColor: "#ff0000",
                data: newVal.max
            }
        ]
    }
    // console.log('New Value', chartData.value)
})

const chartOptions = ref({
    responsive: true,
    maintainAspectRation: true,
    scales: {
        x: {
            title : {
                display: true,
                text: "Time"
            }, 
            ticks : {
                display: false,
            }
        },
        y: {
            title : {
                display: true,
                text: "Y-Axis"
            },
            ticks : {
                callback: function(value, index, ticks) {
                        if (props.dataType === "voltage"){
                            return value + "V";
                        }
                        if(props.dataType === "current"){
                            return value + "A";
                        }
                        if(props.dataType === "power"){
                            return value.toFixed(2) + "kW";
                        }
                        if(props.dataType === "reactive_power"){
                            return value.toFixed(2) + "kVAR";
                        }
                        if(props.dataType === "frequency"){
                            return value + "Hz";
                        }
                        if(props.dataType === "loading_percentage"){
                            return value + "%";
                        }
                        return value;
                    } 
            }
        }
    }
})

onMounted(() => {
    emit('loaded')
})
</script>
  