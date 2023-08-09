import { getUserInput, closeReadline } from "./inputHandler.js";
import { getResponseFromAPI } from "./apiCalls.js";
import { parseCommandLineArguments } from "./aurgumentsHandler.js";
import { displayUsage, displayVersion } from "./display.js";

export async function main() {
  const userArguments = process.argv.slice(2);
  const parsedArguments = parseCommandLineArguments(userArguments);

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
        console.log(">", content);
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
      console.log("Please provide a valid flag or type wgpt -h for help.");
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
      console.log(content);
    } catch (error) {
      console.error("Error:", error.message);
    }
  } else {
    const userInput = parsedArguments.userInput;

    try {
      const content = await getResponseFromAPI(userInput);
      console.log(content);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  closeReadline();
}
