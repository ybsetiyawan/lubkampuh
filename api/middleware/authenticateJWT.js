const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Mengambil token dari header

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden jika token tidak valid
            }
            req.user = user;
            next(); // Lanjutkan ke route berikutnya
        });
    } else {
        res.sendStatus(401); // Unauthorized jika tidak ada token
    }
}

module.exports = authenticateJWT;
