'use strict';

function Account(acctNum, name, deposit, type){
  this.acctNum = parseFloat(acctNum);
  this.name = name;
  this.balance = parseFloat(deposit);
  this.type = type;
  this.deposits = [];
  this.withdraws = [];
  this.isActive = true;
  this.overdrafts = 0;
}

Account.prototype.deposit = function(amount){
  if(this.isActive){
    amount = parseFloat(amount);
    this.balance += amount;
    this.deposits.push(amount);
  }
};

Account.prototype.withdraw = function(amount){
  if(this.isActive && this.overdrafts <= 3){
    amount = parseFloat(amount);
    if(this.balance < amount){
      amount += 50;
      this.overdrafts += 1;
    }

    this.balance -= amount;
    this.withdraws.push(amount);

    if(this.overdrafts >= 3){
      this.isActive = false;
    }
  }
};



module.exports = Account;
