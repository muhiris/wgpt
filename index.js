#!/usr/bin/env node
import axios from "axios";
import clipboardy from "clipboardy";

// Read the command line arguments
const args = process.argv.slice(2);

// Check for --help flag
if (args.includes("--help")) {
  console.log('Usage: node app.js [OPTIONS] "Prompt Text "\n');
  console.log("Options:");
  console.log(
    '-h: Add "Rephrase this sentence in 3 different ways " at the start of the input'
  );
  console.log('-c: Add "Write code for" at the start of the input');
  console.log(
    "--no-clipboard: Turn off copying the response to the system clipboard"
  );
  console.log("--help: Show usage instructions");
  process.exit(0);
}

// If no arguments provided, show usage instructions
if (args.length === 0) {
  console.log(
    "Error: No arguments provided. Use --help for usage instructions."
  );
  process.exit(1);
}

let prompt = args.join(" ");

// Check for flags
let rephraseFlag = false;
let writeCodeFlag = false;
let clipboardFlag = true;

if (args.includes("-h")) {
  rephraseFlag = true;
  prompt = "Rephrase this sentence in 3 different ways " + prompt;
}

if (args.includes("-c")) {
  writeCodeFlag = true;
  prompt = "Write code for " + prompt;
}

if (args.includes("--no-clipboard")) {
  clipboardFlag = false;
}

// Prepare the data payload
const data = {
  prompt: prompt,
};

// Set the headers
const headers = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/110.0",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.5",
  "Content-Type": "application/json",
  Origin: "https://chatbot.theb.ai",
  Referer: "https://chatbot.theb.ai/",
};

// Send the POST request
const url = "https://chatbot.theb.ai/api/chat-process";

axios
  .post(url, data, { headers })
  .then((response) => {
    if (response.status === 200) {
      const response_text = response.data;

      // Find the last JSON string in the response text
      const json_strings = response_text.trim().split("\n");
      const last_json_string = json_strings[json_strings.length - 1];

      const response_json = JSON.parse(last_json_string);
      const outputText = response_json.text;

      console.log(outputText);

      // Copy to clipboard if -h flag is used and clipboardFlag is true
      if (rephraseFlag && clipboardFlag) {
        clipboardy.writeSync(outputText);
        console.log("Response copied to clipboard.");
      }
    } else {
      console.log("Error:", response.status);
    }
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });
