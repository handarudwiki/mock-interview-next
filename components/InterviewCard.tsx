import { cn, getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import DisplayTechIcons from "./DisplayTechIcons";
import { Button } from "./ui/button";
import Link from "next/link";

interface InterviewCardProps {
  interviewId: string;
  userId: string;
  role: string;
  type: string;
  techStacks: string[];
  createdAt: string;
}

const InterviewCard = ({
  interviewId,
  role,
  type,
  techStacks,
  userId,
  createdAt,
}: InterviewCardProps) => {
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

const badgeColor = {
  Behavioral: "bg-light-400",
  Mixed: "bg-light-600",
  Technical: "bg-light-800",
}[normalizedType] || "bg-light-600";

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor
            )}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>
            <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"/>

          <h3 className="mt-5 capitalize">{role} Interviews</h3>
          {/* Data Socre */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
                <Image
                src="/calendar.svg"
                alt="calender"
                width={22}
                height={22}/>
                <p>{createdAt}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Image
                src="/star.svg"
                alt="star"
                width={22}
                height={22}/>
                
            <p>4.5</p>
            </div>
          </div>
            <p className="line-clamp-2 mt-5">
            You haven taken this interview yet. Take it now to improve your skills.
            </p>
      </div>
          <div className="flex flex-row justify-between">
            <DisplayTechIcons techStacks={techStacks}/>
            <Button className="btn-primary">
                <Link href={`/interview/${interviewId}`}>
                View Interview
                </Link>
            </Button>
          </div>
      </div>
    </div>
  );
};

export default InterviewCard;
