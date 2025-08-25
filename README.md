# Pindo - Code challenge

## Requirements

All the requirements and expectations are mentioned in the [task.pdf](./task.pdf) file.

## Chosen Tools

- Next.js
- Tailwind
- TypeScript
- Shadcn
- Lucide icons

## Roadmap

- [x] Create a tree data structure to represent the file system
- [x] Write tests for the tree data structure
- [x] Add base types for the file system nodes
- [x] Use the tree data structure to implement state management logic
- [x] Implement the file manager UI and necessary shared and UI components
- [x] Install react-hook-form and zod packages
- [x] Add a reusable form-generator component with validation
- [x] Prevent duplicate file and folder names
- [x] ~~Add form errors to errors.enum~~ (moved messages and errors to constants)
- [x] Fix file rename not working
- [x] Add dark mode
- Refactors
  - [x] Use command pattern for file system actions
  - [x] Refactor rename node command (break it into separate commands)
  - [x] Enforce lowercase file extensions
  - [x] Allow file name to be empty if extension is provided
  - [x] Do not allow folder names to be . or .. 


- Bug fixes
  - [x] Fix file rename issue acting as unchanged on wrong cases
  - [x] Improve UX on dialog close (form reset causes jumps in the UI)