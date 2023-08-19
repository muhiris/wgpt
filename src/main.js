import { getResponseFromAPI } from "./apiCalls.js";
import { parseCommandLineArguments } from "./aurgumentsHandler.js";
import { displayUsage, displayVersion } from "./display.js";

async function processResponse(userInput, spinner = true) {
  const content = await getResponseFromAPI(userInput, spinner);
  console.log("\n");
  if (content !== undefined) {
    const words = content.split(" "); // Split content into words
    process.stdout.write(words);
  }
}
export async function main() {
  const userArguments = process.argv.slice(2);
  const parsedArguments = parseCommandLineArguments(userArguments);
  if (userArguments.length === 0) {
    console.log("\n🌟 Welcome to wgpt! The Wonderful GPT-3 Tool 🌟");
    console.log("\n\tType 'wgpt -h' for help ");

    return;
  }
  if (parsedArguments.versionFlag) {
    displayVersion();
  } else if (parsedArguments.helpFlag) {
    displayUsage();
  } else if (parsedArguments.codeFlag || parsedArguments.rephraseFlag) {
    if (parsedArguments.invalidFlagUsage) {
      console.log("Please provide valid Input or type wgpt -h for help.");

      return;
    }
    const flag = parsedArguments.codeFlag
      ? "Write code for "
      : "Repharase it in 3 ways: ";
    const userInput = parsedArguments.messageContent;
    processResponse(flag + userInput).catch((err) => {
      console.error("Error:", err.message);
    });
  } else {
    const userInput = parsedArguments.userInput;
    processResponse(userInput).catch((err) => {
      console.error("Error:", err.message);
    });
  }
}
