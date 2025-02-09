// Import required modules
var addressUtilities = require('../utils/address');
var arrayUtilities = require('../utils/array');
var validator = require('../utils/validator');
var chainUtilities = require('../utils/chain');

var blockchain = function blockchain() {
  var self = this;

  this.init = init;
  this.newBlock = newBlock;
  this.newTransaction = newTransaction;
  this.getChain = getChain;
  this.checkChain = checkChain;
  this.mine = mine;

  this.chain;
  this.currentTransactions;

  function init() {
    self.chain = [];
    self.currentTransactions = [];
    self.newBlock(100, "1");
  }

  function getChain() {
    return self.chain;
  }

  function mine(miner) {
    var lastBlock = self.chain[self.chain.length - 1];
    var transaction = newTransaction(0, miner, 1);
    var proof = validator.generateProof(transaction);
    var previousHash = validator.calculateHash(lastBlock.transaction[0]);
    return newBlock(proof, previousHash);
  }

  function newBlock(proof, previousHash) {
    var block = {
      "index": self.chain.length + 1,
      "timestamp": new Date().getTime(),
      "transaction": self.currentTransactions,
      "proof": proof,
      "previousHash": previousHash
    };
    self.currentTransactions = [];
    self.chain.push(block);
    return block;
  }

  function newTransaction(sender, receiver, amount) {
    var transaction = {
      sender: sender,
      receiver: receiver,
      amount: amount
    };
    self.currentTransactions.push(transaction);
    return transaction;
  }

  function checkChain() {
    if (self.chain.length === 0) return [];

    for (var i = 1; i < self.chain.length; i++) {
      var currentBlock = self.chain[i];
      var previousBlock = self.chain[i - 1];

      if (currentBlock.previousHash !== validator.calculateHash(previousBlock.transaction[0])) {
        return [];
      }

      if (validator.generateProof(currentBlock.transaction[0]) !== currentBlock.proof) {
        return [];
      }

      if (!currentBlock.index || !currentBlock.timestamp || !currentBlock.transaction ||
          !currentBlock.proof || !currentBlock.previousHash) {
        return [];
      }

      if (currentBlock.index !== previousBlock.index + 1) {
        return [];
      }
    }
    return self.chain;
  }

  if (blockchain.caller !== blockchain.getInstance) {
    throw new Error("This object cannot be instantiated");
  }
};

blockchain.instance = null;
blockchain.getInstance = function () {
  if (this.instance === null) {
    this.instance = new blockchain();
  }
  return this.instance;
};

module.exports = blockchain.getInstance();
