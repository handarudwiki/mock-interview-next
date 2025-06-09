import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button"
import { interviews } from "@/constants";
import Image from "next/image"
import Link from "next/link"

const page = () => {
  const hasPasInterview = true; // This would typically come from a state or prop
  return (
    <>
    <section className="card-cta">
      <div className="flex flex-col gap-6 max-w-lg">
        <h2>Get Interview-Ready with AI Powered Practice & Feedback</h2>
        <p className="text-lg">
          Practice real interview questions & get instant feedback
        </p>
        <Button asChild className="btn-primary max-sm:w-full">
          <Link href="/interview">Start an Interview</Link>
        </Button>
      </div>
      <Image
      src="/robot.png"
      alt="robot"
      width={400}
      height={400}
      className="max-sm:hidden"
      />
    </section>
    <section className="flex flex-col gap-6 mt-8">
      <h2>Your Interview</h2>
      <div className="interviews-section">
        {hasPasInterview ? (
            interviews.map((interview) => (
              <InterviewCard
              interviewId={interview.id}
              role={interview.role}
              type={interview.type}
              techStacks={interview.techStacks}
              createdAt={interview.createdAt}
              userId={interview.userId}
              key={interview.id}
              />
            ))
        ):(
          <p>You haven&apos;t taken any interviews yet</p>
        )}
      </div>
    </section>
  </>
  )
}

export default page