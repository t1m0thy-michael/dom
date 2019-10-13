import { assert } from 'chai'

// module under test
import { form } from './form'

describe('form', () => {

	it('has expected methods', () => {
		assert.isFunction(form.deselect)
		assert.isFunction(form.formValues)
		assert.isFunction(form.dflt)
		assert.isFunction(form.select)
		assert.isFunction(form.updateSelect)
		assert.isFunction(form.validate)
		assert.isFunction(form.value)
	})
})

