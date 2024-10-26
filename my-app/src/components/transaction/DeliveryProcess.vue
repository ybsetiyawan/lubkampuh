<template>
    <v-app>
      <div class="sales-container">
        <div class="card">
          <div class="flex-container">
            <h4>Delivery Process</h4>
            <v-spacer></v-spacer>
            <button type="submit" @click="buttonEnabled" :disabled="isButtonEnabled" class="new-button">New</button>
          </div>
          <div class="form-group flex-container"></div>
          <v-divider />
          <div class="form-group flex-container">
            <div>
              <label for="tanggal">Date:</label>
              <input type="date" id="tanggal" class="input-field" disabled />
            </div>
            <v-divider vertical />
            <div class="flex-item">
              <label for="keterangan">Information:</label>
              <input type="text" id="keterangan" autocomplete="off" class="input-field" v-model="transaction.keterangan"
                :disabled="!isButtonEnabled" />
            </div>
            <v-divider vertical />
            <div class="flex-item-button">
              <!-- <label for="search"></label> -->
              <v-btn small elevation="7" class="input-field option-button" @click="dialog.value = true" :disabled="!isSearchButtonEnabled">
                <v-icon  elevation="7" title="search">mdi-magnify</v-icon>
              </v-btn>
            </div>
            <div class="flex-item-button">
              <!-- <label for="save"></label> -->
              <v-btn small elevation="7" class="input-field option-button" @click="saveTransaction" :disabled="!isSaveButtonEnabled">
                <v-icon  elevation="7" title="save">mdi-content-save</v-icon>
              </v-btn>
            </div>
            <div class="flex-item-button">
              <!-- <label for="cancel"></label> -->
              <v-btn small elevation="7" class="input-field option-button" @click="resetForm" :disabled="!isSaveButtonEnabled">
                <v-icon elevation="7" title="cancel">mdi-refresh</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="card">
          <h4>Selected materials</h4>
          <v-divider/>
          <v-simple-table class="small-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th class="delete-column">-</th>
              </tr>
            </thead>
            <tbody class="cart-body scrollable-table-body">
              <tr v-for="(item, index) in selectedItems" :key="index">
                <td>{{ item.kode }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.hpp }}</td>
                <!-- <td contenteditable="true" class="warning">{{ item.hpp }}</td> -->
                <td contenteditable="true" @input="updateHjl(index, $event)" class="texthargajual">{{ item.hjl }}</td>
                <!-- Make hpp editable -->
                <td>
                  <input class="qty" type="number" name="qty" id="qty" v-model="quantities[index]"
                    @input="updateQuantity(index, $event.target.value)" min="1">
                </td>
                <td>{{ item.stok_akhir }}</td>
                <td>{{ item.nama_satuan }}</td>
                <td>
                  <v-icon @click="removeItem(index)" color="red" size="20px">mdi-delete</v-icon>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
  
        </div>
      </div>
      <template>
        <v-dialog v-model="dialog.value" transition="dialog-top-transition" overlay-opacity="0.8" max-width="1200">
  
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="#78909C" dark>Daftar Barang</v-toolbar>
              <v-form>
                <!-- Add search input -->
                <v-text-field class="search" v-model="search" append-icon="mdi-magnify"
                  label="Cari Berdasarkan kode atau nama item disini" single-line hide-details></v-text-field>
  
                <v-data-table :headers="headers" :items="formattedItems" :search="search" @click:row="addItem"
                  :item-disabled="isItemIncart" item-value="kode" />
              </v-form>
              <v-divider class="border-opacity-80"></v-divider>
              <v-card-actions class="justify-center">
                <v-btn text @click="dialog.value = false" color="error" outlined>Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </template>
     
    </v-app>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import api from '@/services/api';
  import Swal from 'sweetalert2';
  import mixins from '@/mixins/mixins';
  
  export default {
    // components: {
    //   SalesPrint
    // },
    mixins: [mixins],
    name: 'SalesV',
    computed: {
      ...mapGetters(['getUserData']),
      kodeCabang() {
        return this.getUserData.kode_cabang;
      },
      idCabang() {
        return this.getUserData.id_cabang;
      },
      formattedItems() {
        return this.item
          .filter(item => item.stok_akhir >= 1) // Filter items with stok 0
          .map(item => ({
            ...item,
            hpp: this.priceFormat(item.hpp),
            hjl: this.priceFormat(item.hjl),
          }));
      },
      isSaveButtonEnabled() {
        return this.selectedItems.length > 0;
      },
      isSearchButtonEnabled() {
        return this.transaction.keterangan;
      },
    },
    
    data() {
      return {
        headers: [
          { text: 'Material', value: 'name' },
        ],
        items: [
          { text: 'Material', value: 'name' },
        ],
        selectedItems: [],
        dialog: {
          value: false
        },
        search: '',
        item: [],
        quantities: {},
        transaction: {
          // idCustomer: '',
          // nama: '',
          // kode: '',
          tanggal: '',
          keterangan: '',
        },
        user: this.getUserData,
        isButtonEnabled: false,
        documentNumber: '',
        today: new Date().toISOString().split('T')[0],
      };
    },
  
    methods: {
  
  
      buttonEnabled() {
        this.isButtonEnabled = true;
      },
  
      isItemIncart(item) {
        const isInCart = this.selectedItems.some(cartItem => cartItem.kode === item.kode);
        // Log hasil pengecekan ke konsol untuk memastikan
        // console.log(`Checking if item is in cart: ${item.nama} (kode: ${item.kode}) => ${isInCart}`);
        return isInCart;
      },
  
      updateQuantity(index, value) {
        const maxQty = this.selectedItems[index].stok_akhir;
        if (value > maxQty) {
          Swal.fire({
            position: 'top',
            icon: 'warning',
            title: `Qty tidak bisa lebih dari stok ( ${maxQty} )`,
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            width: '400px',
            background: '#EF9A9A',
            color: '#fff',
            padding: '16px',
            iconColor: '#fff',
          });
          value = maxQty;
        }
        this.$set(this.quantities, index, value);
      },
  
  
      addItem(item) {
        if (this.isItemIncart(item)) {
          Swal.fire({
            position: 'top',
            icon: 'warning',
            title: 'Item sudah ada di cart',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            width: '400px',
            background: '#EF9A9A',
            color: '#fff',
            padding: '16px',
            iconColor: '#fff',
          });
          return; // Mencegah penambahan item duplikat
        }
        this.selectedItems.push(item);
        this.$set(this.quantities, this.selectedItems.length - 1, 1);
        this.dialog.value = false;
  
        console.log('selectedItems :', this.selectedItems);
      },
      removeItem(index) {
        this.selectedItems.splice(index, 1);
  
      },
  
      updateHjl(index, event) {
        const newValue = event.target.innerText.trim();
        // console.log(`Updating hpp for item at index ${index} to ${newValue}`);
        this.selectedItems[index].hjl = newValue;
      },
      async saveTransaction() {
        // if(!this.transaction.tanggal || !this.transaction.keterangan || !this.selectedItems === 0){
        //   Swal.fire({
        //               position: 'top',
        //               icon: 'warning',
        //               title: 'Ada data yang belum lengkap',
        //               showConfirmButton: false,
        //               timer: 1500,
        //               toast: true,
        //               width: '400px',
        //               background: '#EF9A9A',
        //               color: '#fff',
        //               padding: '16px',
        //               iconColor: '#fff',
        //           });
  
        //   return;
        // }
        const currentTime = new Date().toTimeString().split(' ')[0];
  
        const transactionData = {
          tanggal: `${this.user.app_date}T${currentTime}`,
          keterangan: this.transaction.keterangan.toUpperCase(),
          detail: this.selectedItems.map((item, index) => ({
            id_item_cabang: item.id,
            qty: parseFloat(this.quantities[index]),
            harga: item.hjl.replace(/\./g, ''),
          }))
        }
  
        try {
          const response = await api.post('/t_trans_in', transactionData);
          this.noFaktur = response.data.no_faktur;
          // console.log('no faktur:', this.noFaktur);
  
          this.printTransaction = {
            documentNumber: this.noFaktur,
            tanggal: this.user.app_date,
            keterangan: this.transaction.keterangan,
            namaCabang: this.user.nama_cabang,
            kodeCabang: this.user.kode_cabang,
            alamatCabang: this.user.alamat_cabang,
            namaUser: this.user.nama,
            items: this.selectedItems.map((item, index) => ({
              kode: item.kode,
              nama: item.nama,
              hjl: item.hjl,
              qty: this.quantities[index],
              nama_satuan: item.nama_satuan,
              total: item.hjl.replace(/\./g, '') * this.quantities[index]
            })),
            subtotal: this.selectedItems.reduce((acc, item, index) => acc + (item.hjl.replace(/\./g, '') * this.quantities[index]), 0)
          };
          // console.log('data :', this.printTransaction);
          console.log('data transaksi:', this.printTransaction.items);
  
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Transaksi berhasil disimpan',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            width: '400px',
          }).then(() => {
            this.showPrint = true;
          });
  
          // console.log('data transaksi:', transactionData)
        } catch (error) {
          const errorMessage = error.response.data.error;
          // console.log('error simpan data transaksi', errorMessage);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: errorMessage,
            showConfirmButton: false,
            timer: 2500,
            toast: true,
            width: '400px',
            background: '#EF9A9A',
            color: '#fff',
            iconColor: '#fff',
            
          });
  
        }
  
      },
  
      resetForm() {
        // Reset the transaction object and selected items
        this.transaction.tanggal = '';
        this.transaction.keterangan = '';
        this.selectedItems = [];
        this.quantities = {};
        this.isButtonEnabled = false;
  
      },
  
  
  
  
      async fetchItemCabang() {
        try {
          const response = await api.get(`/m_item_cabang?kode_cabang=${this.kodeCabang}`);
          this.item = response.data;
          // console.log('Items :', this.item);
          // console.log('unit :', this.unit); // Tambahkan log ini
        } catch (error) {
          console.error('Error fetching unit:', error); // Tambahkan log ini
        }
      },
  
      async fetchUser() {
        try {
          this.user = this.getUserData;
          // console.log('user :', this.user); // Tambahkan log ini
        } catch (error) {
          console.error('Error fetching unit:', error); // Tambahkan log ini
        }
      },
  
    },
  
    async created() {
      await this.fetchItemCabang();
      await this.fetchUser();
    }
  
  };
  </script>
  
  <style scoped>
  .card {
    background-color: #fff;
    /* border-radius: 8px; */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    padding: 20px;
  }
  
  .card h2 {
    margin-top: 0;
    color: #333;
  }
  
  .item-list,
  .selected-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  /* .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  } */
  
  /* .item button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  } */
  
  .item button:hover {
    background-color: #0056b3;
  }
  
  .flex-container {
    display: flex;
    gap: 10px;
  }
  
  .flex-item {
    flex: 1;
  }
  
  .form-group {
    margin-top: 15px;
    margin-bottom: 10px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 12px;
    /* Adjust the font size */
    margin: 0;
    /* Adjust the margin */
  }
  
  .form-group input {
    width: 100%;
    padding: 4px;
    /* Adjust the padding */
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 12px;
    /* Adjust the font size */
    height: 25px;
    /* Adjust the height */
  }
  
  .input-field {
    margin-top: 10px;
  }
  
  .qty {
    max-width: 50px
  }
  
  .cart-body {
    font-size: 12px;
  }
  
  .texthargajual {
    background-color: #dcdee0;
  }
  
  .flex-item-button {
    margin-top: 15px;
  }
  
  .new-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 25px;
    width: 50px;
    font-size: 15px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  
  .new-button:disabled {
    background-color: #cccccc93;
    cursor: not-allowed
  }
  
  .new-button:hover:enabled {
    background-color: green;
  }
  
  .search {
    margin-left: 480px;
    margin-bottom: 30px;
    max-width: 700px;
  
  }
  
  .scrollable-table-body {
    display: block;
    max-height: 250px;
    /* Adjust the height as needed */
    overflow-y: auto;
  }
  
  /* Ensure the table headers align with the scrollable body */
  .small-table thead,
  .small-table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  
  .small-table tbody {
    display: block;
  }
  </style>
  