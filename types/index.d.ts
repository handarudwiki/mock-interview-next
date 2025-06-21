type FromType = "sign-in" | "sign-up"

export interface Interview {
    id: string;
    role: string;
    level : string;
    questions: string[];
    techStacks : string[];
    userId : string;
    type : string;
    finalized: boolean
    createdAt: string;
}

interface AgentProps{
    userName: string;
    userId?:string;
    interviewId?: string;
    feedbackId?: string;
    type : "generate" | "interview";
    questions?: string[];
}

interface TechIconsProps{
    techStacks: string[];
}