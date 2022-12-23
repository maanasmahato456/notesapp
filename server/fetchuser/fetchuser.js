const jwt = require('jsonwebtoken');
const jwt_secret = 'AFORAPPLEBFORBALL';

const fetchuser = async (req, res, next) => {

    try {
        const token = await req.header('auth-token');
        if (!token) {
            success = false;
            res.status(401).send({ success, error: "invalid token" });
        }
        const data = await jwt.verify(token, jwt_secret);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error, 'fetchuser middleware error!');
    }
}

module.exports = { fetchuser };