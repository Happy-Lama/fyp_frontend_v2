import axios from 'axios';
// import { useAppStore } from '@/store/app';
import router from '@/router';


// const appStore = useAppStore();
const getURI = () => {
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    const hostname = window.location.protocol === 'https:' ? 'fyp-server-django.onrender.com' : window.location.hostname;
    const port = window.location.port ? `:${8000}` : '';
    return `${protocol}//${hostname}${port}`;
};

const getWebSocketURI = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const hostname = window.location.protocol === 'https:' ? 'fyp-server-django.onrender.com' : window.location.hostname;
    const port = window.location.port ? `:${8000}` : '';
    return `${protocol}//${hostname}${port}/ws/notifications/`;
};

function login(url, formData, store){
    //send login request
    axios.post(url, formData, {
        headers: {
            'X-CSRFtoken': store.csrfToken,
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    }).then((response) => {
        console.log("Data", response.data)
        store.logged_in = true;
        store.user = response.data['user']
        router.push({ name: 'Home' })
    }).catch((error) => {
        console.error(error);
        alert("Wrong password or email")
    });
}

function get_csrf_token(url, store){
    axios.get(url)
    .then((response) => {
        console.log(response.data)
        store.csrfToken = response.data['csrfToken']
        console.log("Stored Token", store.csrfToken)
        document.cookie = `csrftoken=${store.csrfToken}; path=/`
    })
    .catch((error) => {
        console.error(error);
    })
}

function register(url, formData, store){
    axios.post(url, formData, {
        headers: {
            'X-CSRFtoken': store.csrfToken,
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    }).then((response) => {
        console.log("Data", response.data)
        alert("Transformer Successfully registered")
    }).catch((error) => {
        console.error(error);
        alert("Failed to register Transformer")
    });    
}

function get_latest_transformer_data(url, store){
    let uri = getURI()
    axios.get(uri + url)
    .then((response) => {
        console.log(response.data)

        store.transformer_latest_data = response.data.latest_data
    })
    .catch((error) => {
        console.error(error);
    })    
}

function get_average_values(url, store){
    let uri = getURI()
    // axios.get(uri + url)
    axios.get(uri + url)
    .then((response) => {
        console.log(response.data)
        store.average_values = response.data['overall_stats']
        console.log("Average Values: ",store.average_values)
        // store.moving_average_values = response.data['moving_average_values']
    })
    .catch((error) => {
        console.error(error);
    }) 
}
function get_moving_average_values(url, store){
    let uri = getURI()
    // axios.get(uri + url)
    axios.get(uri + url)
    .then((response) => {
        console.log(response.data)
        store.moving_average_values = response.data['data']
        console.log("Moving Average Values: ",store.moving_average_values)
        // store.moving_average_values = response.data['moving_average_values']
    })
    .catch((error) => {
        console.error(error);
    }) 
}

function logout(url, store){
    let formData = new FormData()
    formData.append('username', store.user.username)
    axios.post(url, formData, {
        headers: {
            'X-CSRFtoken': store.csrfToken,
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    })
    .then(response => {
        // Handle the success response
        console.log(response.data);
        store.user = null
    })
    .catch(error => {
        // Handle the error response
        console.error(error.response.data);
    });
}

function get_notifications(url, store){
    let uri = getURI()
    // axios.get(uri + url)
    axios.get(uri + url)
    .then((response) => {
        console.log(response.data)
        store.notifications = response.data['notifications']
    })
    .catch((error) => {
        console.error(error);
    }) 
}

export { login, get_csrf_token, register, get_latest_transformer_data, get_average_values, logout, get_notifications, getURI, getWebSocketURI, get_moving_average_values }
