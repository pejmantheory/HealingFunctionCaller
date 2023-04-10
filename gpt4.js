const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

// Replace 'your_api_key' with your actual API key
openai.apiKey = process.env.OPENAI_KEY

async function getCompletion(prompt, maxTokens = 1024) {
  try {
    const response = await openai.createCompletion({
      model: 'gpt-4-0818-paid-t2',
      prompt: prompt,
      max_tokens: maxTokens,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    if (response.data && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      throw new Error('No completion found');
    }
  } catch (error) {
    console.error('Error fetching completion:', error);
    throw error;
  }
}

module.exports = getCompletion;