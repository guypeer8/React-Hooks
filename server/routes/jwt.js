const rootDir = require('app-root-dir').get();
const { readFileSync } = require('fs');
const jwt = require('jsonwebtoken');
const { join } = require('path');

const JWT_SECRET = readFileSync(join(rootDir, 'bin', 'jwt_secret.pem'));

const verifyJWT = token => (
    new Promise((resolve, reject) => {
        jwt.verify(
            token,
            JWT_SECRET,
            (err, decoded) => (
                err ? reject(err) : resolve(decoded)
            )
        );
    })
);

const jwtVerifyMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const [authType, authToken] = authHeader.split(/\s+/);
            if (authType && authType.toLowerCase() === 'bearer')
                req.jwtDecoded = await verifyJWT(authToken);
        }
        else if (req.cookies.token)
            req.jwtDecoded = await verifyJWT(req.cookies.token);

        next();
    }
    catch (e) {
        next();
    }
};

module.exports = jwtVerifyMiddleware;
