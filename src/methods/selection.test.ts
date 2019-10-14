import { assert } from 'chai'

// module under test
import { 
	child,
	isAppended,
	parent,
	is,
	not,
	sibling,
} from './selection'

describe('selection', () => {

	it('has expected methods', () => {
		assert.isFunction(child)
		assert.isFunction(isAppended)
		assert.isFunction(parent)
		assert.isFunction(is)
		assert.isFunction(not)
		assert.isFunction(sibling)
	})
})

