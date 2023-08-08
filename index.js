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
  const userArgument = process.argv[2];

  if (userArgument === "-i") {
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
  } else if (userArgument === "-v") {
    console.log("Version: 1.1.0");
  } else if (userArgument === "-h" || userArgument === "--help") {
    console.log("Usage:");
    console.log("node index.js -i    : Enter interactive mode");
    console.log("node index.js -v    : Display version from package.json");
    console.log(
      "node index.js -c    : Add 'Write code for' at start of message"
    );
    console.log(
      "node index.js -p    : Add 'Rephrase it in 3 ways: ' at start of message"
    );
    console.log("node index.js -h/--help : Show help");
  } else if (userArgument) {
    const messageContent = process.argv.slice(3).join(" "); // Combine all arguments after the flag

    let userInput = messageContent;

    if (userArgument === "-c") {
      userInput = `Write code for "${messageContent}"`;
    }

    if (userArgument === "-p") {
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
    const userInput = await getUserInput();

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
