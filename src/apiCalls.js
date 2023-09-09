import axios from "axios";
import ora from "ora";

const endpoint = "https://api.openai.com/v1/chat/completions";
const AUTH_KEY =
  "QmVhcmVyIHNrLXI0RWhyRlhsbkh1b0ZjRlRUcVlaVDNCbGJrRkpjSDQ1WWVXVWNXaDZRemdwYmhQVA==";

let responseBuffer = "";

export async function getResponseFromAPI(userInput, showSpinner = true) {
  try {
    const spinner = showSpinner ? ora("Loading...").start() : null;
    const response = await getResponse(userInput);
    if (spinner) {
      spinner.stop();
    }
    const reader = response.data;

    reader.on("data", (chunk) => {
      responseBuffer += chunk.toString();
      processResponses();
    });

    reader.on("end", () => {
      processResponses();
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getResponse(userInput) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${atob(AUTH_KEY)}`,
  };

  let res = await axios.post(
    endpoint,
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }],
      stream: true,
    },
    {
      responseType: "stream",
      headers: headers, // Set the headers
    }
  );
  return res;
}

function processResponses() {
  const responseList = responseBuffer.split("data:");
  responseBuffer = responseList.pop();

  for (const response of responseList) {
    const contentStartIndex = response.indexOf('"content":"');
    if (contentStartIndex !== -1) {
      const contentEndIndex = response.indexOf('"', contentStartIndex + 11);
      if (contentEndIndex !== -1) {
        const contentValue = response
          .substring(contentStartIndex + 11, contentEndIndex)
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t")
          .replace(/\n6$/, "");

        process.stdout.setEncoding("utf16le");
        process.stdout.write(contentValue);
      }
    }
  }
}
