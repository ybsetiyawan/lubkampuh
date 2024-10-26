const pool = require('../models/db');

// Get all userdetail
const getuserdetail = (req, res) => {
  pool.query('SELECT * FROM m_userdetail ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    res.status(200).json(results.rows);
  });
};

// Add a userdetail
const adduserdetail = (req, res) => {
  const { user_id, name, address, phone_number, email } = req.body;
  pool.query('INSERT INTO m_userdetail (user_id, name, address, phone_number, email) VALUES ($1, $2, $3, $4, $5)', [user_id, name, address, phone_number, email], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    res.status(201).send('Data berhasil ditambahkan');
  });
};

// Update a userdetail
const edituserdetail = (req, res) => {
  const id = req.params.id;
  const { user_id, name, address, phone_number, email } = req.body;
  pool.query('UPDATE m_userdetail SET user_id = $1, name = $2, address = $3, phone_number = $4, email = $5  WHERE id = $6', [user_id, name, address, phone_number, email, id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    res.status(200).send('Data berhasil diubah');
  });
};

// Delete a userdetail
const deleteuserdetail = (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM m_userdetail WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    res.status(200).send('Data berhasil dihapus');
  });
};

module.exports = {
  getuserdetail,
  adduserdetail,
  edituserdetail,
  deleteuserdetail,
};
