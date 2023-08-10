import { getUserInput, closeReadline } from "./inputHandler.js";
import { getResponseFromAPI } from "./apiCalls.js";
import { parseCommandLineArguments } from "./aurgumentsHandler.js";
import { displayUsage, displayVersion } from "./display.js";

// Function to print words with animation
async function printWordsWithAnimation(words, delay) {
  for (const word of words) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    process.stdout.write(word + " "); // Print word with space
  }
  console.log(); // Print a new line after animation
}

export async function main() {
  const userArguments = process.argv.slice(2);
  const parsedArguments = parseCommandLineArguments(userArguments);
  if (userArguments.length === 0) {
    console.log("\n🌟 Welcome to wgpt! The Wonderful GPT-3 Tool 🌟");
    console.log("\n\tType 'wgpt -h' for help ");
    closeReadline();
    return;
  }
  if (parsedArguments.interactiveMode) {
    console.log("Interactive mode. Enter 'exit' to quit.");

    while (true) {
      const userInput = await getUserInput();

      if (userInput.toLowerCase() === "exit") {
        console.log("\nExiting interactive mode.");
        break;
      }

      try {
        const content = await getResponseFromAPI(userInput, false);
        const words = content.split(" "); // Split content into words
        const animationDelay = 30; // Adjust the delay as needed

        await printWordsWithAnimation(words, animationDelay);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  } else if (parsedArguments.versionFlag) {
    displayVersion();
  } else if (parsedArguments.helpFlag) {
    displayUsage();
  } else if (parsedArguments.codeFlag || parsedArguments.rephraseFlag) {
    if (parsedArguments.invalidFlagUsage) {
      console.log("Please provide valid Input or type wgpt -h for help.");
      closeReadline();
      return;
    }

    const flag = parsedArguments.codeFlag ? "-c" : "-p";
    const userInput = parsedArguments.messageContent;

    try {
      const content = await getResponseFromAPI(
        `${
          parsedArguments.codeFlag
            ? "Write code for "
            : "Rephrase it in 3 ways: "
        } "${userInput}"`
      );
      const words = content.split(" "); // Split content into words
      const animationDelay = 30; // Adjust the delay as neededs

      await printWordsWithAnimation(words, animationDelay);
    } catch (error) {
      console.error("Error:", error.message);
    }
  } else {
    const userInput = parsedArguments.userInput;

    try {
      const content = await getResponseFromAPI(userInput);
      const words = content.split(" "); // Split content into words
      const animationDelay = 30; // Adjust the delay as needed

      await printWordsWithAnimation(words, animationDelay);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  closeReadline();
}
