//npx ts-node test.ts
class Bank {
    private bal: number[];
    private n: number;

    constructor(balance: number[]) {
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

const bankAccount: Bank = new Bank([10, 100, 20, 50, 30]);
    // const result:boolean = this.bankAccount.withdraw(3, 10);
    // console.log(result);
    console.log('Balances:', bankAccount.getBalances());