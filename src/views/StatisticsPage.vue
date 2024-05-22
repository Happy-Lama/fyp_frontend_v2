<template>
    <LoadingScreen v-if="isLoading"></LoadingScreen>
    <v-container>
        <span class="text-h2">Overall Transformer Statistics</span>
        <v-row  class="pa-5 mt-2" align="start">
            <v-col cols="md-4" class="mb-5 pb-5 px-5">
                <v-row>
                    <v-card class="text-center pa-1" width="100%" variant="flat">
                        <v-card-title>
                            Number of Installed Modules
                        </v-card-title>
                        <v-card-text class="text-h1 pa-10">
                            {{ transformer_stats.installed }}
                        </v-card-text>
                    </v-card>
                    <v-card height="29rem" class="pb-15 mt-5" width="100%" variant="flat">
                        <v-card-title>
                            Transformer Status Statistics
                        </v-card-title>
                        <BarChartComponent :chartData="[transformer_stats.installed, transformer_stats.overloaded, transformer_stats.offline]"/>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="md-4">
                <v-row>
                    <v-card class="text-center pa-1" width="100%" variant="flat">
                        <v-card-title  >
                            <!-- Parameter type -->
                            <span class="text-h4">Loading (%)</span>
                        </v-card-title>
                        <v-card-text>
                            <v-card title="Average" class="text-center pa-2 mb-2 " variant="outlined">
                                <!-- average value -->
                                <h1>{{ (loading_stats.average *100).toFixed(2) }}</h1>
                            </v-card>
                            <v-row align="center" dense="true">
                                <v-col cols="md-6" >
                                    <v-card title="Min" class="text-center" variant="outlined">
                                        <!-- min value -->
                                        <v-card :title="(loading_stats.min *100).toFixed(2)" class="pb-2">
                                            <!-- associated transformer -->
                                            <v-divider class="mb-2"></v-divider>
                                            Transformer {{ loading_stats.transformer_min }}
                                        </v-card>
                                    </v-card>
                                </v-col>
                                <v-col cols="md-6">
                                    <v-card title="Max" variant="outlined">
                                        <!-- max value -->
                                        <v-card :title="(loading_stats.max *100).toFixed(2)" class="pb-2">
                                            <!-- associated transformer -->
                                            <v-divider class="mb-2"></v-divider>
                                            Transformer {{ loading_stats.transformer_max }}
                                        </v-card>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-row>
                <v-row>
                    <v-card class="text-center pa-1" width="100%" variant="flat">
                        <v-card-title  >
                            <!-- Parameter type -->
                            <span class="text-h4">Frequency (Hz)</span>
                        </v-card-title>
                        <v-card-text>
                            <v-card title="Average" class="text-center pa-2 mb-2 " variant="outlined">
                                <!-- average value -->
                                <h1>{{ frequency_stats.average.toFixed(2) }}</h1>
                            </v-card>
                            <v-row align="center" dense="true">
                                <v-col cols="md-6" >
                                    <v-card title="Min" class="text-center" variant="outlined">
                                        <!-- min value -->
                                        <v-card :title="frequency_stats.min.toFixed(2)" class="pb-2">
                                            <!-- associated transformer -->
                                            <v-divider class="mb-2"></v-divider>
                                            Transformer {{ frequency_stats.transformer_min }}
                                        </v-card>
                                    </v-card>
                                </v-col>
                                <v-col cols="md-6">
                                    <v-card title="Max" variant="outlined">
                                        <!-- max value -->
                                        <v-card :title="frequency_stats.max.toFixed(2)" class="pb-2">
                                            <!-- associated transformer -->
                                            <v-divider class="mb-2"></v-divider>
                                            Transformer {{ frequency_stats.transformer_min }}
                                        </v-card>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="md-4">
                <v-card class="text-center px-1 pb-1" width="100%" variant="flat">
                    <v-card-title>Phase Voltages</v-card-title>
                        <v-table width="100%">
                        <thead>
                            <tr>
                                <th>
                                    Phase
                                </th>
                                <th>
                                    Average(V)
                                </th>
                                <th>
                                    Min(V)
                                </th>
                                <th>
                                    Max(V)
                                </th>
                                <th>
                                    Min Associated Transformer(ID)
                                </th>
                                <th>
                                    Max Associated Transformer(ID)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Ua
                                </td>
                                <td>
                                    {{ phase_voltage_stats.ua.average.toFixed(2) }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.ua.min.toFixed(2) }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.ua.max.toFixed(2) }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.ua.transformer_min }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.ua.transformer_max }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Ub
                                </td>
                                <td>
                                    {{ phase_voltage_stats.ub.average.toFixed(2) }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.ub.min.toFixed(2) }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.ub.max.toFixed(2) }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.ub.transformer_min }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.ub.transformer_max }}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Uc
                                </td>
                                <td>
                                    {{ phase_voltage_stats.uc.average.toFixed(2) }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.uc.min.toFixed(2) }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.uc.max.toFixed(2) }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.uc.transformer_min }}
                                </td>
                                <td>
                                    {{ phase_voltage_stats.uc.transformer_max }}
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
        </v-row>
        <v-row>

                <v-card width="100%" class="ma-8" >
                    
                    <ChartComponent :chartData="loading_moving_average"  dataType="loading_percentage" chartTitle="Loading History"/>
                </v-card>
                
             
                <v-card width="100%" class="ma-8" >
                    <ChartComponent :chartData="frequency_moving_average"  dataType="frequency" chartTitle="Frequency History" />
                </v-card>

               
                <v-card width="100%" class="ma-8" >
                    <ChartComponent :chartData="phase_ua_moving_average"  dataType="voltage" chartTitle="Phase Ua History" />
                </v-card>

               
                <v-card width="100%" class="ma-8" >
                    <ChartComponent :chartData="phase_ub_moving_average"  dataType="voltage" chartTitle="Phase Ub History" />
                </v-card>

                <v-card width="100%" class="ma-8" >
                    <ChartComponent :chartData="phase_uc_moving_average"  dataType="voltage" chartTitle="Phase Uc History" />
                </v-card>
     
        </v-row>
    </v-container>

