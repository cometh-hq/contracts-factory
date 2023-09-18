const fs = require('fs');
const path = require('path');

const { ethers } = require('ethers');

function getDeterministicDeployment(network) {
  let txPath = path.join(__dirname, '..', 'artifacts', `${network}.json`);
  if (!fs.existsSync(txPath)) {
    txPath = path.join(__dirname, '..', 'artifacts', '0.json');
  }
  const { signedTx } = JSON.parse(fs.readFileSync(txPath));

  const tx = ethers.utils.parseTransaction(signedTx);

  return {
    funding: tx.gasLimit.mul(tx.gasPrice),
    deployer: tx.from,
    factory: ethers.utils.getContractAddress(tx),
    signedTx,
  };
}

module.exports = {
  getDeterministicDeployment,
}
