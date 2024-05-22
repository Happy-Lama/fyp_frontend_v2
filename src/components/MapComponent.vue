<template>
    <div id="map" style="height: 100vh;">
        <!-- {{ transformers }} -->
    </div>

</template>

<script setup>

import router from '@/router';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { watch } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';

//props
const props = defineProps(['transformers']);

//data
const transformers = ref(props.transformers);
const map = ref(null)
const mapmarkers = ref([]);
const transformer_locations = ref(null)


//custom icon markers

const operationalIcon = L.icon({
    iconUrl: '/operationalIcon.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
});

const faultyIcon = L.icon({
    iconUrl: '/faultyIcon.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
});



function updateMarkers(){
    console.log('Updating map markers')
    //marker for each transformer received
    let locations = []
    // let markers = new L.FeatureGroup()
    transformers.value.forEach((transformer) => {
        
        let mapmarker = L.marker(transformer.location.position, {
            icon: transformer.location.operational ? operationalIcon : faultyIcon
        });
        
        locations.push(transformer.location.position)

        mapmarker.bindTooltip(`Percentage Loading: ${transformer.data.loading.toFixed(4)}<br/>Status: ${transformer.location.operational ? 'Operational': 'Faulty'}`);

        // mapmarker.on('mouseover', () => {
        //     this.openTooltip();
        // });

        // mapmarker.on('mouseout', () => {
        //     this.closeTooltip();
        // });
        mapmarker.on('click', () => {
            console.log(transformer.devUID);
            transformerStats(transformer.devUID);
        })
        mapmarkers.value.push(mapmarker)
        // mapmarker.addTo(markers)
    });

    if(locations){
        console.log(locations)
        let bounds = L.latLngBounds(locations)
        // let bounds2 = markers.getBounds()
        // console.log(bounds2.isValid())
        // console.log(bounds.isValid())
        if(map.value){
            map.value.fitBounds(bounds)
        }
    }
}


watch(() => props.transformers, (newVal, oldVal) => {
    console.log('Transformers have changed')
    transformers.value = newVal
    updateMarkers();
    mapmarkers.value.forEach((mapmarker)=>{
        mapmarker.addTo(map.value);
        console.log('Added to map')
    });
}) 




onMounted(() => {
    map.value = L.map('map').setView([0.34759640, 32.58251970], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
    // transformers.value = props.transformers;
    // updateMarkers();
    mapmarkers.value.forEach((mapmarker)=>{
        mapmarker.addTo(map.value);
        console.log('Added to map')
    });
    // updateMarkers();
    // map.value.fitBounds(mapmarkers.value)
});



const transformerStats = (transformer_id) => {
    router.push({name: 'transformerstats', params: {transformerDevUID: transformer_id}})
} 

</script>