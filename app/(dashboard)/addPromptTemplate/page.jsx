"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AddPromptTemplate = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [temperature, setTemperature] = useState("");
  const [prompt, setPrompt] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !temperature || !prompt) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/template`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, temperature, prompt }),
      });

      if (res.ok) {
        //extrakt id from response
        const { id } = await res.json();
        router.push(`/usePrompt/${id}`);
      } else {
        throw new Error("Failed to create prompt template");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 h-screen">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Create a new Prompt Template
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Template Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select category</option>
                <option value="React">React</option>
                <option value="Eigene">Eigene</option>
                <option value="Test">Test</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="temperature"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kreativitätslevel
              </label>
              <input
                onChange={(e) => setTemperature(e.target.value)}
                value={temperature}
                type="number"
                name="temperature"
                id="temperature"
                min="1"
                max="5"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="1"
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="prompt"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Write your prompt
              </label>
              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                id="prompt"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Prompt here..."
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Save Template
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddPromptTemplate;
