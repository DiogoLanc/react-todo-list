# React To-Do List

This is a simple to-do list project built using **Vite**, **React**, and **TypeScript**.  
It was created to practice and apply React concepts such as:

- Component structure and reusability
- React Hooks
- Conditional rendering
- Form validation
- API interaction
- UI components (Modals, Toasters, Popovers)

## Features

- Add, edit, and delete tasks
- Filter tasks by id, name, completion status and priority
- Task details including body, email, name, due date and priority
- Mark tasks as complete/incomplete
- Dynamic styling based on task state (overdue, due today, completed, 'x' days remaining)
- Form validation: required fields, email format validation, error messages
- Delete confirmation modal
- Success toast notifications for create, update, and delete actions
- Due date popover showing days remaining or overdue status
- Priority levels (Low, Medium, High) with their representative colors
- Data persistence with a local server using `json-server` ('db.json')

---

## How to run

```bash
# 1. Install dependencies
npm install

# 2. Run the mock backend (json-server)
npm run server

# Run the dev server (in a separate terminal)
npm run dev

```
