import { chromium } from "playwright";
import clipboardy from "clipboardy";

const url = "https://aichatonline.org/chat/";
const DEFAULT_TIMEOUT_SECONDS = 7;

async function scrape(message, timeoutSeconds) {
  try {
    const browser = await chromium.launch({ headless: true }); // Run with a visible browser window
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the chat URL
    await page.goto(url);

    // Type the provided message into the textarea
    await page.fill("textarea", message);

    // Click the 'Send' button
    await page.press("textarea", "Enter");

    // Wait for the specified or default timeout for the response to be generated
    await page.waitForTimeout(
      (timeoutSeconds || DEFAULT_TIMEOUT_SECONDS) * 1000
    );

    // Extract the most recent response div
    const mostRecentResponse = await page.evaluate(() => {
      const div = document.querySelector(".mwai-reply.mwai-ai:last-child");
      return div ? div.textContent : null;
    });

    // Remove the word "AI" from the beginning of the response
    const cleanedResponse = mostRecentResponse.replace(/^AI/, "");

    // Log the cleaned response
    console.log(cleanedResponse.trim());

    if (message.startsWith("Rephrase text in 3 ways: ")) {
      clipboardy.writeSync(cleanedResponse.trim());
      console.log("Result copied to the clipboard.");
    }

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Read command-line arguments
const args = process.argv.slice(2);
let message = null;
let timeoutSeconds = null;

// Parse command-line arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === "--help" || arg === "-h") {
    console.log("Usage: wgpt [message] [--timeout seconds] [-p] [-c]");
    console.log("Example 1: wgpt 'Hello, AI!'");
    console.log("Example 2: wgpt 'Hello, AI!' --timeout 10");
    console.log("Example 3: wgpt 'Hello, AI!' -p");
    console.log("Example 4: wgpt 'Write code to generate prime numbers' -c");
    process.exit(0);
  } else if (arg === "--timeout") {
    if (i + 1 < args.length) {
      timeoutSeconds = parseInt(args[i + 1]);
      i++; // Skip the next argument since it was used for the timeout value
    } else {
      console.log(
        "Invalid use of --timeout. Please provide a valid number for the timeout."
      );
      process.exit(1);
    }
  } else if (arg === "-p") {
    message = "Rephrase text in 3 ways: " + message;
  } else if (arg === "-c") {
    message = "Write code to: " + message;
  } else {
    message = arg;
  }
}

if (!message) {
  console.log(
    "Please provide a message as a command-line argument or type --help for more information."
  );
  process.exit(1);
}

scrape(message, timeoutSeconds);
