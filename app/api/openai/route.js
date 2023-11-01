import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { templateOutput } = await request.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
  });
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `${templateOutput}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(chatCompletion.choices[0].message.content);

  return NextResponse.json(
    { message: chatCompletion.choices[0].message.content },
    { status: 200 }
  );
}

/*Get all templates*/
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const templates = await Template.findOne({ _id: id });
  return NextResponse.json({ templates }, { status: 200 });
}
