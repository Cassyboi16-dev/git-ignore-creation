#!/usr/bin/env node

const fs = require("node:fs/promises")

async function ignoreFile(clue) {
  if (clue === 'gitignore') {
    const file1 = ".gitignore"
    const file2 = ".npmignore"
    await fs.writeFile(".gitignore", "node_modules\n.env\n.env.local")
    await fs.writeFile(".npmignore", "node_modules")
    console.log(`${file1} and ${file2} have been created and initalized`);
  } else if (clue === 'git-rm') {
    await fs.rm(".gitignore", { recursive: true, force: true })
    await fs.rm(".npmignore", { recursive: true, force: true })
  } else {
    return (
      console.error("trouble with creating files")
    )
  }
}

const terminalCommand = process.argv[2];
ignoreFile(terminalCommand);