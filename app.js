// function checkCashRegister(price, cash, cid) {
//   let change;
//   return change;
// }

// checkCashRegister(19.5, 20, [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100],
// ]);

const REGISTER_STATUS = {
  closed: "CLOSED",
  insufficientFunds: "INSUFFICIENT_FUNDS",
  open: "OPEN",
};

let currencyUnit = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1.0,
  FIVE: 5.0,
  TEN: 10.0,
  TWENTY: 20.0,
  "ONE HUNDRED": 100.0,
};

function checkCashRegister(price, cash, cid) {
  let cashRegister = { status: "", change: [...cid] };
  let changeNeed = cash - price;
  let changeAvailable = getTotalCashRegisterChange(cid);
  console.log(`Change Needed: ${changeNeed}`);
  console.log(`Change Available: ${changeAvailable}`);
  cashRegister.status = getTotalCashRegisterStatus(changeNeed, changeAvailable);
  console.log(cashRegister.status);

  if (cashRegister.status === REGISTER_STATUS.insufficientFunds) {
    cashRegister.change = [];
    return cashRegister;
  }

  cashRegister.change = getCustomerChange(changeNeed, cid);

  if (changeNeed === REGISTER_STATUS.open) {
    cashRegister.change = cashRegister.change;
  }

  if (cashRegister.status === REGISTER_STATUS.closed) {
    cashRegister.change = [...cid];
  }

  return cashRegister;
}

function getCustomerChange(changeNeed, changeInDrawer) {
  let change = [];

  for (let i = changeInDrawer.length - 1; i >= 0; i--) {
    // name of coin/bill
    let coinName = changeInDrawer[i][0];
    // total $ value of each coin/bill in register
    let coinTotal = changeInDrawer[i][1];
    // property in currencyUnit object
    let coinValue = currencyUnit[coinName];
    // number of each type of coin/bill in the register
    let coinAmount = (coinTotal / coinValue).toFixed(2);
    // console.log(coinAmount);
    // the number of each type of coin/bill to return as change
    let coinToReturn = 0;
    // while needed change is higher than the value of the coin/bill, AND while there are still enough of these coins/bills
    while (changeNeed >= coinValue && coinAmount > 0) {
      // subtract the value of one coin/bill from the total change needed
      (changeNeed -= coinValue).toFixed(2);
      // console.log(changeNeed);
      // decrement the number of coins/bills by one
      coinAmount--;
      // console.log(coinAmount);
      // increment the number of coins/bills to return as change by one
      coinToReturn++;
      // console.log(coinToReturn);
    }
    if (coinToReturn > 0) {
      change.push([coinName, coinToReturn * coinValue]);
    }
  }
  if (changeNeed > 0) {
  }
  return change;
}

// Calculates the total value in cash register
function getTotalCashRegisterChange(changeInDrawer) {
  let total = 0;
  for (let change of changeInDrawer) {
    let changeValue = change[1];
    total += changeValue;
  }
  return total.toFixed(2);
}

function getTotalCashRegisterStatus(changeNeed, changeAvailable) {
  if (changeNeed > changeAvailable) {
    return REGISTER_STATUS.insufficientFunds;
  }
  if (changeNeed < changeAvailable) {
    return REGISTER_STATUS.open;
  }
  return REGISTER_STATUS.closed;
}
