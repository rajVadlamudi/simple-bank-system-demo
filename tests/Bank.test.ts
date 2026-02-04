//npm init -y - creates package.json
//npx tsc --init - creates tsconfig.json
//npm install --save-dev jest @types/jest ts-jest typescript
//create jest.config.js
//command: npm test
import {Bank} from '../src/Bank';
describe('Bank', () => {
    describe('constructor', () => {
        it('should initialize with given balances', () => {
            const bank = new Bank([100, 200, 300]);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should handle empty balance array', () => {
            const bank = new Bank([]);
            expect(bank.getBalances()).toEqual([]);
        });

        it('should handle single account', () => {
            const bank = new Bank([500]);
            expect(bank.getBalances()).toEqual([500]);
        });
    });

    describe('getBalances', () => {
        it('should return a copy of balances array', () => {
            const bank = new Bank([100, 200, 300]);
            const balances = bank.getBalances();
            
            balances[0] = 999;
            
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });
    });

    describe('integration tests', () => {
        it('should handle multiple operations correctly', () => {
            const bank = new Bank([1000, 500, 250]);
            
            bank.deposit(1, 500);
            expect(bank.getBalances()).toEqual([1500, 500, 250]);
            
            bank.transfer(1, 2, 300);
            expect(bank.getBalances()).toEqual([1200, 800, 250]);
            
            bank.withdraw(3, 100);
            expect(bank.getBalances()).toEqual([1200, 800, 150]);
            
            bank.transfer(2, 3, 800);
            expect(bank.getBalances()).toEqual([1200, 0, 950]);
        });

        it('should maintain state correctly across failed operations', () => {
            const bank = new Bank([100, 100]);
            
            bank.withdraw(1, 200); // fails
            expect(bank.getBalances()).toEqual([100, 100]);
            
            bank.transfer(1, 2, 50); // succeeds
            expect(bank.getBalances()).toEqual([50, 150]);
            
            bank.deposit(5, 100); // fails
            expect(bank.getBalances()).toEqual([50, 150]);
        });
    });
    describe('transfer', () => {
        let bank: Bank;

        beforeEach(() => {
            bank = new Bank([100, 200, 300]);
        });

        it('should transfer money between valid accounts with sufficient balance', () => {
            const result = bank.transfer(1, 2, 50);
            expect(result).toBe(true);
            expect(bank.getBalances()).toEqual([50, 250, 300]);
        });

        it('should transfer entire balance', () => {
            const result = bank.transfer(1, 3, 100);
            expect(result).toBe(true);
            expect(bank.getBalances()).toEqual([0, 200, 400]);
        });

        it('should return false when source account has insufficient balance', () => {
            const result = bank.transfer(1, 2, 150);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should return false when source account is invalid (0)', () => {
            const result = bank.transfer(0, 2, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should return false when source account is invalid (negative)', () => {
            const result = bank.transfer(-1, 2, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should return false when source account exceeds number of accounts', () => {
            const result = bank.transfer(4, 2, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });
        it('should return false when source account is invalid (negative)', () => {
            const result = bank.transfer(-1, 2, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should return false when source account exceeds number of accounts', () => {
            const result = bank.transfer(4, 2, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should return false when destination account is invalid (0)', () => {
            const result = bank.transfer(1, 0, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should return false when destination account is invalid (negative)', () => {
            const result = bank.transfer(1, -1, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should return false when destination account exceeds number of accounts', () => {
            const result = bank.transfer(1, 5, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should handle transfer to same account', () => {
            const result = bank.transfer(2, 2, 50);
            expect(result).toBe(true);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should handle zero amount transfer', () => {
            const result = bank.transfer(1, 2, 0);
            expect(result).toBe(true);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });
    });

    describe('deposit', () => {
        let bank: Bank;

        beforeEach(() => {
            bank = new Bank([100, 200, 300]);
        });

        it('should deposit money to valid account', () => {
            const result = bank.deposit(1, 50);
            expect(result).toBe(true);
            expect(bank.getBalances()).toEqual([150, 200, 300]);
        });

        it('should handle zero deposit', () => {
            const result = bank.deposit(2, 0);
            expect(result).toBe(true);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should handle large deposit', () => {
            const result = bank.deposit(3, 10000);
            expect(result).toBe(true);
            expect(bank.getBalances()).toEqual([100, 200, 10300]);
        });

        it('should return false when account is invalid (0)', () => {
            const result = bank.deposit(0, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should return false when account is invalid (negative)', () => {
            const result = bank.deposit(-1, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });

        it('should return false when account exceeds number of accounts', () => {
            const result = bank.deposit(4, 50);
            expect(result).toBe(false);
            expect(bank.getBalances()).toEqual([100, 200, 300]);
        });
    });

    
});
