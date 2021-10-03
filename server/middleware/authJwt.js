const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let token;
    if (req.cookies.nToken) {
        token = req.cookies.nToken;
    } else if (req.header('Authorization')?.includes('Bearer')) {
        token = req.header('Authorization').split(' ')[1];
    }
    if (!token) return res.status(401).json({ message: 'Not authorized to access this route' });
    try {
        const decoded = jwt.verify(token, 'randomString');
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Invalid Token' });
    }
};
