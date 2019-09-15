const chai = require('chai')
const assert = chai.assert

import u_fn from '../src/_fn'

describe('_fn', function () {

	describe('callOrReturn()', function () {

		it('Is a function', function () {
			assert.strictEqual(typeof u_fn.callOrReturn, 'function', 'Is a function')
		})

		it('Retuns val', function () {
			assert.strictEqual(u_fn.callOrReturn(1), 1)
			assert.strictEqual(u_fn.callOrReturn('str'), 'str')
			assert.strictEqual(u_fn.callOrReturn(null), null)
		})

		it('Retuns fn result', function () {
			assert.strictEqual(u_fn.callOrReturn(() => 1), 1)
			assert.strictEqual(u_fn.callOrReturn(() => 'str'), 'str')
		})

		it('Retuns fn with args result', function () {
			assert.strictEqual(u_fn.callOrReturn((a) => a, 1), 1)
			assert.strictEqual(u_fn.callOrReturn((a) => a, 'str'), 'str')
		})

		it('Retuns fn with arbitary number of args result', function () {
			assert.strictEqual(u_fn.callOrReturn((a, b, c, d) => a + b + c + d, 1, 2, 3, 4), 10)
		})
	})

})