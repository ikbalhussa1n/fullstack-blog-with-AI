const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const aiService = {
  isAvailable: () => !!GROQ_API_KEY,

  generateBlogContent: async (topic) => {
    if (!GROQ_API_KEY) {
      throw new Error(
        "Groq API key is not configured. Add VITE_GROQ_API_KEY to your .env file."
      );
    }

    const prompt = `You are a professional blog writer. Write a well-structured, engaging blog post about the following topic:

"${topic}"

Requirements:
- Write 3-5 paragraphs
- Use a professional but conversational tone
- Include an engaging opening hook
- Include practical insights or examples
- End with a thoughtful conclusion
- Do NOT include a title (the user will provide one)
- Do NOT use markdown headers
- Write in plain text with paragraph breaks
- Keep it between 300-600 words`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.error?.message || `AI generation failed (${response.status})`
      );
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("AI returned an empty response. Please try again.");
    }

    return text.trim();
  },
};

export default aiService;
