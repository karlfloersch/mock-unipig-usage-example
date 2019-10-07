const core = require('@pigi/core')
const ovm = require('@pigi/wallet')
const ethers = require('ethers')

let unipigWallet
let wallet

async function initialize () {
  wallet = ethers.Wallet.createRandom()

  const signatureDB = core.newInMemoryDB()
  const signedByDB = new core.SignedByDB(signatureDB)
  const signedByDecider = new core.SignedByDecider(
    signedByDB,
    Buffer.from(wallet.address)
  )
  const rollupStateSolver = new ovm.DefaultRollupStateSolver(
    signedByDB,
    signedByDecider
  )
  const rollupClient = new ovm.RollupClient(core.newInMemoryDB(), '0x970DfC92096BC15ccA54097946d6509dCdc7A858')
  unipigWallet = new ovm.UnipigTransitioner(
    core.newInMemoryDB(),
    rollupStateSolver,
    rollupClient,
    undefined,
    undefined,
    wallet
  )
  const accountAddress = wallet.address
  // Connect to the mock aggregator
  rollupClient.connect(new core.SimpleClient('http://3.114.115.131:3000'))
  unipigWallet.getBalances('0x' + '00'.repeat(20)).then((res) => { console.log('Heres someones balance!', res) })
}
initialize()
