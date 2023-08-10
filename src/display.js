const displayUsage = () => {
  console.log("\nUsage: wgpt [options] [message]\n");
  console.log("wgpt -i              : Enter interactive mode");
  console.log("wgpt -v              : Display version from package.json");
  console.log(
    "wgpt -c [message]    : Add 'Write code for' at start of message"
  );
  console.log(
    "wgpt -p [message]    : Add 'Rephrase it in 3 ways: ' at start of message"
  );
  console.log("wgpt -h [message]    : Show help");
};
const displayVersion = () => {
  console.log("1.1.4");
  // get version from env file
};

// export both functions for es6 module
export { displayUsage, displayVersion };
