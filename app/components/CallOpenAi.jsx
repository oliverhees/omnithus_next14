"use client";
export default function CallOpenAi({ formData }) {
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

      const data = await response.json();
      if (data) {
        console.log(exerciseData);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button
      type="button"
      onClick={handleOpenAi}
      className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
    >
      Call OpenAI
    </button>
  );
}
