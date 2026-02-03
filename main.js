//command in terminal: node main.js
let accounts_balance = [10,100,20,50,30]

const checkAccount = (acc) => {
  return acc>=1 && acc<=accounts_balance.length ? true : false
}

const withdraw = (acc, amount) => {
  if (amount > 0 && checkAccount(acc) && accounts_balance[acc-1]>=amount) {
    accounts_balance[acc-1] -=amount
    return true
  } else {
    return false
  }
} 

const deposit = (acc, amount) => {
  if (amount > 0 && checkAccount(acc)) {
    accounts_balance[acc-1] +=amount
    return true
  } else {
    return false
  }
}

const transfer = (acc1, acc2, amount) => {
  if (amount > 0 && checkAccount(acc1) && checkAccount(acc2)) {
    if(withdraw(acc1,amount)){
      if(deposit(acc2,amount)){
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}
console.log('accounts_balance:'+accounts_balance)
console.log('withdraw 10 from AC3:'+withdraw(3,10))
console.log('result from AC3:'+accounts_balance)

console.log('deposit 20 to AC1:'+deposit(1,20))
console.log('result from AC1:'+accounts_balance)

console.log('transfer 20 from AC5 to AC1:'+transfer(5,1,20))
console.log('result from transfer:'+accounts_balance)

console.log('transfer 15 from AC3 to AC4:'+transfer(3,4,15))
console.log('result from transfer:'+accounts_balance)

console.log('withdraw 50 from AC10:'+withdraw(10,50))
console.log('result from withdraw:'+accounts_balance)
