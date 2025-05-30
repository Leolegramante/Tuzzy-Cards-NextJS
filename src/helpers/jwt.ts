import {JWTPayload, jwtVerify, SignJWT} from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);

export type decryptResponse = {
    uuid: string,
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    role: string,
    iat: number,
    exp: number
}

export const encrypt = async (payload: JWTPayload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('12 hour from now')
        .sign(secretKey);
};

export const decrypt = async (value: string) => {
    try {
        const {payload} = await jwtVerify(value, secretKey, {algorithms: ['HS256']});
        if (payload.user) {
            return payload.user as decryptResponse;
        } else {
            return payload as decryptResponse;
        }
    } catch {
        return false
    }
};