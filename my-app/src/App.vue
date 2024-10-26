<template>
  <v-app>
    <v-navigation-drawer
      app
      v-if="user"
      absolute
      width="280"
    >
      

      <v-divider></v-divider>
     
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-group v-if="item.subItems" no-action sub-group>
            <template v-slot:activator></template>
            <v-list-item v-for="subItem in item.subItems" :key="subItem.title" :to="subItem.link" class="pl-2">
              <v-list-item-icon>
                <v-icon> {{ subItem.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ subItem.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar
      v-if="user"
      app
      color="grey"
      dark
      height="50"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="30"
        />

        <v-btn
        text
      >
        <span>LAB UJI BAHAN KAMPUH INDONESIA</span>
      </v-btn>
      

      </div>

      <v-spacer></v-spacer>
      <v-btn
        v-if="user"
        small
        text
        @click="dialog.value = true"
        outlined
        elevation="5"
        class="mr-1"
      >
        <span>Hello, {{ user }} </span>

      </v-btn>


      <v-btn
          v-if="user"
          small
          text
          @click="logout"
          title="Logout"
          outlined
          elevation="10">
        <v-icon >mdi-logout</v-icon>

      </v-btn>

     
    </v-app-bar>

    <v-main>
      <SessionExpired ref="sessionDialog" />
      <router-view/>
    </v-main>
    <v-footer app class="footer"
      v-if="user"
      style="background-color: grey;"
      dark
      height="25"
    >
      <span>
        &copy; 2024 - LAB UJI BAHAN KAMPUH INDONESIA
      </span>
      <v-spacer></v-spacer>

      <span v-if="user">
        <v-icon>mdi-account-details</v-icon>
        {{ name }} 
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { EventBus } from './eventBus';
import SessionExpired from './components/SessionExpired.vue';


  export default {
    components: {
      SessionExpired,
    },
    computed:{
      ...mapGetters(['getUserData']),
      user() {
      return this.getUserData.username;
      },
      role_id() {
        return this.getUserData.role_id;
      },
      name() {
        return this.getUserData.name;
      },
      address() {
        return this.getUserData.address;
      },
      phone() {
        return this.getUserData.phone;
      },
      email() {
        return this.getUserData.email;
      },
    },
    data () {
      return {
        drawer: null,
        items: [],
      }
    },
    created() {
      this.initializeItems();
      this.$watch('getUserData', () => {
        this.initializeItems(); // Memperbarui items ketika getUserData berubah
      });
    },
    methods: {
      ...mapActions(['logout']),
      initializeItems() {
        this.items = [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/' },
          ...(this.role_id === 1 ? [{ title: 'Master', icon: 'mdi-forum', subItems : [
            { title: 'User', icon: 'mdi-account-outline', link: '/user'},
            { title: 'Customer', icon: 'mdi-account-group-outline', link: '/customer'},
            { title: 'Material', icon: 'mdi-book-check-outline', link: '/material'},
          ] }] : []),
          { title: 'Transaction', icon: 'mdi-file-document-outline', subItems : [
            ...(this.role_id === 2 ? [{ title: 'Delivery Process', icon: 'mdi-truck-outline', link: '/delivery'}] : []),
            ...(this.role_id === 1 ? [{ title: 'After Delivery Process', icon: 'mdi-truck-check-outline', link: '/1'}] : []), // Added condition for role_id
          ] },
        ];
      },
      onUserLoggedIn() {
      },
      logout() {
        console.log("Logout button clicked"); // Tambahkan log untuk debugging
        this.$store.dispatch('logout');
      }
    },
    mounted() {
    EventBus.$on('sessionExpired', () => {
      this.$refs.sessionDialog.showDialog(); // Tampilkan dialog
    });
  },
  beforeDestroy() {
    EventBus.$off('sessionExpired'); // Hapus listener saat komponen dihancurkan
  },
  }
</script>

<style>
.footer {
  font-size: 12px;
  padding-top: 0px
}
.sales-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
}

.card {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.527);
}
h4{
  margin-right: 5px;
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;  
}
</style>

