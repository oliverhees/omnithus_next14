import mongoose, { Schema } from "mongoose";

const TemplateSchema = new Schema(
  {
    name: String,
    category: String,
    temperature: Number,
    prompt: String,
  },
  { timestamps: true }
);

const Template =
  mongoose.models.Template || mongoose.model("Template", TemplateSchema);

export default Template;
