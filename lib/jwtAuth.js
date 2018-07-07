'use strict';

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

// exporto una función que devuelve un middleware
// para comprobar jwt
module.exports = function(){
    return (req, res, next) => {
        // recoger el token de la petición
        const token = req.body.token || req.query.token || req.get('x-access-token');

        // si no hay token respondo no autorizado
        if(!token){
            const err = new Error('no token provided');
            err.status = 401;
            next(err);
            return;
        }

        // verifico el token
        jwt.verify(token, localConfig.jwt.secret, function(err, decoded) {
            if(err){
                err.status = 401;
                next(err);
                return;
            }
            req.user_id = decoded.user_id;
            next();
        });
    };
};