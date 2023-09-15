const { ethers } = require('ethers');

const FACTORY_BYTECODE = '0x604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf3';

function createTx(chainId = 0) {
  const tx = {
    data: FACTORY_BYTECODE,
    gasLimit: 300_000,
    gasPrice: ethers.utils.parseUnits('100', 'gwei'),
    chainId,
    nonce: 0,
  }

  return tx;
}

async function signTx(signer, tx) {
  const signature = await signer.signTransaction(tx);
  return signature;
}

module.exports = {
  createTx,
  signTx,
};
