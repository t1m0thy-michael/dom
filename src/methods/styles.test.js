import { assert } from 'chai'

// module under test
import { 
	background,
	backgroundColour,
	colour,
	height,
	hide,
	show,
	style,
	width,
} from './styles'

describe('styles', () => {

	it('has expected methods', () => {
		assert.isFunction(background)
		assert.isFunction(backgroundColour)
		assert.isFunction(colour)
		assert.isFunction(height)
		assert.isFunction(hide)
		assert.isFunction(show)
		assert.isFunction(style)
		assert.isFunction(width)
	})
})

