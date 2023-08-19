export function parseCommandLineArguments(args) {
  const parsedArgs = {
    versionFlag:
      args.includes("-v") || args.includes("--version") || args.includes("--v"),
    helpFlag: args.includes("-h") || args.includes("--help"),
    codeFlag: args.includes("-c"),
    rephraseFlag: args.includes("-p"),
  };

  if (parsedArgs.codeFlag || parsedArgs.rephraseFlag) {
    const messageIndex = args.indexOf(parsedArgs.codeFlag ? "-c" : "-p");
    if (messageIndex !== -1 && messageIndex !== args.length - 1) {
      parsedArgs.messageContent = args.slice(messageIndex + 1).join(" ");
    } else {
      parsedArgs.invalidFlagUsage = true;
    }
  } else {
    parsedArgs.userInput = args.join(" ");
  }

  return parsedArgs;
}
