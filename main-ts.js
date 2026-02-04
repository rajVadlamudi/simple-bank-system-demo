var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//npx ts-node test.ts
//npm install -g ts-node typescript
//tsc test.ts
// node test.js
var Bank = /** @class */ (function () {
    function Bank(balance) {
        console.log('New account created with balances:', balance);
        this.bal = balance;
        this.n = balance.length;
    }
    Bank.prototype.valid = function (acc) {
        return acc > 0 && acc <= this.n;
    };
    Bank.prototype.transfer = function (account1, account2, money) {
        if (!this.valid(account1) || !this.valid(account2) || this.bal[account1 - 1] < money)
            return false;
        this.bal[account1 - 1] -= money;
        this.bal[account2 - 1] += money;
        return true;
    };
    Bank.prototype.deposit = function (account, money) {
        if (!this.valid(account))
            return false;
        this.bal[account - 1] += money;
        return true;
    };
    Bank.prototype.withdraw = function (account, money) {
        if (!this.valid(account) || this.bal[account - 1] < money)
            return false;
        this.bal[account - 1] -= money;
        return true;
    };
    Bank.prototype.getBalances = function () {
        return __spreadArray([], this.bal, true); // return a copy (safe 👍)
    };
    return Bank;
}());
var bankAccount = new Bank([10, 100, 20, 50, 30]);
console.log('withdraw 10 from AC3:' + bankAccount.withdraw(3, 10));
console.log('Balances:', bankAccount.getBalances());
console.log('deposit 20 to AC1:' + bankAccount.deposit(1, 20));
console.log('Balances:', bankAccount.getBalances());
console.log('transfer 20 from AC5 to AC1:' + bankAccount.transfer(5, 1, 20));
console.log('Balances:', bankAccount.getBalances());
console.log('transfer 15 from AC3 to AC4:' + bankAccount.transfer(3, 4, 15));
console.log('Balances:', bankAccount.getBalances());
console.log('withdraw 50 from AC10:' + bankAccount.withdraw(10, 50));
console.log('Balances:', bankAccount.getBalances());
