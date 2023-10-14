import Bard from "./Bard.js";
import ora from "ora";
let myBard = new Bard(
	'bQiyIOIje1D9wX9ESrrtomNomaswCmYmGyllAnjYaMuKOr4VUxF16Z1-OJ8qVv3bQilP_g.'
);

const main = (async () => {
	try {
		const input = process.argv.slice(2).join(' ');
		const spinner = ora('Thinking...').start();
		const result = await myBard.ask(input);
		if (spinner){
			spinner.stop();
		}
		console.log(result);
	} catch (err) {
		console.log('There is some Error maybe you haven\'t provided the input. \n\nType "node index.js <your input>"');
	}
});
export default main