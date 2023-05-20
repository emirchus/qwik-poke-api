import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.PUBLIC_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export const getPokemonInformation = async (
  pokemon: string
): Promise<string> => {
  delete configuration.baseOptions.headers["User-Agent"];
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `dame información del pokemon ${pokemon}`,
    temperature: 1,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0].text ?? "Y ese pokemon re bobo";
};
