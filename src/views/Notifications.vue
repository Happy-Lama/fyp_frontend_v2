<template>
    <!-- <h1> Not implemented yet</h1> -->
    <v-container>
        <v-row>
            <v-combobox
                :items="filterOptions"
                v-model="option"
                variant="outlined"
            ></v-combobox>
        </v-row>
        <v-row v-for="notification in notifications" class="mb-5"> 
            <v-alert
                :type="notification.notification_type === 'DANGER' ? 'error': notification.notification_type === 'WARN' ? 'warning': 'info'"
            >
                <v-alert-title>
                    {{ notification.notification_type }} ({{notification.timestamp}})
                </v-alert-title>
                <v-alert-text>
                    {{ notification.message }}
                </v-alert-text>
            </v-alert>
        </v-row>
    </v-container>
</template>
    

<script setup>

import { useAppStore } from '@/store/app'
import { VueElement } from 'vue';
import { onMounted } from 'vue';
import { watch, ref } from 'vue';

const appStore = useAppStore()
const notifications = ref([])
const filterOptions = ref(['Latest', 'All'])

const option = ref('Latest')

watch(() => appStore.notifications, (newVal, oldVal) => {
    console.log("Received New Notifications")
    if(newVal !== oldVal){
        console.log("Updating Notifications")
        newVal.forEach((notification) => {
            if(notifications.value){
                if( notifications.value.every(notif => notif.id != notification.id)){
                    let new_notifications = notifications.value
                    if(new_notifications.length == 100){
                        new_notifications.pop()
                    }
                    new_notifications.unshift(notification)
                    notifications.value = new_notifications
                }
            } else {
                notifications.value = newVal
            }
        })
    }
})

// watch(option, (newVal, oldVal) => {
//     if(newVal === 'Latest'){
//         // get_notifications('http://localhost:8000/dashboard/notifications/latest/', appStore)
//         // get_notifications('https://fyp-backend-ot0p.onrender.com/dashboard/notifications/latest/', appStore)
//     }
//     if(newVal === 'All'){
//         // get_notifications('http://localhost:8000/dashboard/notifications/all/', appStore)
//         // get_notifications('https://fyp-backend-ot0p.onrender.com/dashboard/notifications/latest/', appStore)
//     }
// })

// onMounted(() => {
//     notifications.value = appStore.notifications
// })

</script>