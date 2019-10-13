import { assert } from 'chai'

// module under test
import { insertion } from './insertion'

describe('insertion', () => {

	it('has expected methods', () => {
		assert.isFunction(insertion.appendAfter)
		assert.isFunction(insertion.appendBefore)
		assert.isFunction(insertion.appendFirstChild)
		assert.isFunction(insertion.appendLastChild)
		assert.isFunction(insertion.appendTo)
		assert.isFunction(insertion.empty)
		assert.isFunction(insertion.remove)
		assert.isFunction(insertion.replace)
	})
})

