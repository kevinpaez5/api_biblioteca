const express = require(`express`);
const app = express();

app.use(express.json());

//importamos Router de libros
const librosRouter = require(`./routes/libros`);

//importamos Middleware Error Handler
const errorHandler = require(`./middleware/errorHandler`);

app.use(`/libros`, librosRouter);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor iniciado en puerto 3000');
});
