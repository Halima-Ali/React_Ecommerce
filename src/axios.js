import axios from "axios";

const instance = axios.create({
 baseUrl : '...'  // the api cloud function url
});

export default instance;

// http://127.0.0.1:5001/ecommerce-6b823/us-central1/api