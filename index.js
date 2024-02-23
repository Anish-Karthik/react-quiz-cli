#!/usr/bin/env node
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
const questionsBasedOnReact = [
  {
    question: "What is React?",
    choices: [
      "A library for building user interfaces",
      "A framework for building user interfaces",
      "A language for building user interfaces",
      "A tool for building user interfaces",
    ],
    crctIndex: 0,
  },
  {
    question: "What is the virtual DOM?",
    choices: [
      "A virtual representation of the DOM",
      "A JavaScript object that describes the structure of a UI",
      "A way to efficiently update the UI without directly manipulating the real DOM",
      "A concept introduced by React to optimize rendering performance",
    ],
    crctIndex: 0,
  },
  {
    question: "What is the purpose of render() in React?",
    choices: [
      "To perform any side effects after the component is rendered",
      "To render the component and its child components",
      "To update the state of the component",
      "To handle user interactions and events",
    ],
    crctIndex: 1,
  },
  {
    question: "What is the purpose of componentDidMount() in React?",
    choices: [
      "To update the state of the component",
      "To handle user interactions and events",
      "To optimize rendering performance",
      "To perform any side effects after the component is rendered",
    ],
    crctIndex: 3,
  },
  {
    question: "What is the purpose of setState() in React?",
    choices: [
      "To pass data from parent to child component",
      "To pass data from child to child component",
      "To pass data from child to parent component",
      "To pass data from parent to parent component",
    ],
    crctIndex: 0,
  },
  {
    question: "What is the purpose of setState() in React?",
    choices: [
      "To handle user interactions and events",
      "To optimize rendering performance",
      "To update the state of the component",
      "To perform any side effects after the component is rendered",
    ],
    crctIndex: 2,
  },
];
let playerName;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "who wants to be a React millionaire? \n"
  );
  await sleep(2000);
  rainbowTitle.stop();
  console.log(`
    ${chalk.bgGreen("How to play!")}
    I am a ${chalk.green("process")} on your computer.
    If you answer any of the questions incorrectly, I will be ${chalk.red(
      "killed"
    )}.
    ${chalk.bgBlue(
      `Answer ${chalk.blue(
        questionsBasedOnReact.length
      )} questions to win $1,000,000!`
    )}
  `);
}
async function askName() {
  const response = await inquirer.prompt([
    {
      type: "input",
      name: "player_name",
      message: "What is your name?",
      default: "Player",
    },
  ]);
  playerName = response.player_name;
  console.log(`Hello, ${playerName}!`);
}
async function askQuestion(question, choices, qno, crctIndex) {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: qno,
      message: question,
      choices: choices,
    },
  ]);
  return handleAnswer(ans[qno] == choices[crctIndex]);
}
async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep(2000);
  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}!`, color: `green` });
    return true;
  }
  spinner.error({ text: `💀💀💀 ${playerName} you got me killed...`, color: `red` });
  process.exit(1);
}
function winner() {
  console.clear();
  const msg = `Congrats, ${playerName}! \n $ 1, 0 0 0, 0 0 0!`;

  figlet(msg, (err, data) => {
    console.log(gradient.rainbow.multiline(data));
  });
}
console.clear();
await welcome();
await askName();
for (let i = 0; i < questionsBasedOnReact.length; i++) {
  const q = questionsBasedOnReact[i];
  await askQuestion(q.question, q.choices, `q${i}`, q.crctIndex);
}
winner();
