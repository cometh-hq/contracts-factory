const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { ethers } = require('ethers');

function getDeterministicDeployment(env = 'production') {
  assert(env == 'production' || env == 'develop');
  const basePath = path.join(__dirname, '..', 'artifacts', env);
  return (network) => {
    let txPath = path.join(basePath, `${network}.json`);
    if (!fs.existsSync(txPath)) {
      txPath = path.join(basePath, '0.json');
    }
    const { signedTx } = JSON.parse(fs.readFileSync(txPath));

    const tx = ethers.utils.parseTransaction(signedTx);

    return {
      funding: tx.gasLimit.mul(tx.gasPrice),
      deployer: tx.from,
      factory: ethers.utils.getContractAddress(tx),
      signedTx,
    };
  };
}

module.exports = {
  getDeterministicDeployment,
}
