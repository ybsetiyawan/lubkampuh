export default {
    methods: {
        
        isUnique(array, key, value) {
            return !array.some(item => item[key].toLowerCase() === value.toLowerCase()); // Membandingkan dalam huruf kecil
        },
        validateInput(value) {
            return value === null || value === undefined || value === '';
        },
        // {{ edit_1 }}
        validateInputs(obj, keys) { // Metode baru untuk memvalidasi input
            return keys.some(key => !obj[key]);
        },
        
        priceFormat(value) {
            const formater = new Intl.NumberFormat('id-ID', {
                style: 'decimal',
                minimumFractionDigit: 0
            });
            return formater.format(value);
        },

        dateFormat(value) {
            const date = new Date(value);
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        },

        toProperCase(str) {
            return str
                .toLowerCase() // Mengubah semua huruf menjadi kecil
                .split(' ') // Memisahkan string menjadi array berdasarkan spasi
                .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Mengubah huruf pertama menjadi besar
                .join(' '); // Menggabungkan kembali array menjadi string
        }



    },
};


