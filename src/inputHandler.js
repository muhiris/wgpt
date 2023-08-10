import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function getUserInput() {
  return new Promise((resolve) => {
    rl.question("\n➜ ", (answer) => {
      resolve(answer);
    });
  });
}

export function closeReadline() {
  rl.close();
}
