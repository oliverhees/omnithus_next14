import PromptAnalyser from "app/components/PromptAnalyser";
import CallOpenAi from "app/components/CallOpenAi";

const getTemplateById = async (id) => {
  try {
    // Fetch-Aufruf, um das Thema anhand seiner ID abzurufen
    const res = await fetch(`http://localhost:3000/api/template/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      // Fehlerbehandlung, wenn das Thema nicht abgerufen werden konnte
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default async function usePrompt({ params }) {
  const { id } = params;
  const { templates } = await getTemplateById(id);
  const { name, prompt } = templates;

  let variables = [];

  // Extrahieren der Variablen
  const regex = /#([^#]+)#/g;
  const matches = prompt.match(regex);
  variables = matches ? matches.map((match) => match.slice(1, -1)) : [];

  // Überprüfe, ob template vorhanden ist, bevor du es darstellst
  if (templates) {
    return (
      <div class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-col mx-auto max-w-screen-xl">
          <h1 className="text-2xl py-4">{name}</h1>
          <div className="gab-4">
            {variables.length > 0 && (
              <PromptAnalyser
                prompt={prompt}
                variables={variables}
                //onSubmit={handleVariableSubmit}
              />
            )}
          </div>
        </div>
        <CallOpenAi />
      </div>
    );
  } else {
    return <div>Loading...</div>; // Oder eine Fehlermeldung anzeigen, wenn template nicht gefunden wurde
  }
}
