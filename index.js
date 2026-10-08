#!/usr/bin/env node

import fs from "node:fs/promises";
import chalk from "chalk";
import readline from "node:readline"; // Changed to default readline for keypress events

// Modern Chalk syntax supports custom hex values flawlessly in ES Modules
const error1 = chalk.hex('#ff0000');
const warning = chalk.hex('#FA5019');
const success = chalk.hex('#00FA8C');

const file1 = ".gitignore";
const file2 = ".npmignore";

async function ignoreFile(clue) {
  if (clue === 'ignore') {
    await fs.writeFile(".gitignore", "node_modules\n.env\n.env.local");
    await fs.writeFile(".npmignore", "node_modules");
    console.log(success(`${file1} and ${file2} have been created and initialized`));

  } else if (clue === 'gitignore') {
    await fs.writeFile(".gitignore", "node_modules\n.env\n.env.local");
    console.log(success(`${file1} has been created and initialized`));

  } else if (clue === 'npmignore') {
    await fs.writeFile(".npmignore", "node_modules");
    console.log(success(`${file2} has been created and initialized`));

  } else if (clue === 'git-rm') {
    await fs.rm(".gitignore", { recursive: true, force: true });
    await fs.rm(".npmignore", { recursive: true, force: true });
    console.log(warning(`${file1} and ${file2} have been removed`));

  } else if (clue === 'rm-gitignore') {
    await fs.rm(".gitignore", { recursive: true, force: true });
    console.log(warning(`${file1} has been removed`));

  } else if (clue === 'rm-npmignore') {
    await fs.rm(".npmignore", { recursive: true, force: true });
    console.log(warning(`${file2} has been removed`));

  } else if (clue === "rm") {
    const file = process.argv[3];

    if (!file) {
      console.error(error1("Error: Please specify a file name. Example: node script.js rm dummy.txt"));
      process.exit(1); 
    }

    try {
      await fs.rm(file, { recursive: true, force: true });
      console.log(warning(`${file} successfully removed`));
    } catch (error) {
      console.error(error1(`Trouble deleting ${file}: ${error.message}`));
      process.exit(1);
    }

  } else if (clue === "mk") {
    const file = process.argv[3];
    const flag = "ct";

    if (!file) {
      console.error(error1("Error: Please specify a file name. Example: node script.js mk dummy.txt"));
      process.exit(1);
    }

    const nodeFlag = flag === "ct" ? "wx" : "w";

    try {
      await fs.writeFile(file, "console.log('Hello user')", { flag: nodeFlag });
      console.log(success(`${file} successfully created`));
    } catch (error) {
      if (error.code === 'EEXIST') {
        console.error(error1(`Error: ${file} already exists`));
      } else {
        console.error(error1(`Trouble creating ${file}: ${error.message}`));
      }
      process.exit(1);
    }

  } else if (clue === "clear") {
    console.clear();

  } else if (!clue) {
    // If no argument is provided, display a gentle prompt instead of throwing an error immediately
    console.log(warning("CLI is active. Press Ctrl+L to clear screen, or Ctrl+C to exit."));

  } else {
    console.error(error1("Error: Trouble with creating/removing files. Invalid option."));
    console.error(warning("Available flags: ignore, gitignore, npmignore, git-rm, rm-gitignore, rm-npmignore, rm [filename], mk [filename], clear"));
    process.exit(1);
  }
}

// --- Keypress & Raw Mode Setup ---
// Placed cleanly at the top-level scope so it monitors the terminal smoothly
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on('keypress', (str, key) => {
  // Shortcut: Ctrl + L to Clear
  if (key.ctrl && key.name === 'l') {
    console.clear();
    return; 
  }

  // Shortcut: Ctrl + C to Exit cleanly
  if (key.ctrl && key.name === 'c') {
    process.exit(0);
  }

  // Reflect keys back to terminal screen if typing
  if (!key.ctrl && !key.meta) {
    process.stdout.write(str);
  }
});

// Execute the command parsed from arguments
const terminalCommand = process.argv[2];
ignoreFile(terminalCommand);