</template>

<script setup>
// import CircularChartComponent from '@/components/CircularChartComponent.vue';
import ChartComponent from '@/components/ChartComponent.vue'
import BarChartComponent from '@/components/BarChartComponent.vue';
import { ref, onMounted, watch } from 'vue';
import { useTransformerDataStore } from '@/store/app';
import { get_average_values, get_moving_average_values } from '@/httpservice';
import LoadingScreen from '@/components/LoadingScreen.vue'

// const barChartData = ref([])
const transformerDataStore = useTransformerDataStore();
const isLoading = ref(null)
const expand = ref(null)
const transformer_stats = ref({
    installed: 0,
    online: 0,
    offline: 0,
    overloaded: 0
})

const loading_stats = ref({
    average: 0,
    min: 0,
    max: 0,
    transformer_min: "",
    transformer_max: ""
})

const frequency_stats = ref({
    average: 0,
    min: 0,
    max: 0,
    transformer_min: "",
    transformer_max: ""
})

const phase_voltage_stats = ref({
    ua: {
        average: 0,
        min: 0,
        max: 0,
        transformer_min: "",
        transformer_max: ""
    },
    ub: {
        average: 0,
        min: 0,
        max: 0,
        transformer_min: "",
        transformer_max: ""
    },
    uc: {
        average: 0,
        min: 0,
        max: 0,
        transformer_min: "",
        transformer_max: ""
    }, 
})
const loading_moving_average = ref({
    mean: [],
    min: [],
    max: [],
    timestamps: []
})

const frequency_moving_average = ref({
    mean: [],
    min: [],
    max: [],
    timestamps: []
})

const phase_ua_moving_average = ref({
    mean: [],
    min: [],
    max: [],
    timestamps: []
})

const phase_ub_moving_average = ref({
    mean: [],
    min: [],
    max: [],
    timestamps: []
})
const phase_uc_moving_average = ref({
    mean: [],
    min: [],
    max: [],
    timestamps: []
})

