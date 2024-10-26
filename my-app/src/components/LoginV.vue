<template>
    <v-container fill-height>
      <v-row justify="center" align="center">
        <v-col cols="10" sm="6" md="4">
          <v-card class="custom-card">
            <v-card-title class="text">Login</v-card-title>
            <v-divider/>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  label="Username"
                  prepend-icon="mdi-account"
                  v-model="loginData.username"
                  :disabled="isLoading"
                  
                ></v-text-field>
                <v-text-field
                  label="Password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="loginData.password"
                  :disabled="isLoading"
                ></v-text-field>
                <v-btn color="grey" :disabled="isLoading" class="flex align-center justify-center">
                  <v-progress-circular
                    v-if="isLoading"
                    indeterminate
                    color="pink"
                    size="26"
                    class="mr-1"
                  ></v-progress-circular>
                  <span @click="login" v-if="!isLoading">Login</span>
                  <span v-else >Loading...</span>
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
import api from '../services/api.js'
import Swal from 'sweetalert2'

import { mapActions } from 'vuex';

export default {
    data() {
    return {
      valid: true,
      isLoading: false, // State untuk loading
      loginData: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions(['setUserData']),
    login() {
        this.isLoading = true;
        setTimeout(() => {
            api.post('/auth/login', this.loginData)
                .then(response => {
                    this.loginDetail = response.data
                    // console.log(this.loginDetail)

                    // Check if userdetail is null
                    if (!this.loginDetail.userdetail) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'User details not found. Cannot login.',
                            showConfirmButton: false,
                            timer: 2000,
                            toast: true,
                            width: '400px',
                            background: '#EF9A9A',
                            color: '#fff',
                            padding: '16px',
                            iconColor: '#fff',
                        });
                        this.isLoading = false; // Stop loading
                        return; // Exit the function
                    }

                    this.setUserData({
                        username: this.loginDetail.user.username,
                        role_id: this.loginDetail.user.role_id,
                        name: this.loginDetail.userdetail.name,
                        address: this.loginDetail.userdetail.address,
                        phone: this.loginDetail.userdetail.phone_number,
                        email: this.loginDetail.userdetail.email,
                        token: this.loginDetail.token
                    });
                    // Menangkap pesan sukses dari backend
                    const successMessage = response.data.message;
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: successMessage,
                        showConfirmButton: false,
                        timer: 2000,
                        toast: true,
                        width: '400px',
                        background: '#B0BEC5',
                        color: '#fff',
                        padding: '16px',
                        iconColor: '#fff',
                    });
                    this.$router.push('/');
                    // location.reload();
                })
                .catch(error => {
                    const errorMessage = error.response.data.message; // Corrected to use error.response
                    // Menangkap pesan error dari backend
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: errorMessage,
                        showConfirmButton: false,
                        timer: 2000,
                        toast: true,
                        width: '400px',
                        background: '#EF9A9A',
                        color: '#fff',
                        padding: '16px',
                        iconColor: '#fff',
                    });
                })
                .finally(() => {
                    console.log('Loading ended');
                    this.isLoading = false; // Loading selesai
                });
        }, 1000);
    }
  },
}
</script>

<style scoped>
.custom-card {
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0,0,0,2.5) !important;
}
</style>
