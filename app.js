const express = require(`express`);
const app = express();
app.use(express.json());
const { auth } = require(`express-oauth2-jwt-bearer`);

const jwtCheck = auth({
    audience: 'https://l127.0.0.1:3000/api/productos',
    issuerBaseURL: 'https://dev-v0ows7hm2bz8vu8m.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

//importamos Router de libros
const librosRouter = require(`./routes/libros`);

//importamos Middleware Error Handler
const errorHandler = require(`./middleware/errorHandler`);

//Configuramos el middleware de autenticacion
app.use(`/libros`, jwtCheck, librosRouter);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor iniciado en puerto 3000');
});
