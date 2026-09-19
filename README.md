# 💰 Expense Tracker

A browser-based expense tracker built from scratch using vanilla HTML, CSS, and JavaScript — no frameworks, no libraries. Built as a learning project to practice core JavaScript concepts like DOM manipulation, event handling, state management, and data visualization.

🔗 **Live Demo:** https://roshan7ty.github.io/expense-tarcker-/

## ✨ Features

- Set a monthly income
- Add expenses with description, amount, category, and date
- Edit existing expenses
- Delete expenses
- Live balance calculation (Income − Total Expenses)
- Data persists across refreshes using `localStorage`
- Input validation — no negative income or expense amounts
- Transactions automatically sorted by date
- Category breakdown dashboard (Food, Travel, Rent, Entertainment, Investments) showing:
  - An animated pie chart of spending by category
  - Animated progress bars showing what percentage of income each category consumes
- Fully responsive — works on desktop, tablet, and mobile
- Dark, modern UI with smooth animations and transitions

## 🛠️ Built With

- HTML5
- CSS3 (Flexbox, Grid, custom properties, `conic-gradient` for the pie chart, keyframe animations)
- Vanilla JavaScript (ES6+) — no frameworks or libraries

## 🧠 What I Learned

- DOM manipulation and rendering UI dynamically from a JavaScript array, treating the array as a single source of truth
- Event delegation — handling clicks on dynamically created buttons without attaching a listener to every individual item
- Managing UI "state" (e.g. tracking whether the form is in "Add" or "Edit" mode) and keeping multiple functions in sync with that state
- Persisting data with `localStorage`, including converting objects/arrays to and from JSON
- Building a category-based data visualization using an object as a lookup/accumulator, plus CSS `conic-gradient` to render a pie chart without any charting library
- Debugging real issues, including a duplicate event listener bug, misplaced code causing execution-order errors, and CSS overflow issues caused by default flex/grid min-width behavior
- Git & GitHub fundamentals — committing, pushing, resolving a diverged branch with `git pull` and a merge strategy, and deploying with GitHub Pages

## 🚀 Getting Started

1. Clone the repo:
   ```
   git clone https://github.com/roshan7ty/expense-tarcker-.git
   ```
2. Open `index.html` in your browser — no build step or dependencies required.

Note: data is stored in your browser's `localStorage`, so it's private to your own browser/device and won't sync across different devices or browsers.

## 📋 Planned Features (Work in Progress)

- [ ] Rebuild with React as a v2
- [ ] Add a backend (Node.js + a database) so data persists across devices
- [ ] Savings goal tracker — set a goal (e.g. "Buy a bike") and visualize progress based on spending habits
- [ ] AI-assisted expense categorization

## 📄 License

This project is open source and available for anyone to learn from or build on.
