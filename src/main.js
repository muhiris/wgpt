import cookies from './cookies.js';
import readline from 'readline';
import Bard from './Bard.js';
import ora from 'ora';

const main = async () => {
  try {
    // Get the cookie
    const cookie = cookies.getCookie();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // If the cookie doesn't exist, prompt the user to enter it
    if (!cookie) {
      const userCookie = await new Promise((resolve) => {
        rl.question('Please enter your cookie: ', resolve);
      });

      // Set the cookie
      cookies.setCookie(userCookie);
      rl.close();
    }

    const myBard = new Bard(cookie);
    const input = process.argv.slice(2).join(' ');
    if (!input) {
      throw new Error('Please enter a question.');
    }
    const spinner = ora('Thinking...').start();
    const result = await myBard.ask(input);
    if (spinner) {
      spinner.stop();
    }
    console.log(result);
  } catch (err) {
    // console.log(err);
    console.log('Please run again.\n\nType "node index.js <your input>"');
  }
};

export default main;
