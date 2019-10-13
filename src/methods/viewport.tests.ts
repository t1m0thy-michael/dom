import { assert } from 'chai'

// module under test
import { viewport } from './viewport'

describe('viewport', () => {

	it('has expected methods', () => {
		assert.isFunction(viewport.scrollTop)
		assert.isFunction(viewport.scrollMore)
		assert.isFunction(viewport.getBounding)
	})
})

