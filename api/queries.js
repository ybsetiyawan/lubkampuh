const Pool = require('pg').Pool;
const { request, response } = require('express');
// const pgqueries = require('./pgqueries');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    // host: '103.31.38.210',
    database: 'db_labuji',
    password: 'pakepake',
    port: 5432,
});

// m_role
const getRole = (request, response) => {
    pool.query('SELECT * FROM m_role ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addRole = (request, response) => {
    const {nama} = request.body
    pool.query('INSERT INTO m_role (nama) VALUES ($1)', [nama], (error, results) => {
        if (error){
            console.log(error);
            response.status(500).send('Internal Server Error');
        }
        response.status(201).send('Data berhasil ditambahkan')
    })
}

const editRole = (request, response) => {
    const id = request.params.id;
    const {nama} = request.body
    pool.query('UPDATE m_role SET nama = $1 WHERE id = $2', [nama, id], (error, results) => {
        if (error){
            console.log(error);
            response.status(500).send('Internal Server Error');
        }
        response.status(200).send('Data berhasil diubah')
     })
    } 

const deleteRole = (request, response) => {
    const id = request.params.id
    pool.query('DELETE FROM m_role WHERE id = $1', [id], (error, results) => {
        if (error){
            console.log(error);
            response.status(500).send('Internal Server Error');
        }
        response.status(200).send('Data berhasil dihapus')
    })
}


// m_user
const getUser = (request, response) => {
    pool.query('SELECT * FROM m_user ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addUser = (request, response) => {
    const {nama} = request.body
    pool.query('INSERT INTO m_user (nama) VALUES ($1)', [nama], (error, results) => {
        if (error){
            console.log(error);
            response.status(500).send('Internal Server Error');
        }
        response.status(201).send('Data berhasil ditambahkan')
    })
}

const editUser = (request, response) => {
    const id = request.params.id;
    const {nama} = request.body
    pool.query('UPDATE m_user SET nama = $1 WHERE id = $2', [nama, id], (error, results) => {
        if (error){
            console.log(error);
            response.status(500).send('Internal Server Error');
        }
        response.status(200).send('Data berhasil diubah')
     })
    } 

const deleteUser = (request, response) => {
    const id = request.params.id
    pool.query('DELETE FROM m_role WHERE id = $1', [id], (error, results) => {
        if (error){
            console.log(error);
            response.status(500).send('Internal Server Error');
        }
        response.status(200).send('Data berhasil dihapus')
    })
}


// m_customer
const getCustomer = (request, response) => {
    pool.query('SELECT * FROM m_customer ORDER BY id ASC', (error, results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addCustomer = (request, response) => {
    const {nama} = request.body
    pool.query('INSERT INTO m_user (nama) VALUES ($1)', [nama], (error, results) => {
        if (error){
            console.log(error);
            response.status(500).send('Internal Server Error');
        }
        response.status(201).send('Data berhasil ditambahkan')
    })
}

const editCustomer = (request, response) => {
    const id = request.params.id;
    const {nama} = request.body
    pool.query('UPDATE m_customer SET nama = $1 WHERE id = $2', [nama, id], (error, results) => {
        if (error){
            console.log(error);
            response.status(500).send('Internal Server Error');
        }
        response.status(200).send('Data berhasil diubah')
     })
    } 

const deleteCustomer = (request, response) => {
    const id = request.params.id
    pool.query('DELETE FROM m_customer WHERE id = $1', [id], (error, results) => {
        if (error){
            console.log(error);
            response.status(500).send('Internal Server Error');
        }
        response.status(200).send('Data berhasil dihapus')
    })
}

module.exports = {
    getRole, addRole, editRole, deleteRole,
    getUser, addUser, editUser, deleteUser,
    getCustomer, addCustomer, editCustomer, deleteCustomer
}