import jwt from 'jsonwebtoken';

function generateToken(id = {}) {
    const secret = process.env.SECRET;

    const token = jwt.sign(
        id,
        secret!,
        { expiresIn: '3600s' }
    );
    
    return token;
};

export default generateToken;