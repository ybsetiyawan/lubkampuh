const pool = require('../models/db');
const { add, edit, del, ise } = require('../helpers/statusResponse')



// Get all materials
const getMaterial = (req, res) => {
  pool.query('SELECT * FROM m_material ORDER BY id ASC', (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ise});
    }
    res.status(200).json(results.rows);
  });
};

// Add a material
const addMaterial = (req, res) => {
  const { name } = req.body;
  pool.query('INSERT INTO m_material (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send(ise);
    }
    res.status(201).json({add});
  });
};

// Update a material
const editMaterial = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  pool.query('UPDATE m_material SET name = $1 WHERE id = $2', [name, id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send(ise);
    }
    res.status(200).json({edit});
  });
};

// Delete a material
const deleteMaterial = (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM m_material WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ise});
    }
    res.status(200).json({del});
  });
};

module.exports = {
  getMaterial,
  addMaterial,
  editMaterial,
  deleteMaterial,
};
