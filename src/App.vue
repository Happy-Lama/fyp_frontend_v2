<template>
  <router-view />
</template>

<script setup>
import { watch, ref } from 'vue';
import { useAppStore, useTransformerDataStore } from './store/app';
import router from './router';
import { onMounted } from 'vue';
import { get_notifications, getURI, getWebSocketURI, get_latest_transformer_data, get_moving_average_values, get_average_values } from './httpservice';
import { onUnmounted } from 'vue';


const appStore = useAppStore();
const transformerDataStore = useTransformerDataStore()
let intervalID = ref(null)
const token = ref(null)

import { initializeApp } from "firebase/app";

import { getMessaging, getToken, onMessage} from 'firebase/messaging';
// import { ref } from 'vue';

const firebaseConfig = {
  apiKey: "AIzaSyDHUQjhL3ZTGRABKBg2O4saS1Ve4StvY_g",
  authDomain: "fyppush-f9a64.firebaseapp.com",
  projectId: "fyppush-f9a64",
  storageBucket: "fyppush-f9a64.appspot.com",
  messagingSenderId: "647988498605",
  appId: "1:647988498605:web:78856978d24976a14b3624",
  measurementId: "G-ZTF7LZETFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
});


getToken(messaging, { vapidKey: 'BIB3GyustUsKi1cb9qe_MV-n5a1zFezDpuHMLHnJfYnO5Ki2AHXcJItLA82lQSQCatD6Bko8IGzfKsUNN3qp5tk' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    
    console.log(currentToken)
    const uri = getURI()
    // fetch(`${uri}/dashboard/subscribe/${currentToken}`).then((response) => {
    //   console.log(response.json())
    // })
    token.value = currentToken
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  
});

const websocketURI = getWebSocketURI()

const socket = new WebSocket(websocketURI)

socket.onopen = () => {
  console.log("Websocket connection established")
} 

socket.onclose = () => {
  console.log("Websocket connection closed")
}

function resolve_socket_events(event_type){
  switch(event_type){
    case 'new_transformer_data':
      get_latest_transformer_data('/dashboard/transformers/latest/', transformerDataStore)
      get_average_values('/dashboard/transformers/data/', transformerDataStore);
      get_moving_average_values('/dashboard/transformers/data/average/', transformerDataStore);
      break;
    case 'new_notification':
      get_notifications('/dashboard/notifications/latest/', appStore)
      break;
    default:
      console.log(event_type, "not supported yet")
      break;
  }
}

socket.onmessage = (event_data) => {
  console.log("New Event: ", event_data)
  resolve_socket_events(event_data.data)
}


</script>
