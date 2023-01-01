import { bench, describe } from 'vitest'

import {
  accounts,
  essentialProvider,
  ethersProvider,
  publicClient,
  web3Provider,
} from '../../../test'
import { parseEther } from '../../utils'

import { estimateGas } from './estimateGas'

describe('Estimate Gas', () => {
  bench('viem: `estimateGas`', async () => {
    await estimateGas(publicClient, {
      request: {
        from: accounts[0].address,
        to: accounts[1].address,
        value: parseEther('1'),
      },
    })
  })

  bench('ethers: `estimateGas`', async () => {
    await ethersProvider.estimateGas({
      from: accounts[0].address,
      to: accounts[1].address,
      value: parseEther('1'),
    })
  })

  bench('web3.js: `estimateGas`', async () => {
    await web3Provider.eth.estimateGas({
      from: accounts[0].address,
      to: accounts[1].address,
      value: '1000000000000',
    })
  })

  bench('essential-eth: `call`', async () => {
    await essentialProvider.estimateGas({
      from: accounts[0].address,
      to: accounts[1].address,
      value: '1000000000000',
    })
  })
})
