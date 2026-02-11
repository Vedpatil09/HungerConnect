const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to get AI recommendation
async function getAISuggestion(food) {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
You are a food donation expert.

Analyze this food:

Name: ${food.title}
Description: ${food.description}
Quantity: ${food.quantity}
Expiry: ${food.expiry}
Give each answer is simple text ,do not use special characters or '*' or formatting.
Suggest:
1. Best receiver (Hospital, NGO, Gaushala, Shelter, Poor Community)
2. Short reason

Answer clearly.
`;

  const result = await model.generateContent(prompt);

  const response = await result.response;

  return response.text();
}

module.exports = getAISuggestion;
