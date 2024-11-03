const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const addButton = document.getElementById('add-btn');

let transactions = [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter a description and amount');
        return;
    }

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    updateLocalStorage();

    text.value = '';
    amount.value = '';

    updateUI();
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Update the UI
function updateUI() {
    list.innerHTML = '';

    transactions.forEach(transaction => {
        const sign = transaction.amount < 0 ? '-' : '+';
        const item = document.createElement('li');

        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
        item.innerHTML = `
            ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        `;

        list.appendChild(item);
    });

    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `₹${total}`;
    moneyPlus.innerText = `₹${income}`;
    moneyMinus.innerText = `₹${expense}`;
}

// Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    updateUI();
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize app
function init() {
    transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    updateUI();
}

init();

addButton.addEventListener('click', addTransaction);
