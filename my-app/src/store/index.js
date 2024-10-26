import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router';
import api from '../services/api'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: JSON.parse(localStorage.getItem('userData')) || {
      username: '',
      role_id: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      token: '',
    },
  },
 
  mutations: {
    setUserData(state, payload) {
    state.userData = {
      username: payload.username,
      role_id: payload.role_id,
      name: payload.name,
      address: payload.address,
      phone: payload.phone,
      email: payload.email,
      token: payload.token,
    };
    localStorage.setItem('userData', JSON.stringify(state.userData));
  },
    logout(state) {
      state.userData = {
        username: '',
        role_id: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        token: '',
      }
      localStorage.removeItem('userData');
    },
    setMaterial(state, data) {
      state.material = data; // Menyimpan data pengguna ke state
    },
    setLogout(state) {
        state.userData = {
            username: '',
            role_id: '',
            name: '',
            address: '',
            phone: '',
            email: '',
            token: '',
        };
        localStorage.removeItem('userData'); // Menghapus data dari localStorage
    },
  },
  actions: {
    setUserData({ commit }, userData) {
      console.log('userData', userData);
      commit('setUserData', userData);
    },
    logout({ commit }) {
      commit('logout');
      if (router.currentRoute.path !== '/login') {
        router.push('/login');
      }
    },
    async getMaterial({ commit, state }) { // Menambahkan state ke parameter
      const token = state.userData.token; // Mengambil token dari state
      const response = await api.get('/m_material', {
        headers: {
          Authorization: `Bearer ${token}` // Menambahkan token ke header
        }
      });
      const data = response.data;
      commit('setMaterial', data);
    },
  },
  
  getters: {
    getUserData: (state) => state.userData,
    isLoggedIn: (state) => !!state.userData.username,
    getMaterialData: (state) => state.material, // Mengembalikan data pengguna
    getRoleId: (state) => state.userData.role_id


  },
  modules: {
    
  }
})
