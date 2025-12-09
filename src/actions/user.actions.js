"use server"
import { prisma } from '@/db/prisma'
import bcrypt from 'bcryptjs'
import { signAuthToken, setAuthCookie, removeAuthCookie } from '@/lib/auth';
import { getCurrentUser } from '@/lib/current_user';

export async function createUser(prevState, formData) {
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeatPassword");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!fullname || !email || !password || !repeatPassword) {
        return {
            success: false,
            message: "All fields are required",
            values: { fullname, email }
        };
    }

    if (password !== repeatPassword) {
        return {
            success: false,
            message: "Both passwords don't match",
            values: { fullname, email }
        };
    }

    if (password.length < 6) {
        return {
            success: false,
            message: "The password must be at least 6 characters long",
            values: { fullname, email }
        };
    }

    try {
        const user = await prisma.user.create({
            data: { fullname, email, password: hashedPassword }
        });

        return { success: true, message: "User created successfully" }
    } catch (error) {
        return { success: false, message: "This email already exists" };
    }
}

//log user in
export async function login(prevState, formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");

        if(!email || !password){
            return {success: false, message: "Input email and password", values: {email}}
        }

        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            return {success: false, message: "Username or password incorrect", values: {email}}
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
             return {success: false, message: "Username or password incorrect", values: {email}}
        }

        const token = await signAuthToken({userId: user.id})
        await setAuthCookie(token);

        return {success: true, message: "Logged in successfully"}
    } catch (error) {
        return {success: false, message: "error logging in"}
    }
}

//log user out and remove auth cookie
export async function logoutUser() {
    try {
        await removeAuthCookie();

        return { success: true, message: "Logout successful" }
    } catch (error) {
        return { success: false, message: "Logout failed" }
    }
}

export async function changeUserInfo(prevState, formData) {
    const currentUser = await getCurrentUser();

    const fullname = formData.get("fullname");
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");
    const repeatPassword = formData.get("repeatPassword");

    let fullnameUpdated = false;

    const result = await prisma.$transaction(async tx =>{
        if(fullname){
            await tx.user.update({
                where: {id: currentUser.id},
                data: {fullname}
            })

            fullnameUpdated = true;
        }

        if(oldPassword && newPassword){
            const user = await prisma.user.findUnique({
                where:{id: currentUser.id}
            });
            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if(!isMatch){
                return {
                    success: false,
                    message: "Old password  incorrect"
                }
            }

            if(newPassword.length < 6){
                return {
                    success: false,
                    message: "New password should be at least 6 characters long"
                }
            }

            if(newPassword !== repeatPassword){
                return {
                    success: false,
                    message: "Both passwords don't match"
                }
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await tx.user.update({
                where: {id: currentUser.id},
                data: {password: hashedPassword}
            })

            return {
                success: true,
                message: "User info updated"
            }
        }
    })

    if(!oldPassword && fullnameUpdated){
        return{
            success: true,
            message: "Fullname changed",
        }
    }

    if(result?.success){
        const token = await signAuthToken({userId: currentUser.id})
        await setAuthCookie(token);
    }

    return result;
}