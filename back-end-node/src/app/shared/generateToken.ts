import jwt from 'jsonwebtoken';

function generateToken(id = {}) {
    const secret = process.env.secret;

    const token = jwt.sign(
        id,
        secret!,
        { expiresIn: '86400s' }
    );
    
    return token;
};

export default generateToken;