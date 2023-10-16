const { ethers } = require('ethers');
const { getDeterministicDeployment } = require('../lib');
const { createTx, signTx } = require('../lib/tx');

require('dotenv').config()

async function main() {
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY);

  const address = await signer.getAddress();
  console.log('deployer address', address);

  const chainId = parseInt(process.env.CHAIN_ID || '0', 10);

  const tx = createTx(chainId);

  const signedTx = await signTx(signer, tx);

  console.log(JSON.stringify({ signedTx }));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
