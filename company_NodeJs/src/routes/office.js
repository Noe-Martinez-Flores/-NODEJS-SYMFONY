const express = require ('express');
const router = express.Router();

const pool = require('../database.js');


router.get('/', async (req, res) => {
    let listOffices =  await pool.query('SELECT * FROM office');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listOffices: listOffices

    });
});

router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    let office = await pool.query ('SELECT * FROM office WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Consulta especifica Exitosa",
        office: office
    });
});

router.post('/create', async (req,res) => {
    const {office_code,address} = req.body;
    const office = {
        office_code,address
    };

    await pool.query('INSERT INTO office set ?', [office]);
    res.json({
        status: 200,
        message: "se ha registrado correctamente",
        office: office
    });
});

router.post('/update/:id', (req,res) => {
    const {id} = req.params;
    const {office_code, address} = req.body;

    const office = {office_code, address};
    pool.query('UPDATE office SET ? WHERE id = ?', [office, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        office: office
    });
});

router.post('/delete/:id', (req,res) => {
    const {id} = req.params;
    pool.query('DELETE FROM office WHERE  id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha Eliminado correctamente"
    });
});

module.exports = router;