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

setIncomeBtn.addEventListener('click', () => {
    income = parseFloat(monthlyIncomeInput.value) || 0;
    incomeDisplay.textContent = income.toFixed(2);

    monthlyIncomeInput.value = '';
    updateDisplays();
    console.log('income', income);
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
                amount: parseFloat(entryamountInput.value) || 0,
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
        amount: parseFloat(entryamountInput.value) || 0,
        category: expensecategoryInput.value,
        date: entrydateInput.value
    };
    transactions.push(newExpense);
}

    renderTransactions();
    updateDisplays();
    expenseForm.reset();

    })