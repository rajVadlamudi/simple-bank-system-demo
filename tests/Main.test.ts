//npm init -y - creates package.json
//npx tsc --init - creates tsconfig.json
//npm install --save-dev jest @types/jest ts-jest typescript
//create jest.config.js
import {Bank} from '../src/main-ts/bank';
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
});
