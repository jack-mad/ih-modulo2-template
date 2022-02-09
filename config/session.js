//gestion de sesion 
//configuracion y el tiempo de expiracion delticket

//importaciones
const session = require('express-session')
const MongoStore = require('connect-mongo')
//manage session 
const sessionManager = (application) => {
    //console.log("estoy en el session manager");

    // verificar con patron proxy si la sesion es extraña, se evite el ruteo
    application.set('trust proxy', 1) //patron proxy
    // verifica que la sesion se genera con la palabra secreta, ticket y expiracion
    application.use(session({
        secret: process.env.SECRET,
        resave: true,
        cookie: {
            maxAge: 8640000, // TIEMPO DE EXPIRACIÓN DEL COOKIE
            httpOnly: true
        },
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        })
    }
))
}
//exportacion
module.exports = sessionManager