import { generateText } from 'ai';
import {google} from "@ai-sdk/google"
import { getRandomInterviewCover } from '@/lib/utils';
import { db } from '@/firebase/admin';

export async function POST(request:Request){
    const{role, level, texhstack, type, ammount, userid} = await request.json();

    try {
        const {text: questions} = await generateText({
            model: google("gemini-2.0-flash"),
            prompt:`Prepare questions for job interview .
            The job role is ${role}.
            The job experience level is ${level}.
            The job tech stack used is ${texhstack}.
            The focus between behavioral and technical questions should lean towards ${type}.
            The amount of questions should be ${ammount}.
            Please return only the questions without any additional text.
            The questions are going to be read by a voice asistant so do not use "/" or "*" or any other special characters.
            Return the questions formatted like this:
            ["question 1", "question 2", "question 3"]`,
        })

        const interview = {
            role,
            level,
            questions: JSON.parse(questions),
            techStacks: texhstack.split(",").map((tech:string) => tech.trim()),
            userId: userid,
            type,
            finalized: true,
            coverImage: getRandomInterviewCover(), 
            createdAt: new Date().toISOString(),
        }

        await db.collection("interviews").add(interview);
        return Response.json({
            success: true,
            message: "Interview questions generated successfully",
            data: interview,
        }, {
            status: 200,
        })
    } catch (error) {
        console.error("Error generating interview questions:", error);
        return Response.json({
            success: false,
            message: "Failed to generate interview questions",
            error: error instanceof Error ? error.message : "Unknown error",
        }, { status: 500 });
    }
}

export async function GET(request:Request){
    return Response.json({
        success: true,
        message: "GET request is not supported for this endpoint",
        data: null,
    },{
        status: 200, // Method Not Allowed
    })
}