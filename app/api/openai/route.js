import axios from "axios";

export async function POST(req, res) {
  try {
    const { text } = req.body; // Hier kannst du den Text aus dem Request-Body lesen

    // Deine OpenAI API-Zugangsdaten
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci/completions",
      {
        prompt: text,
        max_tokens: 50, // Anpassen, je nach Bedarf
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { choices } = response.data;
    const generatedText = choices[0].text;

    res.status(200).json({ generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fehler beim Senden der Anfrage an OpenAI" });
  }
}
