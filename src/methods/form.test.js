import { assert } from 'chai'

// module under test
import { 
	deselect,
	formValues,
	dflt,
	select,
	updateSelect,
	validate,
	value,
} from './form'

describe('form', () => {

	it('has expected methods', () => {
		assert.isFunction(deselect)
		assert.isFunction(formValues)
		assert.isFunction(dflt)
		assert.isFunction(select)
		assert.isFunction(updateSelect)
		assert.isFunction(validate)
		assert.isFunction(value)
	})
})

