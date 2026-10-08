# This is a `.gitignore` file creation cli tool

> The Aim

- to enable create a `.gitignore` file and a `.npmignore` file. 
- to ensure i don't make a mistake of push secrets to github.
- just expanding my skill level.

## INSTALLATION

```bash
  npm i -g ignore-creation
```
### USAGE 
1. How to run it in it's own terminal interface
```bash
start-mgr
```

> Note once you run the command above all commands below will be the same excluding the `solve` command.


2. How to run it normally

- To create .gitignore file
```bash
  solve gitignore 
```
- To create .npmignore file
```bash
  solve npmignore 
```

- To remove the files
```bash
solve git-rm
```
- To remove .gitignore file
```bash
solve rm-gitignore
```
- To remove .npmignore file
```bash
solve rm-npmignore
```

- To remove any file
```bash
solve rm <name-of-file>
```
- To add any file
```bash
solve mk <name of file>
```

- To add any file with contents
```bash
solve mk <name of file> -ct content
```
* To clear the terminal without exiting
```bash
clear
```
or Ctrl + L
* Then to exit

```bash
exit
```
or 

Ctrl + C

> Have fun with this tool it took a couple of ours so do me a favour and star this repo


