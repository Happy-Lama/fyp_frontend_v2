<template>
    <v-card variant="flat" align="center">
        <v-card-title>
            Current Transformer Status
        </v-card-title>
        <Doughnut :data="chartData" :options="chartOptions" style="max-height: 100vh;"/>
    </v-card>    
</template>

<script setup>

import  { Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import { Doughnut } from "vue-chartjs";
import { ref, watch } from 'vue';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps(['chartData'])

const chartData = ref({
    labels: ["Online Transformers", "Offline Transformers"],
    datasets: [
        {
            backgroundColor: ["#00ff00", "#ff0000"],
            data: [0, 0]
        }
    ]
});
const chartOptions = ref({
    responsive: true,
    cutout: 100,
    radius: 150,
});

watch(() => props.chartData, (newVal, oldVal) => {
    chartData.value = {
        labels: ["Online Transformers", "Offline Transformers"],
        datasets: [
            {
                backgroundColor: ["#00ff00", "#ff0000"],
                data: [newVal.online, newVal.offline]
            }
        ]
    }
    // console.log(props.chartData)
    // console.log(chartData.value)
})

const centerText = function(chart) {
        var width = chart.chart.width;
        var height = chart.chart.height;
        var ctx = chart.chart.ctx;

        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

        var text = 800;
        var textX = Math.round((width - ctx.measureText(text).width) / 2);
        var textY = height / 2;

         ctx.fillText(text, textX, textY);
         ctx.save();
}

</script>