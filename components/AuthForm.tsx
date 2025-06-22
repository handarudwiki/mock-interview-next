"use client";
import Image from 'next/image';
import React from 'react'
import { Form } from './ui/form';
import { useForm } from 'react-hook-form';
import{zodResolver} from "@hookform/resolvers/zod"
import { z } from 'zod';
import FormField from './FormField';
import { Button } from './ui/button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signIn, signUp } from '@/lib/actions/auth.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const authSchema = (type:FromType)=>{
    return z.object({
        name : type === "sign-up" ? z.string().min(1, "Name is required") : z.string().optional(),
        email: z.string().min(1, "Email is required").email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    })
}

const AuthForm = ({type}:{type:FromType}) => {
    const router = useRouter()
    const formSchema = authSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })
    const isSignIn = type === "sign-in";
    console.log(isSignIn)

    const onSubmit = async (data : z.infer<typeof formSchema>) => {
        try {
            if (type === "sign-up"){
                const {name, email, password } = data

                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )

                const result = await signUp({
                    email :email,
                    name: name!,
                    uid: userCredential.user.uid,
                    password
                })
                if (!result.success){
                    toast.error(result.message)
                    return
                }

                toast.success("Account created successfully, please sign in")
                router.push("/sign-in")
            }else{
                console.log("sign in")
                const {email, password} = data;

                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredential.user.getIdToken();
                if(!idToken) {
                    toast.error("Failed to get ID token")
                    return;
                }

                await signIn({
                    email,
                    idToken
                })

                toast.success("Signed in successfully")
                router.push("/")
            }
        } catch (error) {
            console.log(error)
            toast.error(`There was an error: ${error}`)
        }
    }
  return (
     <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col items-center gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2">
                <Image
                src="/logo.svg"
                alt='logo'
                width={38}
                height={32}
                />
                <h2 className='text-primary-100'>DwiInterview</h2>
            </div>
            <h3 >Practice Job Interview with AI</h3>
            <Form {...form}>
                <form className='"w-full space-y-6 y-4 mt-4 form' onSubmit={form.handleSubmit(onSubmit)} method='POST'>
                    {!isSignIn && (
                        <FormField
                         control={form.control}
                            name="name"
                            label='Name'
                            placeholder='Enter your name'
                            type='text'
                             
                         />
                    )}

                    <FormField 
                    
                        control={form.control}
                        name="email"
                        label='Email'
                        placeholder='Enter your email'
                        type='email'
                    />

                    <FormField 
                        control={form.control}
                        name="password"
                        label='Password'
                        placeholder='Enter your password'
                        type='password'
                    />
                    <Button 
                    className='btn' 
                    type='submit'
                    disabled={form.formState.isSubmitting}
                    >{
                        form.formState.isSubmitting ? "Loading..." :
                        isSignIn ? "Sign In" : "Sign Up"
                    }
                    </Button>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default AuthForm