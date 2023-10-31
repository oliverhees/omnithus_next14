import connectMongoDB from "@/libs/mongodb";
import Template from "../../models/template";
import { NextResponse } from "next/server";

/*Create a new template
export async function POST(request) {
  const { name, category, temperature, prompt } = await request.json();
  await connectMongoDB();
  await Template.create({ name, category, temperature, prompt });
  return NextResponse.json(
    { message: "Template created", id: Template._id },
    { status: 200 }
  );
}*/

/*Create a new template*/
export async function POST(request) {
  const { name, category, temperature, prompt } = await request.json();
  await connectMongoDB();
  const template = await Template.create({
    name,
    category,
    temperature,
    prompt,
  });
  return NextResponse.json(
    { message: "Template created", id: template._id },
    { status: 200 }
  );
}

/*Get all templates*/
export async function GET() {
  await connectMongoDB();
  const templates = await Template.find({});
  return NextResponse.json({ templates });
}
