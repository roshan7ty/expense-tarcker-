let transactions = [];
let income = 0;
let editingId = null;

const monthlyIncomeInput = document.getElementById('monthly-income');
const setIncomeBtn = document.getElementById('set-income-btn');

const incomeDisplay = document.getElementById('income');
const expensesDisplay = document.getElementById('expense-total');
const balanceDisplay = document.getElementById('balance');


const expenseForm = document.getElementById('expense-form');
const entrynameInput = document.getElementById('entry-name');
const entryamountInput = document.getElementById('entry-amount');
const expensecategoryInput = document.getElementById('entry-category');
const entrydateInput = document.getElementById('entry-date');
const expensebutton = document.getElementById('submit-btn');

const expenseList = document.getElementById('transaction-list');
const categoryColors = {
    Food: '#6366f1',
    Travel: '#34d399',
    Rent: '#fbbf24',
    Entertainment: '#f87171',
    Investments: '#38bdf8'
};

setIncomeBtn.addEventListener('click', () => {
    income = Math.abs(parseFloat(monthlyIncomeInput.value) || 0);
    incomeDisplay.textContent = income.toFixed(2);

    monthlyIncomeInput.value = '';
    updateDisplays();
    saveData();
    renderCategorySummary();
    renderPieChart();
    
});
function updateDisplays() {
    let totalExpenses = 0;
    transactions.forEach(function (t) {
        totalExpenses += t.amount;
    });
    expensesDisplay.textContent = totalExpenses.toFixed(2);
    balanceDisplay.textContent = (income - totalExpenses).toFixed(2);
}

function renderTransactions() {
    expenseList.innerHTML = '';
    transactions.sort(function (a, b) {
  return a.date.localeCompare(b.date);
});
    transactions.forEach(function (t) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${t.name} - ₹${t.amount.toFixed(2)} - ${t.category} - ${t.date}
     <button class="edit-btn" data-id="${t.id}">Edit</button>
     <button class="delete-btn" data-id="${t.id}">Delete</button>
`;
        expenseList.appendChild(listItem);
    });
}
expenseList.addEventListener('click', (event) => {
    const clickedButton = event.target;
    if (clickedButton.classList.contains('delete-btn')) {
        deleteTransaction(clickedButton.dataset.id);
    }
    if (clickedButton.classList.contains('edit-btn')) {
        const clickedId = clickedButton.dataset.id;
        startEdit(clickedId);
    }
});
function deleteTransaction(id) {
    transactions = transactions.filter(function (t) {
        return t.id != id;
    });
    if(id == editingId){
        editingId = null;
        expensebutton.textContent = 'Add Expense';
        expenseForm.reset();
    }
    renderTransactions();
    updateDisplays();
    saveData();
    renderCategorySummary();
    renderPieChart();   
};

function startEdit(id) {
    const match=transactions.find(function (t) {
        return t.id == id;
    });
    if (match) {
        entrynameInput.value = match.name;
        entryamountInput.value = match.amount;
        expensecategoryInput.value = match.category;
        entrydateInput.value = match.date;
        editingId = id;
        expensebutton.textContent = 'Update Expense';
    }
}
expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (editingId) {
    transactions = transactions.map(function (t) {
        if (t.id == editingId) {
            return {
                id: t.id,
                name: entrynameInput.value,
                amount: Math.abs(parseFloat(entryamountInput.value) || 0),
                category: expensecategoryInput.value,
                date: entrydateInput.value
            };
        }
        return t;
    });
    editingId = null;
    expensebutton.textContent = 'Add Expense';
}
else{
    const newExpense = {
        id: Date.now(),
        name: entrynameInput.value,
        amount: Math.abs(parseFloat(entryamountInput.value) || 0),
        category: expensecategoryInput.value,
        date: entrydateInput.value
    };
    transactions.push(newExpense);
}

    renderTransactions();
    updateDisplays();
    renderCategorySummary();
    saveData();
    renderPieChart();
    expenseForm.reset();

    });
    function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  localStorage.setItem("income", JSON.stringify(income));
}
function loadData() {
  const savedTransactions = localStorage.getItem("transactions");
  const savedIncome = localStorage.getItem("income");

  if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
  }

  if (savedIncome) {
    income = JSON.parse(savedIncome);
    incomeDisplay.textContent = income.toFixed(2);
  }

  renderTransactions();
  updateDisplays();
  renderCategorySummary();
  renderPieChart();
}

loadData();
function renderCategorySummary() {
    const categoryTotals = {
        Food: 0,
        Travel: 0,
        Rent: 0,
        Entertainment: 0,
        Investments: 0
    };

    transactions.forEach(function (t) {
        categoryTotals[t.category] += t.amount;
    });

    const categorySummaryEl = document.getElementById('category-summary');
    categorySummaryEl.innerHTML = '';

    for (const category in categoryTotals) {
        const amount = categoryTotals[category];
        const percentage = income > 0 ? (amount / income) * 100 : 0;
        const cappedPercent = Math.min(percentage, 100);

        const box = document.createElement('div');
        box.className = 'category-box';
        box.innerHTML = `
            <div class="category-header">
                <span class="category-name">${category}</span>
                <span class="category-percent">${percentage.toFixed(1)}%</span>
            </div>
            <div class="category-amount">₹${amount.toFixed(2)}</div>
            <div class="progress-track">
                <div class="progress-fill" style="background:${categoryColors[category]}"></div>
            </div>
        `;
        categorySummaryEl.appendChild(box);

        const fillEl = box.querySelector('.progress-fill');
        setTimeout(function () {
            fillEl.style.width = cappedPercent + '%';
        }, 50);
    }
}
function renderPieChart() {
    const categoryTotals = {
        Food: 0,
        Travel: 0,
        Rent: 0,
        Entertainment: 0,
        Investments: 0
    };

    let totalExpenses = 0;
    transactions.forEach(function (t) {
        categoryTotals[t.category] += t.amount;
        totalExpenses += t.amount;
    });

    const pieChartEl = document.getElementById('pie-chart');
    const pieLegendEl = document.getElementById('pie-legend');
    pieLegendEl.innerHTML = '';

    if (totalExpenses === 0) {
        pieChartEl.style.background = '#334155';
        return;
    }

    let cumulative = 0;
    const gradientParts = [];

    for (const category in categoryTotals) {
        const amount = categoryTotals[category];
        const percent = (amount / totalExpenses) * 100;
        const start = cumulative;
        cumulative += percent;

        if (percent > 0) {
            gradientParts.push(`${categoryColors[category]} ${start}% ${cumulative}%`);
        }

        const legendItem = document.createElement('li');
        legendItem.innerHTML = `
            <span class="legend-swatch" style="background:${categoryColors[category]}"></span>
            ${category}: ${percent.toFixed(1)}%
        `;
        pieLegendEl.appendChild(legendItem);
    }

    pieChartEl.style.background = `conic-gradient(${gradientParts.join(', ')})`;
}