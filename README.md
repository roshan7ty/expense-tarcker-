# 💰 Expense Tracker

A simple, browser-based expense tracker built from scratch using vanilla HTML, CSS, and JavaScript — no frameworks, no libraries. Built as a learning project to practice core JavaScript concepts like DOM manipulation, event handling, and state management.

## ✨ Features

- Set a monthly income
- Add expenses with description, amount, category, and date
- Edit existing expenses
- Delete expenses
- Live balance calculation (Income − Total Expenses)
- Dynamic rendering — the UI updates automatically whenever data changes

## 🛠️ Built With

- HTML5
- CSS3 (Flexbox)
- Vanilla JavaScript (ES6+) — no frameworks or libraries

## 🧠 What I Learned

- DOM manipulation and rendering UI dynamically from a JavaScript array, treating the array as a single source of truth
- Event delegation — handling clicks on dynamically created buttons without attaching a listener to every individual item
- Managing UI "state" (e.g. tracking whether the form is in "Add" or "Edit" mode) and keeping multiple functions in sync with that state
- Debugging real issues, including a duplicate event listener bug that was causing extra blank entries to be added

## 🚀 Getting Started

1. Clone the repo:
   ```
   git clone https://github.com/roshan7ty/expense-tarcker-.git
   ```
2. Open `index.html` in your browser — no build step or dependencies required.

## 📋 Planned Features (Work in Progress)

- [ ] Persist data with `localStorage` so it survives a page refresh
- [ ] Input validation (prevent negative or zero amounts)
- [ ] Savings goal tracker — set a goal (e.g. "Buy a bike") and visualize progress based on spending habits
- [ ] Charts/graphs for spending by category
- [ ] Deploy live demo (GitHub Pages)

## 📄 License

This project is open source and available for anyone to learn from or build on.
