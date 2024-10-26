<template>
    <div class="sales-container">
        <div class="card">
            <v-card-title>
                <h4><u>Materials</u></h4>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark @click="add">Add</v-btn>
            </v-card-title>
        </div>
        <div class="card">

            <v-card>
                <v-card-text>
                    <v-data-table
                        :headers="headers"
                        :items="material"
                        :search="search"
                        @click:row="handleRowClick"
                    />
                </v-card-text>
            </v-card>
        </div>
  
        <template>
        <v-dialog
          v-model="dialog.value"
          transition="dialog-top-transition"
          max-width="600"
          overlay-opacity="0.8"
        >
          
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="#78909C" dark >
                {{ isAdd ? 'Add Material' : 'Edit Material' }}
              </v-toolbar>
              <v-form>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-text-field
                      label="Name"
                      v-model="edit.name"
                      required
                      dense
                      >
                    </v-text-field>
                    </v-col>
                    
                  </v-row>
                </v-card-text>
              </v-form>
              <v-divider class="border-opacity-80"></v-divider>
              <v-card-actions class="justify-center">
                <v-btn
                  text
                  @click="isAdd ? save() : update()"
                  color="success"
                  outlined
                >
                  {{ isAdd ? 'Add' : 'Update' }}
                </v-btn>
                <v-btn
                  text
                  @click="dialog.value = false"
                  color="error"
                  outlined
                >Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </template>
    </div>
  </template>
  
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import api from '@/services/api';
  import Swal from 'sweetalert2';
  import mixins from '@/mixins/mixins';
  
  export default {
    mixins: [mixins], // Menambahkan mixin ke dalam komponen
    computed: {
          ...mapGetters(['getMaterialData']), // Pastikan getter didefinisikan dengan benar
         
      },
      data() {
          return {
              headers: [
                  { text: 'Name', value: 'name' },
              ],
              material: [],
              search: '',
              dialog:{
                  value: false
              },
              edit: {},
              isAdd: false,
                
          }
      },
      methods: {
          ...mapActions(['getMaterial']), // Pastikan action didefinisikan dengan benar
          async fetchMaterial() {
          try {
              await this.getMaterial();
              this.material = this.getMaterialData;
              // console.log('itemtype :', this.itemtype); // Tambahkan log ini
          } catch (error) {
              console.error('Error fetching material:', error); // Tambahkan log ini
          }
      },
  
          handleRowClick(item) {              
              this.dialog.value = true; // Menampilkan dialog saat baris diklik
              this.edit = { ...item }; // Mengisi data untuk diedit
              console.log('Row clicked:', item); // Ganti dengan logika yang diinginkan
              // this.editUser.kode_role = item.kode_role;
              // this.editUser.nama_cabang = item.nama_cabang;
              this.isAdd = false;
  
          },
          add() {
              this.dialog.value = true;
              this.edit = {
                  name: '',
              };
              this.isAdd = true;
          },
          async save() {
            if (this.validateInputs(this.edit, ['name'])) { // Menggunakan metode baru
                Swal.fire({
                  position: 'top',
                  icon: 'warning',
                  title: 'There is an empty input',
                  showConfirmButton: false,
                  timer: 1500,
                  toast: true,
                  width: '400px',
                  background: '#EF9A9A',
                  color: '#fff',
                  padding: '16px',
                  iconColor: '#fff',
                });
                return;
              }
              if (!this.isUnique(this.material, 'name', this.edit.name)) { // Hanya untuk penambahan
                Swal.fire({
                  position: 'top',
                  icon: 'warning',
                  title: 'Material Name Already Exist.',
                  showConfirmButton: false,
                  timer: 1500,
                  toast: true,
                  width: '400px',
                  background: '#EF9A9A',
                  color: '#fff',
                  padding: '16px',
                  iconColor: '#fff',
                });
                return;
              }
              await api.post('/m_material', {
                name: this.toProperCase(this.edit.name)

              })
              .then(() => {
                Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'Add Success',
                  showConfirmButton: false,
                  timer: 1500,
                  toast: true,
                  width: '400px',
                })
                this.dialog.value = false;
                setTimeout(() => {
                  location.reload();
                }, 900);
              })
              .catch(error => {
                alert('Add Failed' + error)
              })
          },
          update() {
              this.isAdd = false;
              if (this.validateInputs(this.edit, ['name'])) { // Menggunakan metode baru
                  Swal.fire({
                      position: 'top',
                      icon: 'warning',
                      title: 'There is an empty input.',
                      showConfirmButton: false,
                      timer: 1500,
                      toast: true,
                      width: '400px',
                      background: '#EF9A9A',
                      color: '#fff',
                      padding: '16px',
                      iconColor: '#fff',
                  });
                  return;
              }
              // Tidak perlu memeriksa isUnique saat memperbarui  
              api.put(`/m_material/${this.edit.id}`, {
                name: this.toProperCase(this.edit.name)
              })
              .then(() => {
                Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'Update Success',
                  showConfirmButton: false,
                  timer: 1500,
                  toast: true,
                  width: '400px',
                })
                this.dialog.value = false; // Tutup dialog setelah pembaruan
                setTimeout(() => {
                  location.reload();
                }, 900);
              })
              .catch(error => {
                alert('Update Failed' + error)
              })
          },
      },
      async created() {
        await this.fetchMaterial();
        // console.log('Component created, itemtype data:', this.material); //
      }
  }
  </script>

