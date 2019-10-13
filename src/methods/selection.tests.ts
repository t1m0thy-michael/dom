import { assert } from 'chai'

// module under test
import { selection } from './selection'

describe('selection', () => {

	it('has expected methods', () => {
		assert.isFunction(selection.child)
		assert.isFunction(selection.isAppended)
		assert.isFunction(selection.parent)
		assert.isFunction(selection.is)
		assert.isFunction(selection.not)
		assert.isFunction(selection.sibling)
	})
})

