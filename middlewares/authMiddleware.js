//Este archivo contiene el middleware de autenticación que verifica los tokens JWT en las solicitudes.

const jwt = require("jsonwebtoken"); // Importa la biblioteca jsonwebtoken para manejar tokens JWT.

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]; //Obtiene el valor del encabezado Authorization de la solicitud. Este encabezado generalmente contiene el token JWT.

    console.log(authHeader);
    //Verificación de la Presencia del Encabezado:
    if(!authHeader) {
        return res.status(403).send({ auth: false, error: "No se proveyó un token" }); // Si no está presente, devuelve un error 403 indicando que no se proporcionó un token.
    };

    //Extracción del Token:
    const token = authHeader.split(" ")[1]; //token: Divide el encabezado Authorization en partes usando el espacio como separador y toma la segunda parte (el token real). Esto asume que el formato del encabezado es Bearer <token>.
    console.log('token', token)
    console.log('secreto', process.env.SECRET_KEY);
    //Verificación de la Presencia del Token
    if(!token) {
        return res.status(403).send({ auth: false, error: 'token malformado' }); // Si el token no está presente, devuelve un error 403 indicando que el token está malformado
    };

    //Verificación del Token
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => { //: Verifica el token usando la clave secreta. Si el token es válido, decodifica el payload
        if(error) { // Comprueba si hubo un error durante la verificación
            return res.status(401).send({ auth:false, error: 'Fallo la autenticacion del token' }) //Si hubo un error, devuelve un error 500 indicando que la autenticación del token falló.
        };
        
        req.userId = decoded.id; // Si el token es válido, extrae el ID del usuario del token decodificado y lo asigna a req.userId

        /* La línea req.userId = decoded.id; se utiliza para almacenar el ID del usuario extraído del token JWT en el objeto de solicitud (req). Esto permite que el ID del usuario esté disponible para su uso en las rutas y controladores que vienen después del middleware de autenticación. De esta manera, no necesitas verificar el token nuevamente en cada ruta; puedes simplemente acceder al ID del usuario desde el objeto de solicitud.*/

        next();
    });
};

module.exports = authMiddleware;