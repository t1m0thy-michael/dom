import { assert } from 'chai'

// module under test
import { styles } from './styles'

describe('styles', () => {

	it('has expected methods', () => {
		assert.isFunction(styles.background)
		assert.isFunction(styles.backgroundColour)
		assert.isFunction(styles.colour)
		assert.isFunction(styles.height)
		assert.isFunction(styles.hide)
		assert.isFunction(styles.show)
		assert.isFunction(styles.style)
		assert.isFunction(styles.width)
	})
})

