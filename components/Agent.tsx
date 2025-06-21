import { AgentProps } from "@/types"


enum CallStatus{
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

interface SavedMessage{
    role : "user" | "system" | "assistant";
    content : string;
}


const Agent = ({
    type,
    userName,
    feedbackId,
    interviewId,
    questions,
    userId
}:AgentProps) => {
  return (
    <div>Agent</div>
  )
}

export default Agent