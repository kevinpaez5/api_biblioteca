const errorHandler = (err, req, res, next) => {
    //Verificamos si el error tiene un codigo de estado definido, sino establecer codigo de estado por default
    const statusCode = err.statusCode || 500;

    //Construimos objeto de respuesta de error
    const errorResponse = {
        error: {
            message: err.message || 'Error interno del servidor',
            code: err.code || 'internal_error',
        },
    };
    //Enviar respuestas en JSON
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;