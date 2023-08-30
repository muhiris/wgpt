const displayUsage = () => {
  console.log("\nUsage: wgpt [options] [message]\n");
  console.log("wgpt [message]       : Get response from GPT-3 for the message");
  console.log(
    "wgpt -c [message]    : Add 'Write code for' at start of message"
  );
  console.log(
    "wgpt -p [message]    : Add 'Rephrase it in 3 ways: ' at start of message"
  );
  console.log("wgpt -v              : Display version from package.json");
  console.log("wgpt -h              : Show help");
};
const displayVersion = () => {
  console.log("1.1.6");
};

export { displayUsage, displayVersion };
