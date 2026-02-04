//npx ts-node test.ts
//npm install -g ts-node typescript
//tsc test.ts
// node test.js
export class Bank {
    private bal: number[];
    private n: number;

    constructor(balance: number[]) {
        console.log('New account created with balances:', balance);
        this.bal = balance;
        this.n = balance.length;
    }

    private valid(acc: number): boolean {
        return acc > 0 && acc <= this.n;
    }

    transfer(account1: number, account2: number, money: number): boolean {
        if (!this.valid(account1) || !this.valid(account2) || this.bal[account1 - 1] < money)
            return false;
        this.bal[account1 - 1] -= money;
        this.bal[account2 - 1] += money;
        return true;
    }

    deposit(account: number, money: number): boolean {
        if (!this.valid(account)) return false;
        this.bal[account - 1] += money;
        return true;
    }

    withdraw(account: number, money: number): boolean {
        if (!this.valid(account) || this.bal[account - 1] < money)
            return false;
        this.bal[account - 1] -= money;
        return true;
    }

    getBalances(): number[] {
        return [...this.bal]; // return a copy (safe 👍)
    }
    
}

// const bankAccount: Bank = new Bank([10, 100, 20, 50, 30]);
//     console.log('withdraw 10 from AC3:'+bankAccount.withdraw(3,10))
//     console.log('Balances:', bankAccount.getBalances());
//     console.log('deposit 20 to AC1:'+bankAccount.deposit(1,20))
//     console.log('Balances:', bankAccount.getBalances());
//     console.log('transfer 20 from AC5 to AC1:'+bankAccount.transfer(5,1,20))
//     console.log('Balances:', bankAccount.getBalances());
//     console.log('transfer 15 from AC3 to AC4:'+bankAccount.transfer(3,4,15))
//     console.log('Balances:', bankAccount.getBalances());
//     console.log('withdraw 50 from AC10:'+bankAccount.withdraw(10,50))
//     console.log('Balances:', bankAccount.getBalances());