/* global describe, it */
/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Bank = require('../../app/models/bank');

describe('Bank', function(){
  describe('Constructor', function(){
    it('should create a new Bank', function(){
      var chase = new Bank('chase');
      expect(chase).to.be.instanceof(Bank);
      expect(chase).to.be.ok;
      expect(chase.name).to.equal('chase');
      expect(chase.accounts.length).to.equal(0);
    });
  });
});
