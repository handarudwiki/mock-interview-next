"use server"

import { db } from "@/firebase/admin";
import { SignUpParans } from "@/types"


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