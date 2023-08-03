const express = require(`express`);
const router = express.Router();

const Libro = require(`../models/Libro`);
//Importamos la libreria para validar scopes
const { requiredScopes } = require(`express-oauth2-jwt-bearer`);

//Ruta para obtener todos los libros
router.get(`/`, requiredScopes('read:libros'), async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros'});
    }
});

//Ruta para obtener libro por id
router.get(`/:id`, requiredScopes('read:libros'), async(req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: 'No se encontró el libro'});
    }
})

//Ruta para crear un nuevo libro
router.post(`/`, requiredScopes("write:libros"), async(req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el libro'});
    }
});

//Ruta para actualizar libro 
router.put(`/:id`, requiredScopes("write:libros"), async(req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body,
    {
        new: true,
    });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar libro'});
    }
});

//Ruta para eliminar libro
router.delete(`/:id`, requiredScopes("write:libros"), async(req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Libro eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro'});
    }
});

module.exports = router;