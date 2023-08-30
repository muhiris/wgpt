# wgpt

![npm](https://img.shields.io/npm/v/wgpt) ![npm](https://img.shields.io/npm/dt/wgpt) ![NPM](https://img.shields.io/npm/l/wgpt)

`wgpt` is an npm package that allows you to interact with an ChatGPT right from your terminal. With `wgpt`, you can easily send messages to the AI chat, get responses, and even perform rephrasing or add code snippets to your messages. It's a convenient tool for experimenting with AI and generating creative responses.

## Installation

To install `wgpt`, make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system. Then, run the following command:

```bash
npm install -g wgpt
```

The `-g` flag ensures that `wgpt` is installed globally on your system, making it accessible from any directory.

## Helping And Contributing

Help `wgpt` by giving it stars on [GitHub repository](https://github.com/muhiris/wgpt).

Also contributions to `wgpt` are welcome! If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/muhiris/wgpt).

## Usage

`wgpt` can be used directly from the terminal. Here are some examples of how to use it:

```bash
# Send a simple message to the AI chat
wgpt 'Hello, AI!'
# Add 'Write code for' at start of message
wgpt -c 'Hello World'
# Add 'Rephrase it in 3 ways: ' at start of message
wgpt -p 'How are you?'
# To check version
wgpt -v
#To ask help
wgpt -h
# or
wgpt --help

```

The command-line arguments are as follows:

- `-v`: Display version information from the `package.json`.

- `-c`: Add "Write code for" at the start of your message.

- `-p`: Add "Rephrase it in 3 ways: " at the start of your message.

- `-h` or `--help`: Show help and usage information.

## Features

- Send messages to an AI chat and receive responses.
- Rephrase your messages in three different ways and copy the results to the clipboard.
- Add code snippets to your messages for the AI to process.

## License

`wgpt` is open-source software licensed under the MIT License.

## Author

`wgpt` is authored by Muhammad Haris. You can contact the author [via email](mailto:muhammadharis786@protonmail.com).

## Acknowledgments

`wgpt` was inspired by the desire to make AI interactions more accessible and user-friendly.
