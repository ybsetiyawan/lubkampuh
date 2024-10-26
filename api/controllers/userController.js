const pool = require('../models/db');
const { hashPassword } = require('../helpers/hashHelper')

// Get all user
const getUser = (req, res) => {
  pool.query('SELECT * FROM m_user ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    res.status(200).json(results.rows);
  });
};

// Add a user
const addUser = (req, res) => {
  const { username, password, role_id } = req.body;

  const hashedPassword = hashPassword(password)

  pool.query('INSERT INTO m_user (username, password, role_id) VALUES ($1, $2, $3)', [username, hashedPassword, role_id], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).send('Data berhasil ditambahkan');
      }
    );
};


// Update a user
const editUser = (req, res) => {
  const id = req.params.id;
  const { username, password, role_id } = req.body;
  const hashedPassword = hashPassword(password)
  

  pool.query('UPDATE m_user SET username = $1, password = $2, role_id = $3  WHERE id = $4', [username, hashedPassword, role_id, id], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
    res.status(200).send('Data berhasil diubah');
  }
);
};

// Delete a User
const deleteUser = (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM m_user WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    res.status(200).send('Data berhasil dihapus');
  });
};

module.exports = {
  getUser,
  addUser,
  editUser,
  deleteUser,
};
