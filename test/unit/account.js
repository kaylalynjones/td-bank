/* jshint expr:true */
/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Account = require('../../app/models/account');

describe('Account', function(){
  describe('Constructor', function(){
    it('should create a new Bank account', function(){
      var a1 = new Account(3, 'Sara', 1500, 'savings');
      expect(a1).to.be.instanceof(Account);
      expect(a1.acctNum).to.equal(3);
      expect(a1.name).to.equal('Sara');
      expect(a1.balance).to.equal(1500);
      expect(a1.type).to.equal('savings');
      expect(a1.deposits).to.have.length(0);
      expect(a1.withdraws).to.have.length(0);
      expect(a1.isActive).to.be.true;
      expect(a1.overdrafts).to.equal(0);
    });
  });
  describe('#deposit', function(){
    it('should increase account balance', function(){
      var a1 = new Account(3, 'Sara', 1500, 'savings');
      a1.deposit(500);
      expect(a1.balance).to.equal(2000);
      expect(a1.deposits).to.have.length(1);
    });
    it('should not be able to deposit to suspended account', function(){
      var a1 = new Account(3, 'Sara', 1500, 'savings');
      a1.isActive = false;
      a1.deposit(500);
      expect(a1.balance).to.equal(1500);
      expect(a1.deposits).to.have.length(0);
    });
  });
  describe('#withdraw', function(){
    it('should decrease account balance', function(){
      var a1 = new Account(3, 'Sara', 1500, 'savings');
      a1.withdraw(500);
      expect(a1.balance).to.equal(1000);
      expect(a1.withdraws).to.have.length(1);
    });
    it('should increase overdrafts & charge fee when overdrawn', function(){
      var a1 = new Account(3, 'Sara', 0, 'savings');
      a1.withdraw(500);
      expect(a1.overdrafts).to.equal(1);
      expect(a1.balance).to.equal(-550);
    });
    it('should suspend account after 3 overdrafts', function(){
      var a1 = new Account(3, 'Sara', 0, 'savings');
      for(var i = 0; i <= 4; i++){
        a1.withdraw(500);
      }
      expect(a1.overdrafts).to.equal(3);
      expect(a1.balance).to.equal(-1650);
      expect(a1.withdraws).to.have.length(3);
      expect(a1.isActive).to.be.false;
    });


  });

});

