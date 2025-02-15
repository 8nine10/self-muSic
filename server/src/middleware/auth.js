import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ message: 'Authorization header missing.'});
        }

        const token = authorizationHeader.split(' ')[1];

        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export default auth;