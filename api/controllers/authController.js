const pool = require('../models/db'); // Koneksi ke database
const { comparePassword } = require('../helpers/hashHelper')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;



const login = (req, res) => {
    const { username, password } = req.body;

    // Cari user berdasarkan username
    pool.query('SELECT * FROM m_user WHERE username = $1', [username], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }

        if (results.rows.length === 0) {
            return res.status(401).json({ message: 'Username or password is incorrect'});
        }

        const user = results.rows[0];

        // Validasi password menggunakan bcrypt
        const isValidPassword = comparePassword(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Buat token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '10m' });

        // Query untuk mendapatkan data userdetail berdasarkan user_id
        pool.query(
            'SELECT c.* FROM m_userdetail c JOIN m_user u ON c.user_id = u.id WHERE u.username = $1 LIMIT 1',
            [username],
            (error, userdetailResults) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Internal Server Error');
                }

                // Jika userdetail ditemukan, ambil data pertama
                const userdetail = userdetailResults.rows[0] || null;

                // Kirim token, data user (kecuali password), dan data userdetail (sebagai objek, bukan array)
                res.status(200).json({
                    message: 'Login successful',
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        role_id: user.role_id
                    },
                    userdetail: userdetail // Mengembalikan data userdetail sebagai objek
                });
            }
        );
    });
};


module.exports = { login };
