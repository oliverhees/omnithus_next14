import connectMongoDB from "@/libs/mongodb";
import Template from "../../../models/template";
import { NextResponse } from "next/server";

/*Create a new template*/
export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newName: name,
    newCategory: category,
    NewTemperature: temperature,
    NewPrompt: prompt,
  } = await request.json();
  await connectMongoDB();
  await Template.findbyIdandUpdate(id, { name, category, temperature, prompt });
  return NextResponse.json({ message: "Template Updated" }, { status: 200 });
}

/*Get all templates*/
export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const templates = await Template.findOne({ _id: id });
  return NextResponse.json({ templates }, { status: 200 });
}
