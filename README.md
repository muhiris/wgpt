# wgpt

![npm](https://img.shields.io/npm/v/wgpt) ![npm](https://img.shields.io/npm/dt/wgpt) ![NPM](https://img.shields.io/npm/l/wgpt)

`wgpt` is an npm package that allows you to interact with an AI chat [website](https://aichatonline.org/chat/) right from your terminal. With `wgpt`, you can easily send messages to the AI chat, get responses, and even perform rephrasing or add code snippets to your messages. It's a convenient tool for experimenting with AI and generating creative responses.

## Installation

To install `wgpt`, make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system. Then, run the following command:

```bash
npm install -g wgpt
```

The `-g` flag ensures that `wgpt` is installed globally on your system, making it accessible from any directory.

## Usage

`wgpt` can be used directly from the terminal. Here are some examples of how to use it:

```bash
# Send a simple message to the AI chat
wgpt 'Hello, AI!'

# Set a custom timeout (in seconds) for waiting for the AI response
wgpt 'Hello, AI!' --timeout 10

# Rephrase a message and copy the result to the clipboard
wgpt 'Rephrase text in 3 ways: How are you?' -p

# Add code to the message
wgpt 'Write code to calculate the factorial of a number' -c
```

The command-line arguments are as follows:

- `[message]`: The message you want to send to the AI chat.
- `--timeout [seconds]`: Set a custom timeout for waiting for the AI response (default is 7 seconds).
- `-p`: Rephrase the message in three different ways and copy the result to the clipboard.
- `-c`: Add code snippets to the message.
- `--help` or `-h`: Display the usage guide and examples.

## Features

- Send messages to an AI chat and receive responses.
- Rephrase your messages in three different ways and copy the results to the clipboard.
- Add code snippets to your messages for the AI to process.
- Set a custom timeout for waiting for AI responses.

## Contributing

Contributions to `wgpt` are welcome! If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/muhiris/wgpt).

## License

`wgpt` is open-source software licensed under the MIT License.

## Author

`wgpt` is authored by Muhammad Haris. You can contact the author [via email](mailto:muhammadharis786@protonmail.com)

## Acknowledgments

`wgpt` was inspired by the desire to make AI interactions more accessible and user-friendly.

---

**Disclaimer:** This package interacts with an external AI chat website. The behavior and responses of the AI are subject to change, and the availability of the chat website cannot be guaranteed indefinitely. Use this package responsibly and in accordance with the terms of service of the AI chat website. The author and maintainers are not responsible for any misuse or violations.
