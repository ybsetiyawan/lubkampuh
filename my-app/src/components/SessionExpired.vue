<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="headline">Session Expired</v-card-title>
        <v-card-text>
          Your session has expired. Please log in again.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="goToLogin">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
      };
    },
    methods: {
      goToLogin() {
        this.dialog = false; // Menutup dialog
        this.$router.push('/login'); // Mengarahkan pengguna ke halaman login
      },
      showDialog() {
        this.dialog = true; // Menampilkan dialog
      },
    },
  };
  </script>
