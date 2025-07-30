import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
  return Response.json({ success: true, data: "Thank You" }, { status: 200 });
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for job interview.
      The job role is ${role}.
      The job experience level is ${level}.
      The tech stack used in the job is: ${techstack}.
      the focus between behavioural and technical questions should lean towards : ${type}.
      The amount of questions required is: ${amount}.
      Please return only the questions,without any additional text.
      The questions are going to be read by avoice assistant so do not use "/", or "*" or any other special characters which might break the voice assistant.
      Return the questions formatted like this:
      ["Ouestion 1","Ouestion 2","Ouestion 3"]

      Thank You!
      `,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json({ success: false, error }, { status: 500 });
  }
}

/*
{
  "type": "mixed",
  "role": "frontend",
  "level" : "senior",
  "techstack": "next.js",
  "amount": "7",
  "userid": "diilvNOtAQN9FDieHt1Xy8Es9972"
  }

*/
