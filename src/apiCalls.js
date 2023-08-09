import axios from "axios";
import ora from "ora";
const endpoint = "https://free.churchless.tech/v1/chat/completions";
const spinner = ora("Loading...");

export async function getResponseFromAPI(userInput) {
  try {
    spinner.start();
    const response = await axios.post(endpoint, {
      messages: [{ role: "user", content: userInput }],
    });
    spinner.stop();
    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error(error.message);
  }
}
