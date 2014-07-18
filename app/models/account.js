'use strict';

function Account(acctNum, name, deposit, type){
  this.acctNum = parseFloat(acctNum);
  this.name = name;
  this.balance = parseFloat(deposit);
  this.type = type;
  this.deposits = [];
  this.withdraws = [];

}

Account.prototype.deposit = function(amount){
  amount = parseFloat(amount);
  this.balance += amount;
  this.deposits.push(amount);

};

module.exports = Account;
