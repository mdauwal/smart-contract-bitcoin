import { expect, use } from 'chai'
import { sha256, toByteString } from 'scrypt-ts'
import { Arithmetic } from '../src/contracts/arithmetic'
import { getDefaultSigner } from './utils/txHelper'
import chaiAsPromised from 'chai-as-promised'

use(chaiAsPromised)

describe('Test SmartContract `Arithmetic`', () => {
    let instance: Arithmetic

    before(async () => {
        await Arithmetic.loadArtifact()

        const x = BigInt(10)
        const y = BigInt(5)
        const add = x + y 
        const diff = x - y
        const mul = x * y 
        const div = x / y 

        instance = new Arithmetic(add, diff, mul, div)
        await instance.connect(getDefaultSigner())
    })

    it('should pass the public method unit test successfully.', async () => {
        const deployTx = await instance.deploy(1)
        console.log(`Deployed contract "Arithmetic": ${deployTx.id}`)

        const call = async () => {
            const callRes = await instance.methods.unlock(BigInt(10), BigInt(5))
            console.log(`Called "unlock" method: ${callRes.tx.id}`)
        }
        await expect(call()).not.to.be.rejected
    })

    it('should throw with wrong message.', async () => {
        await instance.deploy(1)

        const call = async () => instance.methods.unlock(BigInt(10), BigInt(6)) // incorrect values
        await expect(call()).to.be.rejectedWith(/Hash does not match/)
    })
})
