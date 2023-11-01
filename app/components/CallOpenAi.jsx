"use client";
import { useState } from "react";

export default function CallOpenAi() {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState("Wie hoch ist der Eiffelturm?");

  //function for openai call
  async function handleOpenAi(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/openai", {
        method: "POST", // oder die geeignete HTTP-Methode
        headers: {
          "Content-Type": "application/json", // Setzen des Content-Type Headers
        },
        body: JSON.stringify({ formData }), // Hier wird die formData in JSON umgewandelt und als Anfragekörper gesendet
      });

      if (response.ok) {
        const { message } = await response.json();
        console.log(message);
        setData(message);
      } else {
        throw new Error("Failed to call openai");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      {data ? <div>Das ist die Antwort: {data}</div> : null}
      <button
        type="button"
        onClick={handleOpenAi}
        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Call OpenAI
      </button>
    </div>
  );
}
