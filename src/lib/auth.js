import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

//this secret key would work with jose only if we encode it.
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = "auth-token";

//Encrrypt and sign token
export async function signAuthToken(payload) {
    try {
        const token = await new SignJWT(payload)
        .setProtectedHeader({alg : "HS256"})
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(secret);

        return token;
    } catch (error) {
        throw new Error("Token signing failed");
    }
}

//Decrypt and verify token
export async function verifyAuthToken(token) {
    try {
        const {payload} = await jwtVerify(token, secret);

        return payload;
    } catch (error) {
        throw new Error("Token decryption failed");
    }
}

//Set auth cookie
export async function setAuthCookie(token) {
    try {
        const cookieStore = await cookies();
        
        cookieStore.set(cookieName, token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 // 1 day
        })
    } catch (error) {
        throw new Error("set auth cookie failed")
    }
}

//Get auth cookie
export async function getAuthCookie() {
    const cookieStore = await cookies();
    const token = cookieStore.get(cookieName);

    return token?.value;
}

//Remove auth token cookie
export async function removeAuthCookie() {
    try {
        const cookieStore = cookies();
        cookieStore.delete(cookieName);
    } catch (error) {
        throw new Error("failed to remove the cookie")
    }
}
