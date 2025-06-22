import { is } from './../../node_modules/acorn/dist/acorn.d';
"use server"

import { auth, db } from "@/firebase/admin";
import { SignInParams, SignUpParans, User } from "@/types"
import { cookies } from "next/headers";


const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

export async function signUp(params:SignUpParans){
    const {uid, name, email } = params;
    
    try {
        const userRecors = await db.collection("users").doc(uid).get();
        if (userRecors.exists)  {
            return {
                success : false,
                message : "User already exists"
            }
        }

        await db.collection("users").doc(uid).set({
            name,
            email,
        });

        return {
            success : true,
            message : "User created successfully"
        }
    } catch ( error:any) {
        console.error("Error creating user:", error);
        

        if (error.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: "Email already exists"
            };
        }

        return {
            success: false,
            message: "Error creating user"
        };
    }
}

export async function setSessionCokie(idToken:string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: SESSION_DURATION * 1000, // Convert seconds to milliseconds
    })
    
    console.log("sessionCookie", sessionCookie);

  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signIn(params:SignInParams){
    const {email, idToken} = params;
    
    try {
        const userRecord = await auth.getUserByEmail(email);
      
        if (!userRecord) {
            return {
                success: false,
                message: "User does not exist create an account"
            };
        }
        console.log("userRecord", userRecord);
        await setSessionCokie(idToken);
    } catch (error:any) {
        console.error("Error signing in:", error);
        

        return {
            success: false,
            message: "Error signing in"
        };
    }
}


export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete("session")
}

export async function getCurrentSession():Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        
        const userRecord = await db.collection("users").doc(decodedClaims.uid).get();
        if (!userRecord.exists) {
            return null;
        }

        return{
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (error:any) {
        console.error("Error verifying session cookie:", error);
        return null;
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const session = await getCurrentSession();
    return session !== null;
}