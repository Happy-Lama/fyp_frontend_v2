<template>
    <RouterLink to='/'>
        <h2>
            Back to Home
        </h2>
    </RouterLink>
    <LoadingScreen v-if="isLoading"></LoadingScreen>
    <h2> Transformer {{  route.params.transformerDevUID }} </h2>
    <v-container>
        <v-row>

                <v-card width="100%" class="ma-8" >
                    
                    <ChartComponent :chartData="out_u"  dataType="voltage" chartTitle="Voltage" page="tstat"/>
                </v-card>
                
             
                <v-card width="100%" class="ma-8" >
                    <ChartComponent :chartData="out_i"  dataType="current" chartTitle="Current" page="tstat"/>
                </v-card>

               
                <v-card width="100%" class="ma-8" >
                    <ChartComponent :chartData="out_freq"  dataType="frequency" chartTitle="Frequency" page="tstat"/>
                </v-card>
     
        </v-row>
    </v-container>

</template>

<script setup>
// import CircularChartComponent from '@/components/CircularChartComponent.vue';
import ChartComponent from '@/components/ChartComponent.vue'
// import BarChartComponent from '@/components/BarChartComponent.vue';
import { ref, onMounted, watch } from 'vue';
import { useTransformerDataStore } from '@/store/app';
import { get_transformer_data } from '@/httpservice';
import LoadingScreen from '@/components/LoadingScreen.vue'
import { useRoute } from 'vue-router';
// const barChartData = ref([])
const transformerDataStore = useTransformerDataStore();
const isLoading = ref(null)
const expand = ref(null)
const out_u = ref({
    a: [],
    b: [],
    c: [],
    timestamps: []
})
const out_i = ref({
    a: [],
    b: [],
    c: [],
    timestamps: []
})

const out_freq = ref({
    freq: [],
    timestamps: []
})



function updateValues(values, oldVal){
    let ua = []
    let ub = []
    let uc = []
    let ia = []
    let ib = []
    let ic = []
    let freq = []
    let timestamps = []
    values.forEach((value) => {
        ua.push(value.out_ua)
        ub.push(value.out_ub)
        uc.push(value.out_uc)
        ia.push(value.out_ia)
        ib.push(value.out_ib)
        ic.push(value.out_ic)
        freq.push(value.out_freq)
        timestamps.push(value.timestamp)
    })

    out_u.value = {
        a : ua,
        b: ub,
        c: uc,
        timestamps: timestamps
    }

    out_i.value = {
        a : ia,
        b: ib,
        c: ic,
        timestamps: timestamps
    }

    out_freq.value = {
        freq: freq,
        timestamps: timestamps
    }
}

watch(() => transformerDataStore.transformer_data, (newVal, oldVal) => {
    updateValues(newVal, oldVal)
})

const route = useRoute()
onMounted(() => {
    
    console.log(route.params.transformerDevUID)
    get_transformer_data(`/dashboard/transformers/${route.params.transformerDevUID}/`, transformerDataStore)
})

</script>