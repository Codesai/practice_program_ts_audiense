# Code Forensic
[code-forensics](https://github.com/smontanari/code-forensics) is a toolset for analysing codebases stored in a version control system

# Instructions 
Before launching the analyses, clone a code repository in the "repositories" folder.
Then in rootPath variable of gulp file, put the name of the project folder to analyze.

## Show the analysis reports

`npm run start`

## Hotspot analysis

`npm run hotspot -- --dateFrom=xxxx-xx-xx`

## Knowledge map analysis

`npm run knowledge-map -- --dateFrom=xxxx-xx-xx`

