#!/usr/bin/env node

import fs from "node:fs/promises";
import chalk from "chalk";
import figlet from "figlet";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Custom hex colors
const error1 = chalk.hex('#ff0000');
const warning = chalk.hex('#FA5019');
const success = chalk.hex('#00FA8C');
const bannerColor = chalk.hex('#00BFFF'); // Cool Cyan for the banner

const file1 = ".gitignore";
const file2 = ".npmignore";

// This function processes the commands entered inside the loop
async function processCommand(inputLine) {
  // Split input line by spaces to mimic process.argv parsing
  const args = inputLine.trim().split(/\s+/);
  const clue = args[0]; // The actual command (e.g., 'mk', 'rm')
  const targetFile = args[1]; // The filename parameter (if provided)

  if (!clue) return; // Ignore empty inputs when user hits Enter

  if (clue === 'exit') {
    console.log(warning("Exiting interactive manager. Goodbye!"));
    process.exit(0);
  }

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
    if (!targetFile) {
      console.error(error1("Error: Please specify a file name. Example: rm dummy.txt"));
      return; // Return to loop instead of killing process
    }
    
    try {
      await fs.rm(targetFile, { recursive: true, force: true });
      console.log(warning(`${targetFile} successfully removed`));
    } catch (error) {
      console.error(error1(`Trouble deleting ${targetFile}: ${error.message}`));
    }

  } else if (clue === "mk") { 
    if (!targetFile) {
      console.error(error1("Error: Please specify a file name. Example: mk dummy.txt"));
      return; 
    }
    
    try {
      // Added 'wx' flag back here to guarantee EEXIST error catches duplicate files
      await fs.writeFile(targetFile, "console.log('Hello user')", { flag: "wx" });
      console.log(success(`${targetFile} successfully created`));
    } catch (error) {
      if (error.code === 'EEXIST') {
        console.error(error1(`Error: ${targetFile} already exists`));
      } else {
        console.error(error1(`Trouble creating ${targetFile}: ${error.message}`));
      }
    }

  } else {
    // Graceful error termination handling invalid options
    console.error(error1(`Error: Unknown command "${clue}".`));
    console.error(warning("Available commands: ignore, gitignore, npmignore, git-rm, rm-gitignore, rm-npmignore, rm [filename], mk [filename], exit"));
  }
}

async function startInteractiveShell() {
  // 1. Render the Figlet text banner synchronously on startup
  console.log(bannerColor(figlet.textSync("IGNORE MGR", { horizontalLayout: "default" })));
  console.log(chalk.dim("Type your command below. Type 'exit' to quit.\n"));

  // 2. Initialize Readline Interface
  const rl = createInterface({ input, output });

  // 3. Keep running the prompt indefinitely
  while (true) {
    const inputLine = await rl.question(chalk.bold.cyan("ignore-mgr > "));
    await processCommand(inputLine);
    console.log(""); // Empty line for clean visual padding between actions
  }
}

// Fire up the session loop
startInteractiveShell();
