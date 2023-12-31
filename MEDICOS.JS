var express = require('express');
var router = express.Router();
var {conexion} = require('../database/conexion.js')

/* GET home page. */
router.get('/', function(req, res, next) {
conexion.query('SELECT * FROM medicos', (error, medicos)=>{
    if(error){
        res.status(500).send('Ocurrio un error en la consulta')
    }else{
        res.status(200).render('medicos.hbs', {medicos})
    }
})
});

router.get('/agregar', (req, res) => {
    res.status(200).sendFile('registro-medicos.html', {root: 'public'})
  })

router.post('/guardar-medico', (req, res)=>{
    const cedula  = req.body.cedula 
    const nombres = req.body.nombre
    const apellidos = req.body.apellido
    const correo = req.body.correo
    const consultorio = req.body.consultorio
    const especialidad = req.body.especialidad
    conexion.query(`INSERT INTO medicos (cedula, nombres, apellidos, correo, consultorio, especialidad) VALUES (${cedula}, '${nombres}', '${apellidos}', '${correo}', '${consultorio}', '${especialidad}')`, (error, resultado) => {
      if (error) {
        res.status(500).send('Ocurrio un error en la consulta'+ error)
      } else {
        res.status(200).redirect('/medicos')
      }
    })  
})

router.get('/eliminar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  conexion.query(`DELETE FROM medicos WHERE cedula=${cedula}`, (error, result) => {
    if (error) {
      res.status(500).send("Error en la consulta" + error);
    } else {
      res.status(200).redirect('/medicos');
    }
  })
});

module.exports = router;