function updateAverageValues(average_values){
    transformer_stats.value = {
        installed: average_values.number_registered,
        online: average_values.number_on,
        offline: average_values.number_off,
        overloaded: average_values.number_overloaded,
    }

    loading_stats.value = {
        average: average_values.avg_loading,
        min: average_values.min_loading.percentage_loading,
        max: average_values.max_loading.percentage_loading,
        transformer_min: average_values.min_loading.transformer_id,
        transformer_max: average_values.min_loading.transformer_id
    }

    frequency_stats.value = {
        average: average_values.avg_freq,
        min: average_values.min_freq.out_freq,
        max: average_values.max_freq.out_freq,
        transformer_min: average_values.min_freq.transformer_id,
        transformer_max: average_values.max_freq.transformer_id
    }

    phase_voltage_stats.value = {
        ua: {
            average: average_values.avg_ua,
            min: average_values.min_ua.out_ua,
            max: average_values.max_ua.out_ua,
            transformer_min: average_values.min_ua.transformer_id,
            transformer_max: average_values.max_ua.transformer_id
        },

        ub: {
            average: average_values.avg_ub,
            min: average_values.min_ub.out_ub,
            max: average_values.max_ub.out_ub,
            transformer_min: average_values.min_ub.transformer_id,
            transformer_max: average_values.max_ub.transformer_id
        },

        uc: {
            average: average_values.avg_uc,
            min: average_values.min_uc.out_uc,
            max: average_values.max_uc.out_uc,
            transformer_min: average_values.min_uc.transformer_id,
            transformer_max: average_values.max_uc.transformer_id
        },
    }
}


function updateMovingAverageValues(moving_average_values){
    // switch (stats) {
        // case 'loading':
    loading_moving_average.value = {
        mean: Object.values(moving_average_values["('loading_percentage', 'mean')"]),
        min: Object.values(moving_average_values["('loading_percentage', 'min')"]),
        max: Object.values(moving_average_values["('loading_percentage', 'max')"]),
        timestamps: Object.keys(moving_average_values["('loading_percentage', 'mean')"])
    }
            // console.log(stats)
            // console.log(loading_moving_average.value)
            // break;
        // case 'frequency':
    frequency_moving_average.value = {
        mean: Object.values(moving_average_values["('out_freq', 'mean')"]),
        min: Object.values(moving_average_values["('out_freq', 'min')"]),
        max: Object.values(moving_average_values["('out_freq', 'max')"]),
        timestamps: Object.keys(moving_average_values["('out_freq', 'mean')"])
    }
            // break;
        // case 'ua':
    phase_ua_moving_average.value = {
        mean: Object.values(moving_average_values["('out_ua', 'mean')"]),
        min: Object.values(moving_average_values["('out_ua', 'min')"]),
        max: Object.values(moving_average_values["('out_ua', 'max')"]),
        timestamps: Object.keys(moving_average_values["('out_ua', 'mean')"])
    }
            // break;
        // case 'ub':
    phase_ub_moving_average.value = {
        mean: Object.values(moving_average_values["('out_ub', 'mean')"]),
        min: Object.values(moving_average_values["('out_ub', 'min')"]),
        max: Object.values(moving_average_values["('out_ub', 'max')"]),
        timestamps: Object.keys(moving_average_values["('out_ub', 'mean')"])
    }
            // break;
        // case 'uc':
    phase_uc_moving_average.value = {
        mean: Object.values(moving_average_values["('out_uc', 'mean')"]),
        min: Object.values(moving_average_values["('out_uc', 'min')"]),
        max: Object.values(moving_average_values["('out_uc', 'max')"]),
        timestamps: Object.keys(moving_average_values["('out_uc', 'mean')"])
    }

}
watch(() => transformerDataStore.average_values, (newVal) => {
    updateAverageValues(newVal)
})

watch(() => transformerDataStore.moving_average_values, (newVal) => {
    
    updateMovingAverageValues(newVal)
})

// watch(() => expand, (newVal) => {
//     get_moving_average_values('/dashboard/transformers/data/average/', transformerDataStore);
//     // updateMovingAverageValues(transformerDataStore.moving_average_values)
// })
onMounted(() => {
    if(transformerDataStore.average_values == null){
        isLoading.value = true;
        get_average_values('/dashboard/transformers/data/', transformerDataStore);
        get_moving_average_values('/dashboard/transformers/data/average/', transformerDataStore);
        isLoading.value = false;
        
    } else {
        // console.log(transformerDataStore.average_values)
        // console.log(transformerDataStore.moving_average_values)
        updateAverageValues(transformerDataStore.average_values)
        updateMovingAverageValues(transformerDataStore.moving_average_values)
    }
})

</script>