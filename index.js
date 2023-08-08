#!/usr/bin/env node
import axios from "axios";
import readline from "readline";

const endpoint = "https://free.churchless.tech/v1/chat/completions";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getUserInput() {
  const input = await new Promise((resolve) => {
    rl.question("\n> ", (answer) => {
      resolve(answer);
    });
  });

  if (input.trim() === "") {
    console.log("Please provide a message.");
    return getUserInput();
  } else {
    return input;
  }
}

async function main() {
  const userArguments = process.argv.slice(2);

  if (userArguments.includes("-i")) {
    console.log("Interactive mode. Enter 'exit' to quit.");

    while (true) {
      const userInput = await getUserInput();

      if (userInput.toLowerCase() === "exit") {
        console.log("\nExiting interactive mode.");
        break;
      }

      try {
        const response = await axios.post(endpoint, {
          messages: [{ role: "user", content: userInput }],
        });

        const content = response.data.choices[0].message.content;
        console.log(">", content);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  } else if (userArguments.includes("-v")) {
    console.log("Version: 1.1.1");
  } else if (userArguments.includes("-h") || userArguments.includes("--help")) {
    console.log("Usage:");
    console.log("wgpt -i    : Enter interactive mode");
    console.log("wgpt -v    : Display version from package.json");
    console.log("wgpt -c    : Add 'Write code for' at start of message");
    console.log(
      "wgpt -p    : Add 'Rephrase it in 3 ways: ' at start of message"
    );
    console.log("wgpt -h/--help : Show help");
  } else if (userArguments.includes("-c") || userArguments.includes("-p")) {
    const messageIndex =
      userArguments.indexOf("-c") !== -1
        ? userArguments.indexOf("-c")
        : userArguments.indexOf("-p");
    if (messageIndex === -1 || messageIndex === userArguments.length - 1) {
      console.log("Please provide a message after the flag.");
      return;
    }

    const messageContent = userArguments.slice(messageIndex + 1).join(" ");
    const flag = userArguments[messageIndex];

    let userInput = messageContent;

    if (flag === "-c") {
      userInput = `Write code for "${messageContent}"`;
    }

    if (flag === "-p") {
      userInput = `Rephrase it in 3 ways: "${messageContent}"`;
    }

    try {
      const response = await axios.post(endpoint, {
        messages: [{ role: "user", content: userInput }],
      });

      const content = response.data.choices[0].message.content;
      console.log(content);
    } catch (error) {
      console.error("Error:", error.message);
    }
  } else {
    const userInput = userArguments.join(" "); // Join all arguments as the user input

    try {
      const response = await axios.post(endpoint, {
        messages: [{ role: "user", content: userInput }],
      });

      const content = response.data.choices[0].message.content;
      console.log(content);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  rl.close();
}

main();
