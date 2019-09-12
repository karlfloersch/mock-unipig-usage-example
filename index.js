const core = require('@pigi/core')
const wallet = require('@pigi/wallet')
const memdown = require('memdown')

const db = new core.BaseDB(memdown())
const unipigWallet = new wallet.UnipigWallet(db)
unipigWallet.rollup.connect(new core.SimpleClient('http://localhost:3000'))

const accountAddress = 'mocked account'

unipigWallet.getBalances(accountAddress).then((res) => { console.log('Heres someones balance!', res) })
