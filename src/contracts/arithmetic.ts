import {SmartContract, prop, method, assert} from 'scrypt-ts'

export class Arithmetic extends SmartContract {
    @prop()
    add: bigint

    @prop()
    diff: bigint

    @prop()
    mul: bigint

    @prop()
    div: bigint

    constructor(add: bigint, diff: bigint, mul: bigint, div: bigint) {
        super(...arguments)
        this.add = add
        this.diff = diff
        this.mul = mul
        this.div = div
    }

    @method()
    public unlock(x: bigint, y: bigint) {
        assert(x + y == this.add, "wrong addition input values")
        assert(x - y == this.diff, "wrong subtraction input values")
        assert(x * y == this.mul, "wrong multiplcation input values")
        assert(x / y == this.div, "wrong division input values")
    }
}