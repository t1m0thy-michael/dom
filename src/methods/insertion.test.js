import { assert } from 'chai'

// module under test
import { 
	appendAfter,
	appendBefore,
	appendFirstChild,
	appendLastChild,
	appendTo,
	empty,
	remove,
	replace,
} from './insertion'

describe('insertion', () => {

	it('has expected methods', () => {
		assert.isFunction(appendAfter)
		assert.isFunction(appendBefore)
		assert.isFunction(appendFirstChild)
		assert.isFunction(appendLastChild)
		assert.isFunction(appendTo)
		assert.isFunction(empty)
		assert.isFunction(remove)
		assert.isFunction(replace)
	})
})

