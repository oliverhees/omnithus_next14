"use client";
import { useState } from "react";

export default function PromptAnalyser({ prompt, variables, onSubmit }) {
  const initialValues = {};
  variables.forEach((variable) => {
    initialValues[variable] = "";
  });

  const [values, setValues] = useState(initialValues);
  const [data, setData] = useState(null);
  const [templateOutput, setTemplateOutput] = useState("");

  const handleInputChange = (variable, value) => {
    setValues({ ...values, [variable]: value });
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  const handleVariableSubmit = async (variable) => {
    variable.preventDefault();

    // Ersetzen der Variablen im Text
    let templateWithValues = prompt;
    variables.forEach((variable) => {
      templateWithValues = templateWithValues.replace(
        `#${variable}#`,
        values[variable]
      );
    });

    setTemplateOutput(templateWithValues);

    try {
      const response = await fetch("http://localhost:3000/api/openai", {
        method: "POST", // oder die geeignete HTTP-Methode
        headers: {
          "Content-Type": "application/json", // Setzen des Content-Type Headers
        },
        body: JSON.stringify({ templateOutput }), // Hier wird die formData in JSON umgewandelt und als Anfragekörper gesendet
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
  };

  return (
    <>
      <form onSubmit={handleVariableSubmit}>
        {variables.map((variable) => (
          <div key={variable} className="py-2">
            <label htmlFor={variable} className="font-semibold">
              {variable}
            </label>
            <input
              type="text"
              id={variable}
              value={values[variable]}
              onChange={(e) => handleInputChange(variable, e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Prompt Ausführen
        </button>
      </form>
      <div>
        {data ? (
          <div>
            Das ist die Antwort: <br /> {data}
          </div>
        ) : null}
      </div>
    </>
  );
}
