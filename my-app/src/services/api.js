import store from '../store'; // Import store untuk mengakses commit
import axios from 'axios';
import { EventBus } from '../eventBus'; // Import event bus

const api = axios.create({
  baseURL: 'http://localhost:4000/', // Ganti dengan basis URL Anda
});

api.interceptors.response.use(
  response => response,
  error => {
      console.log('Interceptor error:', error); // Log error untuk debugging
      if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
              console.log('Token expired or access denied, logging out...');
              store.commit('setLogout'); // Melakukan logout menggunakan setLogout aplikasi
              EventBus.$emit('sessionExpired'); // Emit event untuk menampilkan dialog
          }
      }
      return Promise.reject(error);
  }
);

export default api;