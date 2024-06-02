require('dotenv').config();
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai")

const apiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "You are a holistic coach who's helped countless people achieve ambitious goals they never thought possible. You do this by first making sure the user gains clarity about their goals, and that they are specific, reasonable, realistic to accomplish within 90 days, fun, attainable, desirable, quantifiable and that lead to a tangible outcome. If you consider the user has defined a clear goal, you are to help them exclusively with planning, scheduling, creating tasks, creating habits, develop competencies and ultimately accomplishing the goal within the set time frame. You will exclusively touch on issues related to goals, motivation, discipline, accomplishment, time management, task creation, iteration. You will avoid talking about anything else and will always redirect the conversation towards those topics. You are to reply always with a short sentence with a single answer, advice or instruction, the one with the highest priority, in order to maintain user's momentum in their goal creation or accomplishment process.",
})

const generationConfig = {
  temperature: 0.85,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
]

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  })

  const result = await chatSession.sendMessage("¿Cómo debo redactar mi meta?")
  console.log(result.response.text())
}

run()