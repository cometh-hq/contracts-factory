const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');
const { getDeterministicDeployment } = require('../lib');
const { createTx, signTx } = require('../lib/tx');

const PRODUCTION_SIGNER = '0x1d57717e19983c9211E586978860edb899Dc43FD';
const DEVELOPER_SIGNER = '0x78788bA2Eb83fA323F566B61ACC5Df8d86295A01';
const STAGING_SIGNER = '0x02Ff737406Cd37F8591c47D01144b3769deD4B67';

async function checkDir(dir, signer) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const txPath = path.join(dir, file);
    const { signedTx } = JSON.parse(fs.readFileSync(txPath));
    const tx = ethers.utils.parseTransaction(signedTx);

    const expectedChainId = parseInt(path.parse(txPath).name, 10);

    if (expectedChainId !== tx.chainId) throw new Error(`${txPath}: invalid chainId: expected ${expectedChainId} but got ${tx.chainId}`);
    if (signer !== tx.from) throw new Error(`${txPath}: invalid signer: expected ${signer} but got ${tx.from}`);
  }

}

async function main() {
  const productionDir = path.join(__dirname, '..', 'artifacts', 'production');
  const developDir = path.join(__dirname, '..', 'artifacts', 'develop');
  const stagingDir = path.join(__dirname, '..', 'artifacts', 'staging');

  await checkDir(productionDir, PRODUCTION_SIGNER);
  await checkDir(developDir, DEVELOPER_SIGNER);
  await checkDir(stagingDir, STAGING_SIGNER);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
