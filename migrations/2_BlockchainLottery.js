const BlockchainLottery = artifacts.require("BlockchainLottery");

module.exports = function (deployer) {
  deployer.deploy(BlockchainLottery);
};
