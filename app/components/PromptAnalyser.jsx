"use client";
import { useState } from "react";
// components/VariableForm.js
// Extrahieren der Variablen
export default function PromptAnalyser({ prompt, variables, onSubmit }) {
  const initialValues = {};
  variables.forEach((variable) => {
    initialValues[variable] = "";
  });

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (variable, value) => {
    setValues({ ...values, [variable]: value });
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  const handleVariableSubmit = async (values) => {
    // Ersetzen der Variablen im Text
    let templateWithValues = text;
    variables.forEach((variable) => {
      templateWithValues = templateWithValues.replace(
        `#${variable}#`,
        values[variable]
      );
    });

    // Verwenden Sie templateWithValues für die OpenAI-Anfrage
    //const generatedResponse = await generatePrompt(templateWithValues);
    //console.log('Generated Response:', generatedResponse);
  };

  return (
    <form>
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
  );
}
