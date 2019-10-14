import { assert } from 'chai'

// module under test
import { 
	scrollTop,
	scrollMore,
	getBounding,
} from './viewport'

describe('viewport', () => {

	it('has expected methods', () => {
		assert.isFunction(scrollTop)
		assert.isFunction(scrollMore)
		assert.isFunction(getBounding)
	})
})

