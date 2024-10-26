const pool = require('../models/db');

// Get all roles
const getRole = (req, res) => {
  pool.query('SELECT * FROM m_role ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    res.status(200).json(results.rows);
  });
};

// Add a role
const addRole = (req, res) => {
  const { name } = req.body;
  pool.query('INSERT INTO m_role (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    res.status(201).send('Add Success.');
  });
};

// Update a role
const editRole = (req, res) => {
  const id = req.params.id;
  const { nama } = req.body;
  pool.query('UPDATE m_role SET nama = $1 WHERE id = $2', [nama, id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    res.status(200).send('Data berhasil diubah');
  });
};

// Delete a role
const deleteRole = (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM m_role WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
    res.status(200).send('Data berhasil dihapus');
  });
};

module.exports = {
  getRole,
  addRole,
  editRole,
  deleteRole,
};
