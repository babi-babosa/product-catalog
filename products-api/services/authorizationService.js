import jwt from 'jsonwebtoken';

export class AuthorizationService {

    constructor() {
    }

    async generateJWT(payload) {
        jwt.sign(payload, 'secret', { expiresIn: 60 * 60 });
    }

    async checkJWT(token){
        var decoded = jwt.verify(token, 'shhhhh');
        console.log(decoded.foo) // bar
    }
}